# Interactive Terminal/CLI Portfolio Website

An innovative, terminal-based personal portfolio website tailored for an SRE / DevOps Engineer. The application mimics a Linux shell environment where users can type native and custom CLI commands to explore work history, tech stacks, and infrastructure metrics.

---

## 🛠 SYSTEM ARCHITECTURE SPECIFICATIONS
- **Frontend Stack**: Vanilla HTML5, CSS3, and modern asynchronous JavaScript (ES6+).
- **External Dependencies**: Zero. Avoid bulky frameworks or external canvas rendering libraries to ensure instant page load speeds.
- **State Management**: Local client-side session arrays to store command history buffers.

---

## 🏗 STEP-BY-STEP BUILD ORDER
Instruct the agent to build the files sequentially using the guidelines below:

### 1. Structure (`index.html`)
- Wrap the entire window canvas in a `.terminal-window` viewport wrapper.
- Include a fixed header component representing a mock desktop window bar with three non-functional control dots (Red/Yellow/Green window controls).
- Build a container `#output-stream` to append previous commands and responses dynamically.
- Build an active command block tracking the prompt layout string `guest@sre-portfolio:~$ ` coupled tightly with an active `<input type="text">` node.

### 2. Interface Styling (`style.css`)
- **Theme**: Monospaced dark mode environment. 
- **Colors**: Background `#0d1117`, Primary Text Accent `#39ff14` (Neon Green), Prompt String `#58a6ff` (Terminal Blue), Component Error Flags `#ff7b72` (Crimson Red).
- **Fonts**: Force uniform sizing utilizing monospaced families (`'Courier New'`, `Courier`, `monospace`).
- **Behaviors**: 
  - Ensure the active `<input>` field hides default browser borders and highlights outline focuses on selection.
  - Implement a persistent blinking vertical cursor trick using CSS animation keyframes on the prompt selector.

### 3. Core Engine Rules (`script.js`)
- **Event Listeners**: Listen on the `keydown` event specifically for the `Enter` action.
- **Input Sanitation**: Normalize inputs on processing using `.trim().toLowerCase()` strings.
- **DOM Refresh Matrix**: Ensure that every command executed forces an immediate window scroll action using `window.scrollTo(0, document.body.scrollHeight)` to keep the lower terminal prompt in clear view.

---

## 📝 SYSTEM COMMAND DIRECTORY & MATRIX DATA
Program the command parser to match the exact payload data mappings detailed below:

| Target Command | Response Payload Content (Format cleanly inside the terminal output) |
| :--- | :--- |
| `help` | Lists available interactions: `about`, `experience`, `skills`, `systemctl`, `curl`, `clear` |
| `about` | "SRE & DevOps Engineer specializing in high-availability, microservice infrastructure scalability, and zero-downtime deployment pipelines." |
| `experience` | **[Juspay] - DevOps/SRE Engineer (2021 - Present)**<br>• Scaled distributed core services handling 5M+ daily transactional workloads.<br>• Architected CI/CD matrix build maps to eliminate runtime release overhead.<br>• Implemented proactive alert matrices reducing system-wide MTTR across services. |
| `skills` | "AWS, Kubernetes, Docker, Terraform, CI/CD Engine, Prometheus, Grafana, Python, Bash" |
| `systemctl` | `uptime_agent.service - Active (Running) since 2021`<br>`load_balancer_core  - Healthy [Traffic Status: Nominal]` |
| `curl` | Outputs your complete career profile parsed natively as a cleanly indented JSON payload block. |
| `clear` | Completely wipes out all nested nodes inside the `#output-stream` wrapper. |

---

## ⚠️ BEHAVIORAL CONSTRAINTS & EDGE CASES
- **Invalid Commands**: If an unrecognized command is entered, output: `bash: command not found: [input]. Type 'help' to view options.`
- **Empty Prompts**: Do not trigger errors or push logs if a user presses `Enter` on an empty or blank string field. Just output a clean line break.
- **Focus Trap**: Ensure clicking anywhere inside the global `.terminal-window` viewport programmatically redirects element focus straight back to the primary `#command-input` field.

---

## 🚀 HOW TO INITIALIZE THE AGENT PROMPT
To kick off the build, copy and paste this exact instruction string directly to your coding agent:

> *"Please parse the attached README.md file specs. Generate the `index.html`, `style.css`, and `script.js` files perfectly according to the rules and schemas provided. Ensure everything is modular, cleanly commented, and ready for deployment on GitHub Pages or Vercel."*
