const Item = require('../models/itemModel');

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const item = new Item({ name, description });
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
