# Thunderbird Extension - Show  eXtra Headers

## Overview

Show quickly extra headers for current message via a popup view. The button
is named `X-Hdrs` and appears on the toolbar at the top of the message view.

The headers that are shown:

* `Envelope-To` or `Delivered-To` - the target address for the message
* `X-MailFrom` - the sender of the message (link)
* `X-Mailer` - the application that sent the message
* `Archived-At` - the link to the mailing list archive for the message (link)
* `List-Archive` - the link to the mailing list archive (link)
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

An alternative is to create an `.xpi` (which is a zip archive) file with the files
in the `src/` folder.

```
cd src/
zip -r ../show_extra_headers.xpi .
```

Then the `.xpi` file can be loaded as temporary add-on, notes about it can be found
in the next section.

### Install From XPI File

Download the `.xpi` file from the latest release assets:

* [https://github.com/miconda/thunderbird-show-extra-headers/releases](https://github.com/miconda/thunderbird-show-extra-headers/releases)

The files suffixed with `-tb` (e.g., `show_extra_headers-1.5-tb.xpi`) are signed
by Thunderbird and should permit standard add-on installation.

If not accepted, temporary add-on installation should be done following the
next steps.

Open up the `Add-ons Manager` from the three-bars menu, select `Extensions`
on the left-hand side and click the gear to select `Debug Add-ons`.

Click on the `Load Temporary Add-on...` button and select the downloaded `.xpi`
file.

This installs the add-on for the current session only, upon Thunderbird restart
the extension has to be loaded again.

## Usage

When installed, a new button named `H-Hdrs` appears in the buttons list at the
top of the `Message Pane`. Clicking on it shows the pop up  with extra headers
for the current message.

## Contributing

Contributions are welcome, use pull requests to propose them:

* [https://github.com/miconda/thunderbird-show-extra-headers/pulls](https://github.com/miconda/thunderbird-show-extra-headers/pulls)

## License

MPL v2.0.
