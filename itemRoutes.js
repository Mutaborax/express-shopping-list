const express = require('express');
const items = require('./fakeDb');
const router = express.Router();

// GET /items
router.get('/', (req, res) => {
    res.json(items);
});

// POST /items
router.post('/', (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    res.json({ added: newItem });
});

// GET /items/:name
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) return res.status(404).json({ message: "Not found" });
    res.json(foundItem);
});

// PATCH /items/:name
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) return res.status(404).json({ message: "Not found" });
    
    foundItem.name = req.body.name || foundItem.name;
    foundItem.price = req.body.price || foundItem.price;
    
    res.json({ updated: foundItem });
});

// DELETE /items/:name
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    if (itemIndex === -1) return res.status(404).json({ message: "Not found" });
    
    items.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
});

module.exports = router;
