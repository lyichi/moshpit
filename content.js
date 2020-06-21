let index = 0;

const section_items = document.querySelectorAll('.section-item');

for (item of section_items) {
    if (item.classList.contains('next-lecture')) {
        break;
    }

    index++;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const download = document.querySelector('.download');
    const download_name = download.getAttribute('data-x-origin-download-name').replace(/\d*- /gi, '');
    const title = `${index + 1} - ${download_name}`;
    const link = download.href;

    index++;
    section_items[index].querySelector('.item').click();
    
    sendResponse({title, link});
});