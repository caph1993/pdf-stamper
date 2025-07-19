<p align="center">
  <img width="128" height="128" alt="Image" src="https://raw.githubusercontent.com/caph1993/pdf-stamper/a11db737b9811afb8c080d00248d4d44c0c2e309/src-tauri/icons/icon-128.png" />
</p>

<h1 align="center">pdf-stamper</h1>

<p align="center">
  A small tool to concatenate and stamp PDFs. Works in Linux, Windows and MacOS.
</p>

https://github.com/user-attachments/assets/a1d8a84a-0e6a-4952-a420-d3efa73e652f

## Installation

Download from the [latest release page](https://github.com/caph1993/pdf-stamper/releases/latest) the executable that corresponds to your OS: windows=`.exe`-or-`.msi`, macOS=`.dmg`, linux=`.AppImage`-or-`.deb`-or-`.rpm`. If it's an AppImage, you may need to set permission to execute via left click > properties.

And run the downloaded file.

## Development

This app uses Tauri + Vue + TypeScript

Clone this repo, install the [tauri prerequisites](https://v2.tauri.app/start/prerequisites/), including [rust](https://v2.tauri.app/start/prerequisites/#rust), node and pnpm.

Then, these commands are the most relevant:

```zsh
pnpm install
pnpm tauri dev

# If you feel ready:
pnpm tauri build
pnpm publish-release
```
