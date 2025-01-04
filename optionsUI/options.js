function saveOptions(e) {
	browser.storage.sync.set({
		xhdr_received_count: document.querySelector("#xhdr_received_count").value
	});
	e.preventDefault();
  }
  
  function restoreOptions() {
	var gettingItem = browser.storage.sync.get('xhdr_received_count');
	gettingItem.then((res) => {
	  document.querySelector("#xhdr_received_count").value = res.xhdr_received_count || '3';
	});
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);