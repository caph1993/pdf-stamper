
# pdf-stamper

This app let's you concatenate several PDFs and add a stamp on each page, with a message.

It works on Linux, Windows and MacOS.

### Demo

https://github.com/user-attachments/assets/a1d8a84a-0e6a-4952-a420-d3efa73e652f

## Installation

Download from the [latest release page](https://github.com/caph1993/pdf-stamper/releases/latest) the executable that corresponds to your OS: windows=`.exe`-or-`.msi`, macOS=`.dmg`, linux=`.AppImage`-or-`.deb`-or-`.rpm`. If it's an AppImage, you may need to set permission to execute via left click > properties.

And run the downloaded file.

## Development

This app uses Tauri + Vue + TypeScript

Clone this repo. These commands are the most relevant:

```zsh
pnpm tauri dev
pnpm tauri build
pnpm publish-release
```
