# Tools Directory

Each tool is a self-contained module that can be:
- Imported as a React component in the frontend
- Used as a backend API endpoint
- Deployed independently

## Structure

Each tool folder contains:
- `index.js` or `index.jsx` - Main export
- `utils.js` - Helper functions
- `README.md` - Tool documentation
- `test.js` - Unit tests (optional)

## Example Tool: Spin Wheel

```
spin-wheel/
├── index.jsx          # React component
├── utils.js           # Spin wheel logic
├── styles.css         # Component styles
└── README.md          # Documentation
```

## Adding a New Tool

1. Create a new folder: `tools/your-tool/`
2. Add `index.jsx` for the React component
3. Add backend integration in `backend/routes/tools.js`
4. Update the tools list in both backend and frontend
