APK Metadata Vault

APK Metadata Vault is a browser-based tool that lets you scan, analyze, and export metadata from APK files directly from your device. Built for Android app testers, mod collectors, and power users who manage large APK libraries.

This tool was designed for people who:

Sideload and collect APKs

Test modded or variant APK files

Want a no-install, portable tool for sorting and logging APK metadata

Prefer using GitHub Pages or cloud-based tools without extra software


Features

Drag-and-drop support for multiple APKs

Extracts:

Filename

App Name (parsed from filename)

Version (parsed from filename)

MOD Flag (detected if filename includes [MOD] or mod)

File size (in MB)


Exports results as downloadable CSV

Fully client-side (no file uploads or server-side processing)


How to Use

1. Open https://tprivitor.github.io/Myapk-vault/ in your browser


2. Drag one or more APK files into the input field


3. Metadata will auto-populate in visual cards


4. Click Export to CSV to download a spreadsheet of the scanned results



Deployment (if cloning or hosting yourself)

To self-host this tool:

# Install dependencies
npm install

# Build static site
npm run build

# Deploy to GitHub Pages
npm run deploy

Be sure to set the correct base path in vite.config.js if hosting under a repo subpath:

base: '/Myapk-vault/',

Tech Stack

Vite - Fast frontend tooling

React - UI framework

GitHub Pages - Hosting platform


Roadmap

Extract metadata from inside APKs (AndroidManifest parsing)

Auto-hash for file verification

Integration with Google Sheets API

Dark mode / theming support


License

MIT License. Use, fork, remix, and improve freely.


---

Created by @tprivitor to make APK hoarding a little less chaotic.

