import express from 'express';

const router = express.Router();

// List all available tools
router.get('/', (req, res) => {
  res.json({
    tools: [
      { id: 'spin-wheel', name: 'Spin Wheel', category: 'game' },
      { id: 'currency', name: 'Currency Converter', category: 'utility' },
      { id: 'hiking-guide', name: 'Hiking Safety Guide', category: 'guide' }
    ]
  });
});

// Get specific tool
router.get('/:id', (req, res) => {
  res.json({ message: `Tool ${req.params.id} details coming soon` });
});

export default router;
