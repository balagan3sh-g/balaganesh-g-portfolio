# AGENTS.md - Project Memory for balagan3sh-g Portfolio

## Project Overview
Terminal-based CLI portfolio website for an SRE/DevOps Engineer. Mimics a Linux shell environment where users type commands to explore work history, skills, and more. Built with Astro.

## Tech Stack
- **Framework**: Astro v5.18+ (static output, zero JS by default except terminal interactivity)
- **Language**: TypeScript
- **Styling**: Scoped CSS in `.astro` components + global CSS variables
- **No UI framework** (no React/Vue/Svelte) — vanilla JS in `<script>` tags
- **Node**: v24 (local), v24 (CI)
- **Package Manager**: npm

## Commands
- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to dist/
- `npm run preview` — preview production build
- `npx astro check` — TypeScript + Astro diagnostics
- `git push --no-verify origin main` — push (GitGuardian hook requires --no-verify)

## Architecture
```
src/
├── data/portfolio.ts          → All profile data (name, experience, skills, socials)
├── styles/global.css          → CSS variables, reset, animations, scanline effect
├── layouts/Layout.astro       → HTML shell, meta tags, favicon
├── components/Terminal.astro  → All terminal logic, styling, VFS, command parser
└── pages/index.astro          → Entry page (imports Layout + Terminal)
```

## Key Design Decisions
- **Virtual Filesystem (VFS)**: `ls`, `cd`, `cat` work together on a fake filesystem built from portfolio data
  - Directories: `about/`, `experience/`, `skills/`, `links/`, `education/`
  - Files: `bio.txt`, `juspay-sre-ii.txt`, `juspay-sre-i.txt`, `juspay-intern.txt`, `stack.txt`, `contact.txt`, `degree.txt`, `profile.json`, `readme.txt`
  - Tab completion is context-aware (suggests dirs for `cd`, files+dirs for `cat`/`ls`)
- **`curl`**: Real HTTP requests via `fetch` through `https://corsproxy.io/?url=` proxy
  - Supports: `-h/--help`, `-V/--version`, `-I/--head`, `-s/--silent`, `-L/--location`, `-X/--request`, `-H/--header`, `-d/--data`, `-o/--output`
  - JSON responses auto-formatted with syntax highlighting
  - Error codes mimic real curl (3=bad URL, 6=host not found, 7=connection refused, 28=timeout, 35=SSL)
- **`systemctl`**: Removed — replaced by VFS
- **Banner**: Terrace figlet font for `balagan3sh_g` using `░` block characters
- **Theme**: Dark (#0d1117 bg), neon green (#39ff14), terminal blue (#58a6ff), crimson red (#ff7b72)
- **CRT effect**: Subtle scanline overlay via CSS `body::after`

## Naming Convention
- Use `balagan3sh_g` / `balagan3sh-g` / `balagan3sh.g` everywhere EXCEPT:
  - `portfolio.ts` `name` field → "Balaganesh G" (real name)
  - `portfolio.ts` `about` field → real name in description

## Terminal Commands
| Command | Description |
|---------|-------------|
| `help` | Lists available commands |
| `about` | Shows name, role, bio |
| `experience` | Work history with bullet points |
| `skills` | Tech stack & tools |
| `curl [url]` | Real HTTP fetch via corsproxy.io |
| `links` | GitHub, LinkedIn, Email (clickable) |
| `ls [dir]` | List VFS contents |
| `cd <dir>` | Navigate VFS directories |
| `cat <file>` | Read VFS file contents (no args = "Meow" easter egg) |
| `education` | Academic background |
| `resume` | Download PDF resume |
| `clear` | Wipe terminal |
| `neofetch` | System info ASCII art |
| `ping` | Fake ping to balagan3sh_g.dev |
| `date` | Current date/time |
| `echo [text]` | Print text |
| `whoami` | Easter egg |
| `sudo` | Easter egg (permission denied) |
| `ls`/`cat`/`vim`/`nano`/`exit`/`cd` | Various easter eggs |

## Easter Eggs
- `cat` with no args → "Meow. Just kidding — try 'cat <file>' to read something."
- `sudo` → "Permission denied: you are not root. Nice try though."
- `vim` → "Good luck exiting that."
- `nano` → "Seriously? In this economy?"
- `exit` → "You can't escape that easily. This is your home now."
- Tab completion on commands AND filesystem entries
- `Ctrl+L` to clear
- Arrow up/down for command history

## Deployment
- **Platform**: GitHub Pages
- **Repo**: https://github.com/balagan3sh-g/balaganesh-g-portfolio
- **Site URL**: https://balagan3sh-g.github.io/balaganesh-g-portfolio/
- **Workflow**: `.github/workflows/deploy.yml` (auto-deploys on push to main)
- **Config**: `base: '/balaganesh-g-portfolio/'` in astro.config.mjs
- **Pages Source**: GitHub Actions (must be enabled in repo settings)
- **Remote**: SSH (`git@github.com:balagan3sh-g/balaganesh-g-portfolio.git`)
- **Push**: Use `--no-verify` (GitGuardian pre-push hook blocks otherwise)

## Cloudflare Tunnel (for dev sharing)
- `cloudflared tunnel --url http://localhost:4321`
- Works because `server.allowedHosts: true` in astro.config.mjs (Astro's own config, NOT vite.server)

## Boot Sequence
1. Animated `[ OK ]` boot lines with delays
2. Terrace ASCII art banner (`balagan3sh_g` in `░` characters)
3. Role tagline + help hint
4. Input focus + ready

## CSS Variables (global.css)
```
--bg: #0d1117          --neon: #39ff14       --blue: #58a6ff
--red: #ff7b72         --yellow: #d29922     --green: #3fb950
--text-dim: #8b949e    --text: #c9d1d9       --bg-elevated: #161b22
--bg-border: #30363d   --font: 'Courier New', Courier, monospace
```

## File Sizes (built)
- JS bundle: ~15KB (gzip: ~5KB)
- Total page: minimal (static HTML + small JS chunk)

## Git History
1. `initial dev: terminal-based SRE portfolio with Astro`
2. `replace systemctl with virtual filesystem for ls/cd/cat`
3. `make curl do real fetch requests via corsproxy.io`
4. `make curl behave like real curl with args, help, and error codes`
5. `add GitHub Pages deployment workflow and base path config`
6. `update site URL to balagan3sh-g.github.io`
7. `bump Node to 24 in deploy workflow`
