# UE Business School Portal – Antigravity Package

This ZIP is an Antigravity handoff package containing the full build specification and prompt.

**Important:** This is not yet the finished runnable application. Antigravity must generate the application source code from the included specification. A Supabase project and credentials are also required for live authentication, database and uploads.

## Steps
1. Extract this ZIP.
2. Open Google Antigravity and open the extracted folder as the workspace.
3. Open `ANTIGRAVITY_PROMPT.md` and give its contents to Antigravity.
4. Ask Antigravity to create the complete source code in this folder, run checks, and fix errors.
5. Create a Supabase project.
6. Fill the generated `.env.local` using the generated `.env.example`.
7. Follow the generated README to install dependencies and run locally (usually `npm install` and `npm run dev`).

Never expose the Supabase service-role key in browser code.
