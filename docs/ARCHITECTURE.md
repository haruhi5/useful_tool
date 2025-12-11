# Useful Tools - Project Structure

A modern, modular toolkit architecture with separated frontend and backend, designed for multi-tool development.

## 📁 Directory Structure

```
useful_tool/
├── backend/              # Express.js API server
│   ├── index.js         # Server entry point
│   ├── package.json
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   └── .env.example
│
├── frontend/             # Vue 3 + Vite SPA
│   ├── src/
│   │   ├── App.vue      # Main component
│   │   ├── main.js      # Entry point
│   │   └── components/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── tools/                # Tool modules
│   ├── spin-wheel/       # Example: Spin wheel tool
│   ├── currency-converter/
│   ├── hiking-guide/
│   └── README.md        # Guide for creating new tools
│
├── shared/               # Shared utilities & types
│   ├── types.js         # Type definitions
│   └── api.js           # API client utilities
│
├── docs/                 # Documentation
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm run dev  # Development with auto-reload
# or
npm start    # Production mode
```

Backend runs on **http://localhost:3000**
- Health check: `GET /api/health`
- Tools list: `GET /api/tools`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev   # Development with Vite hot-reload
npm run build # Production build
npm run preview
```

Frontend runs on **http://localhost:5173**
- Proxied API calls to backend via `/api`

## 🛠️ Creating a New Tool

### Quick Method (Recommended)
```bash
npm run create -- tool my-tool-name
```

This auto-generates the tool folder with Vue component, tests, and README.

### Manual Steps

1. **Create tool folder**
```bash
mkdir tools/your-tool
```

2. **Create Vue component**
```vue
<!-- tools/your-tool/index.vue -->
<template>
  <div class="tool-container">
    <h2>Your Tool</h2>
    <!-- Tool content -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello')
</script>

<style scoped>
.tool-container {
  padding: 20px;
}
</style>
```

3. **Backend auto-discovers tools** via `/api/tools`

4. **Frontend loads tools** from the tools/ directory

## 📱 Mobile & Desktop Access

The frontend is fully responsive and works on:
- ✅ Desktop browsers
- ✅ Tablets
- ✅ Mobile phones

To access from other devices on your network:
1. Find your computer's IP address
2. Access frontend: `http://<your-ip>:5173`
3. Backend API: `http://<your-ip>:3000/api`

## 🔧 Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## 📦 Shared Code

Use `shared/` for:
- Type definitions (`types.js`)
- API utilities (`api.js`)
- Constants and helpers

Import in components:
```javascript
import { fetchAllTools } from '../shared/api.js'
```

## 🧪 Testing

Run tests from each package:
```bash
cd backend && npm test
cd frontend && npm test
```

## 🚢 Deployment

### Frontend (Automatic)
Deploy automatically to GitHub Pages:
1. Push code to `main` branch
2. GitHub Actions builds and deploys
3. Available at: `https://yourusername.github.io/useful_tool/`

Manual deployment options:
- Vercel, Netlify
- AWS S3 + CloudFront
- Any static host

### Backend (Optional)
Deploy to services like:
- Railway, Render (easy, free tier)
- Heroku, AWS EC2, DigitalOcean
- Docker container

## 📝 File Naming Conventions

- Vue components: PascalCase (e.g., `SpinWheel.vue`)
- Utilities: camelCase (e.g., `spinUtils.js`)
- Styles: kebab-case (e.g., `spin-wheel.css`)
- Tool folders: kebab-case (e.g., `spin-wheel/`)
- Tool main file: always `index.vue`

## 💡 Best Practices

1. **Keep tools modular** - Each tool should be self-contained
2. **Use shared utilities** - Don't duplicate common code
3. **Responsive design** - Always test on mobile
4. **Error handling** - Gracefully handle API failures
5. **Documentation** - Include README in each tool folder

## 🎯 Next Steps

1. Install dependencies in both backend and frontend
2. Run both servers simultaneously (can use npm-run-all)
3. Start building tools!
4. Test on mobile by accessing from another device

---

Created with ❤️ for your personal toolkit
