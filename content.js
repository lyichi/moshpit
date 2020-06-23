let index = 0;

const section_items = document.querySelectorAll(".section-item");

for (item of section_items) {
	if (item.classList.contains("next-lecture")) {
		break;
	}

	index++;
}

let resource_count = index + 1;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const download = document.querySelector(".download");

	let title = "";
	let link = "";

	if (download) {
		const download_name = download
			.getAttribute("data-x-origin-download-name")
			.replace(/\d.*- /gi, "");
		title = `${resource_count} - ${download_name}`;
		link = download.href;

		resource_count++;
	}

	if (index + 1 < section_items.length) {
		section_items[index + 1].querySelector(".item").click();
	}

	if (index + 1 <= section_items.length) {
		sendResponse({
			download_finished: false,
			has_download: download ? true : false,
			is_last: index + 1 == section_items.length ? true : false,
			title,
			link,
		});
	} else {
		sendResponse({ download_finished: true });
	}

	index++;
});
