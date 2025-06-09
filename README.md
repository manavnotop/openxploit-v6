# 🛡️ OpenXploit - Local-First Vulnerability Scanner

**OpenXploit** is a local-first application that helps you assess vulnerabilities in any app running on your machine. Just enter a local URL or a Docker image name, and OpenXploit handles everything — from setup to scanning — **completely offline**.

---

## 🚀 Features

- 🔎 Spider Scan followed by Active Scan
- 🖥️ Scan any **localhost** app or a **Dockerized** app
- 📊 Categorized vulnerabilities:
  - **High**
  - **Medium**
  - **Low**
  - **Informational**
- 🧪 Full scan pipeline
- 🧠 One-command install (Coolify-style)
- 📈 Clean dashboard UI

---

## 📦 Tech Stack

- **Frontend:** Next.js (App Router)
- **UI:** ShadCN UI + Tailwind CSS
- **Animation:** Framer Motion
- **Scanner:** OWASP ZAP (via Docker)
- **Deployment:** Local-first only (no cloud!)

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/openxploit.git
cd openxploit
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run the App

```bash
npm run dev
# or
yarn dev
```

Then open: [http://localhost:1443](http://localhost:1443)

---

## 🧪 Usage Flow

```text
[1] Enter URL or Docker image
     ↓
[2] Build and run container (if Docker)
     ↓
[3] Run Spider Scan
     ↓
[4] Run Active Scan
     ↓
[5] View vulnerabilities on dashboard
```

---

## 🧬 One-Command Install (Optional)

```bash
curl -sSL openxploit.sh | bash
```

This will set up everything for you locally — just like Coolify.

