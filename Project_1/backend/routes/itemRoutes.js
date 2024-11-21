const express = require('express');
const router = express.Router();
const { getItems, createItem, deleteItem, updateItem } = require('../controllers/itemController');

router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
