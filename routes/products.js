const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create sample data (seed)
router.post('/seed', async (req, res) => {
    const products = [
        // Data populated from previous MENU_DATA (example)
        { id: "1", name: "Cà Phê Đen", price: 29000, image: "coffee.jpg", category: "coffee", description: "Cà phê đen đậm đà, chuẩn vị Việt" },
        { id: "2", name: "Cà Phê Sữa", price: 35000, image: "latte.jpg", category: "coffee", description: "Hương vị truyền thống ngọt ngào" },
        { id: "3", name: "Bạc Xỉu", price: 39000, image: "machiato.jpg", category: "coffee", description: "Sữa tươi hòa quyện cà phê nhẹ nhàng" },
        { id: "4", name: "Trà Đào Cam Sả", price: 45000, image: "hong-tra-sua.jpg", category: "tea", description: "Thanh mát giải nhiệt ngày hè" },
        { id: "5", name: "Trà Sữa Trân Châu", price: 42000, image: "bacground5.png", category: "tea", description: "Topping trân châu dai ngon" },
        { id: "6", name: "Sinh Tố Bơ", price: 55000, image: "americano.jpg", category: "smoothie", description: "Béo ngậy từ bơ sáp Daklak" }
    ];

    try {
        await Product.deleteMany({});
        const createdProducts = await Product.insertMany(products);
        res.json(createdProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
