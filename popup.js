(() => {
    document.querySelector('#download-button').addEventListener('click', startDownload, false);

    let start_time = null;
    chrome.downloads.onCreated.addListener((downloadItem) => {
        start_time = new Date(downloadItem.startTime);
    });

    chrome.downloads.onChanged.addListener((delta) => {
        if (delta.endTime) {
            const end_time = new Date(delta.endTime.current);
            
            if (delta.state && delta.state.current == "complete") {
                difference = (end_time - start_time) / 1000;

                if (difference < 5) {
                    setTimeout(startDownload, 5000);
                } else {
                    startDownload();
                }
            }
        }
    });

    function startDownload () {
        chrome.tabs.query({highlighted: true}, (tabs) => {
            const current = tabs[0];

            chrome.tabs.sendMessage(current.id, 'start_download', (data) => {
                chrome.downloads.download({
                    url: data.link, 
                    filename: data.title, 
                    conflictAction: 'uniquify', 
                    saveAs: false
                });
            });
        });
    }
})();