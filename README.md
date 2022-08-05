# Liberator
 
Liberator is a cross-platform, open-source file viewer powered by Tauri, three.js and KaitaiStruct. Its primary focus is to provide viewing and export support for various obscure binary formats.

## Supported Formats

- SlaveDriver Engine Level (.LEV)
- SlaveDriver Engine Bitmap (.PIC)
- BRender Engine Pixelmap (.PIX)
- Tank Engine Model (.TMF)

Currently, only viewing the asset is supported.

## Contributing

Want to contribute? Feel free to make a pull request with your format thoroughly documented in a KaitaiStruct YAML file (KSY). If you take the time to write the parser in /dist/js/viewer.js, even better!

## Contributors

- Jaycie Erysdren
- Paril
- TheEnbyWitch
- Spike
- vfig
- ReyeMe
- Rich Whitehouse

## Building

TODO: Flesh this out more.

Prerequisites: See [this page][https://tauri.app/v1/guides/getting-started/prerequisites] on tauri.app 

Instructions: See [this page][https://tauri.app/v1/guides/getting-started/setup/html-css-js] on tauri.app

## Images

![A view of the software Liberator, with a level from Quake for the Sega Saturn loaded in the asset viewport.](/meta/images/liberator_quakelev.png)
![A view of the software Liberator, with a texture from the BRender engine loaded in the asset viewport.](/meta/images/liberator_brenderpix.png)