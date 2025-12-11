# Environment Setup Guide

## Prerequisites
- Node.js v18+ ([download](https://nodejs.org/))
- npm (comes with Node.js)

## Installation

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Running Both Servers

### Option A: Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option B: Using npm-run-all (Single Command)

1. Install globally or as dev dependency:
```bash
npm install -g npm-run-all
```

2. Create a script in root `package.json`:
```json
{
  "scripts": {
    "dev": "npm-run-all --parallel dev:backend dev:frontend",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev"
  }
}
```

3. Run from root:
```bash
npm run dev
```

## Accessing the Application

### Local Machine
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

### From Other Devices (Same Network)
1. Find your machine's IP address:
   - **Windows**: `ipconfig` → Look for "IPv4 Address"
   - **Mac/Linux**: `ifconfig` → Look for "inet"

2. Access from other device:
   - Frontend: http://<your-ip>:5173
   - Backend: http://<your-ip>:3000

## Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:

**Backend:**
```bash
cd backend
PORT=3001 npm run dev
```

**Frontend:** Edit `vite.config.js`:
```javascript
server: { port: 5174 }
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -r node_modules
npm install
```

### API Connection Issues
Check that both servers are running and the proxy in `frontend/vite.config.js` points to the correct backend URL.

---

For more details, see [ARCHITECTURE.md](./ARCHITECTURE.md)
