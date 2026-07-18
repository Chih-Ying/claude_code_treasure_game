---
description: Build and deploy this project to Vercel
---
Deploy this project to Vercel:

1. Detect the package manager (`package-lock.json` → npm, `yarn.lock` → yarn, `pnpm-lock.yaml` → pnpm) and the build script from `package.json`.
2. Run the project's build command and confirm it succeeds.
3. Check whether the Vercel CLI is available (`vercel --version`); if not, note it can be run via `npx vercel` without a global install.
4. Confirm with the user before running the actual deploy command (`vercel` for a preview, `vercel --prod` for production), since this pushes to a shared/public environment.
5. Run the deploy command and report the resulting deployment URL.
