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

The HTML editor tab, and the body text of the Alert panel tab, have an **Insert** row for styled blocks in the navy and blue palette:

- **Icon circle**: a gradient circle holding one of 32 built-in icons, a number or short text, or your own image URL.
- **Buttons & chips**: one per line as `Label | link`. Styles: gradient, solid, spark blue, outline, chip (for dark backgrounds) and small tag.
- **Callout circle**: a circle beside a bold title and text, or a centered award card with a big value.
- **Callout box**: note, warning, white card, highlight, success or important, with an optional icon circle.
- **Stat cards**: one per line as `Value | unit | label | link`.
- **Section heading**: a heading with the accent bar and an optional subtitle.

**Colors.** The Insert row has a **Colors** switch: **Brand** (default; Hero Dark Blue #00194A, Hero Bright Blue #005EFF and the rest of the palette) or **Service Enhancements** (the original navy and blue page). Circle and heading-bar gradients come from the palette sheet. Each color pairs with the one to its right (Hero Dark Blue, Hero Bright Blue, Hero Accent Green, Life Unlimited Yellow, Orange, Purple, then Spectrum Blue, Charter Blue, Charter Teal, Charter Gold, Charter Burgundy, Charter Purple). Each purple pairs with the blue in the second column, and the two greys pair with each other. Stat cards, solid pills and the "palette color" callout box can use any single palette color. Light circles automatically get a navy icon instead of white.

Every component uses inline styles, so the copied HTML needs no `<style>` block. Paste it into an Embed or Script Editor web part; the modern Text web part strips most styling. Click a component in the editor to move, duplicate or remove it.

## Version label

The header shows the version (for example `v1.7.0 · Nov 6, 2026 · build 12 · 5d4206f`).

- The **version number** (`v1.7.0`) is set by hand in `public/index.html`. Raise it when you ship a change: the middle number for a new feature, the last number for a fix.
- The **date, build number and commit** are filled in automatically by the deploy workflow, so they always match what is live. A copy opened straight from disk shows "local copy" instead.

## Alert panel heading icon

In the Alert panel's **Icon** menu, choose **Icon circle** (first tile after None) to use a gradient icon circle as the heading icon instead of a SharePoint icon file. You get every gradient, glyph, number/text or image option, plus size, icon color and shadow. Like the other components it needs an Embed or Script Editor web part to keep its styling.
