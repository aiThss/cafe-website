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
        { id: "1", name: "Coffee", price: 25000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/coffee.jpg", category: "coffee", description: "Đậm đà hương vị truyền thống" },
        { id: "2", name: "Latte", price: 35000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/latte.jpg", category: "coffee", description: "Sữa nóng đánh bọt mịn màng" },
        { id: "3", name: "Cappuccino", price: 35000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/capuchino.png", category: "coffee", description: "Hương thơm nồng nàn quyến rũ" },
        { id: "4", name: "Espresso", price: 20000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/espresso.jpg", category: "coffee", description: "Năng lượng tỉnh táo tức thì" },
        { id: "5", name: "Macchiato", price: 38000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/machiato.jpg", category: "coffee", description: "Sự kết hợp tinh tế" },
        { id: "6", name: "Mocha", price: 40000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/mocha.jpg", category: "coffee", description: "Vị Chocolate ngọt ngào" },
        { id: "7", name: "Americano", price: 22000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/americano.jpg", category: "coffee", description: "Cà phê đen phong cách Mỹ" },
        { id: "8", name: "Hồng trà sữa", price: 30000, image: "https://cdn.jsdelivr.net/gh/aiThss/cafe-website@main/cfe_img/coffee-img/hong-tra-sua.jpg", category: "tea", description: "Thơm béo chuẩn vị" }
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
