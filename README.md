# Thunderbird Extension - Show  eXtra Headers

## Overview

Show quickly extra headers for current message via a popup view. The button
is named `X-Hdrs` and appears on the toolbar at the top of the message view.

The headers that are shown:

* `Envelope-To` or `Delivered-To` - the target address for the message
* `X-MailFrom` - the sender of the message (link)
* `X-Mailer` - the application that sent the message
* `Archived-At` - the link to the mailing list archive for the message (link)
* `Received` - the first `Received` headers (number configurable, default three)

Not all headers are present in a message, being a matter of the email client
and SMTP servers on the path.

### Screenshot

Screenshot with the extension activated and the `X-Hdrs` button pressed.

![Thunderbird Show Extra Headers](https://github.com/user-attachments/assets/6aac6046-b0da-44f8-8dec-a65ce12e39d5)

## Installation

The extension requires at least `Thunderbird v128.0`.

### Temporarily Install From Git Repository

Steps for temporarily loading the extension.

Clone the repository:

``` text
git clone https://github.com/miconda/thunderbird-show-extra-headers
```

Open up the `Add-ons Manager` from the three-bars menu, select `Extensions`
on the left-hand side and click the gear to select `Debug Add-ons`.

Click on the `Load Temporary Add-on...` button, select the `manifest.json` file
from within the `thunderbird-show-extra-headers/src/` project folder.

This installs the add-on for the current session only, upon Thunderbird restart
the extension has to be loaded again.

## Usage

When installed, a new button named `H-Hdrs` appears in the buttons list at the
top of the `Message Pane`. Clicking on it shows the pop up  with extra headers
for the current message.

## To-Do

Ideas for the future (no commitment to be implemented):

* [x] do not show headers that are not in the message
* [ ] configuration page for the list of the headers to be shown

Contributions are welcome, use pull requests to propose them:

* https://github.com/miconda/thunderbird-show-extra-headers/pulls

## License

MPL v2.0.