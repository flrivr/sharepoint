# Alert Panel Builder

Static single-page app (no backend). Deploy to Firebase Hosting:

1. Install the CLI once: `npm install -g firebase-tools`
2. `firebase login`
3. From this folder, link your project: `firebase use --add` (pick your Firebase project)
4. `firebase deploy --only hosting`

The CLI prints the live URL when it finishes.

Notes:
- The SharePoint icons only render in the preview when the viewer is signed in to your SharePoint and the browser allows it; the generated HTML works once pasted into SharePoint.
- To restrict who can open the app, use Firebase Hosting with an auth-protected setup or keep the URL internal.

## HTML editor components

The HTML editor tab has an **Insert** row for styled blocks in the navy and blue palette:

- **Icon circle**: a gradient circle holding one of 32 built-in icons, a number or short text, or your own image URL.
- **Buttons & chips**: one per line as `Label | link`. Styles: gradient, solid, spark blue, outline, chip (for dark backgrounds) and small tag.
- **Callout circle**: a circle beside a bold title and text, or a centered award card with a big value.
- **Callout box**: note, warning, white card, highlight, success or important, with an optional icon circle.
- **Stat cards**: one per line as `Value | unit | label | link`.
- **Section heading**: a heading with the accent bar and an optional subtitle.

Every component uses inline styles, so the copied HTML needs no `<style>` block. Paste it into an Embed or Script Editor web part; the modern Text web part strips most styling. Click a component in the editor to move, duplicate or remove it.
