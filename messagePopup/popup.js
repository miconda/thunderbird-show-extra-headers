function getHeaderIfExists(hlist, hname, idx, mode)
{
	let hval = "";
	if (hname in hlist) {
		hval = hlist[hname][idx];
	}

	if(mode == 1 && hval.length > 2) {
		if(hval[0] == '<' && hval[hval.length - 1] == '>') {
			hval = hval.slice(1, -1);
		}
	}

	return hval;
}

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
let str = JSON.stringify(full, null, 4);
console.log(str);

let envelopeto = getHeaderIfExists(full.headers, "envelope-to", 0, 0);
if((envelopeto.length == 0) && ("delivered-to" in full.headers)) {
	envelopeto = getHeaderIfExists(full.headers, "delivered-to", 0, 0);
	if(envelopeto.length > 0) {
		document.getElementById("EnvelopeToName").textContent = "Delivered-To";
	}
}
document.getElementById("EnvelopeToVal").textContent = envelopeto;

let archivedat = getHeaderIfExists(full.headers, "archived-at", 0, 1);
if(archivedat.length > 0) {
	document.getElementById("ArchivedAtVal").innerHTML = "<a target=\"_blank\" href=\""
			+ archivedat + "\">" + archivedat + "</a>";
} else {
	document.getElementById("ArchivedAtName").style.display = "none";
	document.getElementById("ArchivedAtVal").style.display = "none";
}

let xmailfrom = getHeaderIfExists(full.headers, "x-mailfrom", 0, 1);
if(xmailfrom.length > 0) {
	document.getElementById("XMailFromVal").innerHTML = "<a target=\"_blank\" href=\"mailto:"
			+ xmailfrom + "\">" + xmailfrom + "</a>";
} else {
	document.getElementById("XMailFromName").style.display = "none";
	document.getElementById("XMailFromVal").style.display = "none";
}

document.getElementById("Received0Val").textContent = full.headers.received[0];
if(full.headers.received.length > 1) {
	document.getElementById("Received1Val").textContent = full.headers.received[1];
} else {
	document.getElementById("Received1Name").style.display = "none";
	document.getElementById("Received1Val").style.display = "none";
}
if(full.headers.received.length > 2) {
	document.getElementById("Received2Val").textContent = full.headers.received[2];
} else {
	document.getElementById("Received2Name").style.display = "none";
	document.getElementById("Received2Val").style.display = "none";
}