# Useful Tools

A modular, Vue 3-based toolkit with easy tool creation and automatic GitHub Pages deployment.

## 🚀 Quick Start

```bash
# 1. Install dependencies (root level)
npm install
cd backend && npm install && cd ../frontend && npm install

# 2. Run locally (need 2 terminals)
# Terminal 1 - Backend:
cd backend && npm run dev

# Terminal 2 - Frontend:
cd frontend && npm run dev

# Open browser: http://localhost:5173
```

## 🛠️ Create a Tool

```bash
npm run create -- tool my-tool
```

Generates a Vue 3 component at `tools/my-tool/index.vue`

## 🚀 Deploy

```bash
git push origin main
```

Auto-deploys to GitHub Pages via GitHub Actions.

## 📚 Documentation

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Project structure & design
- **[CREATING_TOOLS.md](docs/CREATING_TOOLS.md)** - Build tools with Vue 3
- **[SETUP.md](docs/SETUP.md)** - Detailed installation & configuration
- **[TESTING_WORKFLOW.md](docs/TESTING_WORKFLOW.md)** - Pre-commit tests & CI/CD

## 📁 Structure

```
useful_tool/
├── backend/          # Express API (port 3000)
├── frontend/         # Vue 3 app (port 5173)
├── tools/            # Your tools (Vue components)
├── docs/             # Documentation
├── legacy/           # Original files (backup)
└── package.json      # Root workspace config
```

## ✨ Features

- ✅ Vue 3 + Vite
- ✅ Express backend (optional)
- ✅ GitHub Pages deployment
- ✅ Vitest testing framework
- ✅ Pre-commit test enforcement
- ✅ CLI tool generator

## 🧪 Testing

```bash
# All tests
npm test

# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test
```

## 🔗 Links

- Frontend: http://localhost:5173 (local)
- Backend: http://localhost:3000 (local)
- GitHub Pages: https://yourusername.github.io/useful_tool/ (deployed)

## 📂 Original Files

Your original files are preserved in `/legacy/`. Check `legacy/index.html` to see the old dashboard.

---

**Start building: `npm run create -- tool my-first-tool`** 🚀