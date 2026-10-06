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
