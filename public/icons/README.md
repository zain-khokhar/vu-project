This folder contains PWA and favicon icons used by the site.

If you need to generate icons from the primary PNG (`public/favicon.png`), run the following:

1. Install `sharp` as a dev dependency:

   npm install --save-dev sharp

2. Run the generator script:

   npm run generate-icons

This will create icons in the following sizes:
- icon-16x16.png
- icon-32x32.png
- icon-48x48.png
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-192x192.png
- icon-256x256.png
- icon-384x384.png
- icon-512x512.png
- apple-touch-icon.png (180x180)

Note: If you cannot install `sharp`, generate the PNGs using a graphics tool (Photoshop, GIMP, or online tools) and place them in the `public/icons/` folder.
