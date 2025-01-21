/**
 * Popup window to show the extra headers
 */

/**
 * @param {*} obj - the object to log
 * @param {*} name - the name of the object
 */
function logObj(obj, name)
{
	let str = JSON.stringify(obj, null, 4);
	console.log("--- object[" + name + "]: " + str);
}

/**
 * @param {*} urlString - the URL to check
 * @returns true if URL input is valid
 */
function isValidURL(urlString)
{
	var inputElement = document.createElement('input');
	inputElement.type = 'url';
	inputElement.value = urlString;

	if (!inputElement.checkValidity()) {
	  return false;
	} else {
	  return true;
	}
}

/**
 * @param {*} emailString - the email to check
 * @returns true if email input is valid
 */
function isValidEmail(emailString)
{
	var inputElement = document.createElement('input');
	inputElement.type = 'email';
	inputElement.value = emailString;

	if (!inputElement.checkValidity()) {
	  return false;
	} else {
	  return true;
	}
}

/**
 * @param {*} hlist - headers list
 * @param {*} hname - header name
 * @param {*} idx - index of the header
 * @param {*} mode - if is set to 1, remove enclosing angle brackets
 * @returns header value
 */
function getHeaderIfExists(hlist, hname, idx, mode)
{
	let hval = "";
	if (hname in hlist) {
		hval = hlist[hname][idx];
	}

	if(mode == 1 && hval.length > 2) {
		if(hval[0] == '<' && hval[hval.length - 1] == '>') {
			hval = hval.slice(1, -1);
		} else if(hval[0] == '<') {
			hval = hval.slice(1);
		}
	}

	return hval;
}

async function showXHeaders()
{
	// The user clicked our button, get the active tab in the current window using
	// the tabs API.
	let tabs = await messenger.tabs.query({ active: true, currentWindow: true });

	// Get the message currently displayed in the active tab, using the
	// messageDisplay API. Note: This needs the messagesRead permission.
	// The returned message is a MessageHeader object with the most relevant
	// information.
	let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);

	// Request the full message to access its full set of headers.
	let full = await messenger.messages.getFull(message.id);

	// - debugging the email message content
	// logObj(full, "message")

	let envelopeto = getHeaderIfExists(full.headers, "envelope-to", 0, 0);
	if((envelopeto.length == 0) && ("delivered-to" in full.headers)) {
		envelopeto = getHeaderIfExists(full.headers, "delivered-to", 0, 0);
		if(envelopeto.length > 0) {
			document.getElementById("EnvelopeToName").textContent = "Delivered-To";
		}
	}
	document.getElementById("EnvelopeToVal").textContent = envelopeto;

	let lArchiveHide = false;
	let lArchiveHideOpts = await browser.storage.sync.get("xhdr_l_archive_hide");
	if(lArchiveHideOpts && ("xhdr_l_archive_hide" in lArchiveHideOpts)) {
		lArchiveHide = lArchiveHideOpts["xhdr_l_archive_hide"];
	}

	if (lArchiveHide == false) {
		let archivedat = getHeaderIfExists(full.headers, "archived-at", 0, 1);
		if(archivedat.length > 0) {
			if(isValidURL(archivedat)) {
				document.getElementById("ArchivedAtVal").innerHTML = "<a target=\"_blank\" href=\""
						+ archivedat + "\">" + archivedat + "</a>";
			} else {
				document.getElementById("ArchivedAtVal").textContent = archivedat;
			}
		} else {
			document.getElementById("ArchivedAtName").style.display = "none";
			document.getElementById("ArchivedAtVal").style.display = "none";
		}

		let listarchive = getHeaderIfExists(full.headers, "list-archive", 0, 1);
		if(listarchive.length > 0) {
			if(isValidURL(listarchive)) {
				document.getElementById("ListArchiveVal").innerHTML = "<a target=\"_blank\" href=\""
						+ listarchive + "\">" + listarchive + "</a>";
			} else {
				document.getElementById("ListArchiveVal").textContent = listarchive
			}
		} else {
			document.getElementById("ListArchiveName").style.display = "none";
			document.getElementById("ListArchiveVal").style.display = "none";
		}
	} else {
		document.getElementById("ArchivedAtName").style.display = "none";
		document.getElementById("ArchivedAtVal").style.display = "none";
		document.getElementById("ListArchiveName").style.display = "none";
		document.getElementById("ListArchiveVal").style.display = "none";
	}

	let xmailfrom = getHeaderIfExists(full.headers, "x-mailfrom", 0, 1);
	if(xmailfrom.length > 0) {
		if(isValidEmail(xmailfrom)) {
			document.getElementById("XMailFromVal").innerHTML = "<a target=\"_blank\" href=\"mailto:"
					+ xmailfrom + "\">" + xmailfrom + "</a>";
		} else {
			document.getElementById("XMailFromVal").textContent = xmailfrom
		}
	} else {
		document.getElementById("XMailFromName").style.display = "none";
		document.getElementById("XMailFromVal").style.display = "none";
	}

	let rcvXMailerHide = false;
	let rcvXMailerHideOpts = await browser.storage.sync.get("xhdr_x_mailer_hide");
	if(rcvXMailerHideOpts && ("xhdr_x_mailer_hide" in rcvXMailerHideOpts)) {
		rcvXMailerHide = rcvXMailerHideOpts["xhdr_x_mailer_hide"];
	}
	// logObj(rcvXMailerHideOpts, "rcvXMailerHideOpts")
	// console.log("--- option - rcvXMailerHide: " + rcvXMailerHide);

	if (rcvXMailerHide == false) {
		let xmailer = getHeaderIfExists(full.headers, "x-mailer", 0, 0);
		if(xmailer.length > 0) {
			document.getElementById("XMailerVal").textContent = xmailer;
		} else {
			document.getElementById("XMailerName").style.display = "none";
			document.getElementById("XMailerVal").style.display = "none";
		}
	} else {
		document.getElementById("XMailerName").style.display = "none";
		document.getElementById("XMailerVal").style.display = "none";
	}

	let rcvReceivedHide = false;
	let rcvReceivedHideOpts = await browser.storage.sync.get("xhdr_received_hide");
	if(rcvReceivedHideOpts && ("xhdr_received_hide" in rcvReceivedHideOpts)) {
		rcvReceivedHide = rcvReceivedHideOpts["xhdr_received_hide"];
	}

	if (rcvReceivedHide == true) {
		return
	}

	let rcvCount = 3;
	let rcvCountOpts = await browser.storage.sync.get("xhdr_received_count");
	if(rcvCountOpts && ("xhdr_received_count" in rcvCountOpts)) {
		rcvCount = Number(rcvCountOpts["xhdr_received_count"]);
	}

	// logObj(rcvCountOpts, "rcvCountOpts")
	// console.log("--- option - received count: " + rcvCount);

	if(rcvCount > full.headers.received.length) {
		rcvCount = full.headers.received.length;
	}

	let i = 0;
	for (i = 0; i < rcvCount; i++) {
		document.getElementById("ContainerVal").innerHTML +=
			"        <div id=\"Received" + i + "Name\" class=\"header\">Received[" + i + "]:</div>\n"
			+ "        <div id=\"Received" + i + "Val\" class=\"content\">"
			+ full.headers.received[i] + "</div>\n";
	}
}

showXHeaders()
