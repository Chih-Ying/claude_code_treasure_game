---
description: Build and deploy this project to GitHub Pages
---
Deploy this project to GitHub Pages using the `gh-pages` npm package:

1. Confirm the project has a git remote pointing to GitHub (`git remote -v`). If there's no remote, stop and tell the user to create/push the repo to GitHub first.
2. Detect the build command and output directory:
   - Read `package.json` for a `build` script.
   - Determine the output directory from the bundler config (e.g. `outDir` in `vite.config.ts`, `build/` for CRA, `dist/` as a common default). Do not assume — check the actual config.
3. For a project site (`https://<owner>.github.io/<repo>/`), the app's asset base path must match `/<repo>/`:
   - Vite: set `base: '/<repo>/'` in `vite.config.ts` if not already set.
   - CRA: set `"homepage": "https://<owner>.github.io/<repo>"` in `package.json` if not already set.
   - Skip this if the repo is already configured as a user/org root page (`<owner>.github.io`).
4. Ensure `gh-pages` is available as a dev dependency (`npm install -D gh-pages` if missing).
5. Run the project's build command, then confirm with the user before publishing, since this pushes to a shared/public GitHub branch.
6. Deploy with `npx gh-pages -d <output-directory>` — this pushes the build output to the `gh-pages` branch.
7. Check whether GitHub Pages is enabled for the repo (Settings → Pages, source: `gh-pages` branch). If not yet enabled and the `gh` CLI is available, offer to enable it; otherwise tell the user how to enable it manually.
8. Report the resulting Pages URL: `https://<owner>.github.io/<repo>/`.
