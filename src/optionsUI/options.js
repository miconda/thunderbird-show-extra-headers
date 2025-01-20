function saveOptions(e) {
	browser.storage.sync.set({
		xhdr_received_count: document.querySelector("#xhdr_received_count").value,
		xhdr_received_hide: document.querySelector("#xhdr_received_hide").checked,
		xhdr_x_mailer_hide: document.querySelector("#xhdr_x_mailer_hide").checked,
		xhdr_l_archive_hide: document.querySelector("#xhdr_l_archive_hide").checked
	});
	e.preventDefault();
  }
  
  function restoreOptions() {
	var gettingXHdrReceivedCountItem = browser.storage.sync.get("xhdr_received_count");
	gettingXHdrReceivedCountItem.then((res) => {
	  document.querySelector("#xhdr_received_count").value = res.xhdr_received_count || "3";
	});
	var gettingXHdrReceivedHideItem = browser.storage.sync.get("xhdr_received_hide");
	gettingXHdrReceivedHideItem.then((res) => {
		document.querySelector("#xhdr_received_hide").checked = res.xhdr_received_hide;
	});
	var gettingXHdrXMailerHideItem = browser.storage.sync.get("xhdr_x_mailer_hide");
	gettingXHdrXMailerHideItem.then((res) => {
		document.querySelector("#xhdr_x_mailer_hide").checked = res.xhdr_x_mailer_hide;
	});
	var gettingXHdrLArchiveHideItem = browser.storage.sync.get("xhdr_l_archive_hide");
	gettingXHdrLArchiveHideItem.then((res) => {
		document.querySelector("#xhdr_l_archive_hide").checked = res.xhdr_l_archive_hide;
	});
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);