const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware xác thực token (Bảo vệ API Admin)
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token sau Bearer
    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided!' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cafe_plizme_secret_key_2024');
        req.user = decoded; // Lưu user vào request để dùng sau
        next(); // Token OK -> Cho qua
    } catch (err) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

// 1. Lấy tất cả sản phẩm (Public - Ai cũng xem được)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Thêm món mới (Chỉ Admin - Cần Token)
router.post('/', verifyToken, async (req, res) => {
    const { name, price, image, category, description } = req.body;

    // Validate cơ bản
    if (!name || !price) {
        return res.status(400).json({ message: 'Tên và giá là bắt buộc!' });
    }

    const product = new Product({
        name,
        price,
        image: image || 'https://via.placeholder.com/150', // Ảnh default nếu ko có
        category: category || 'other',
        description
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Sửa món (Chỉ Admin - Cần Token)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy món ăn!' });

        // Cập nhật thông tin
        if (req.body.name != null) product.name = req.body.name;
        if (req.body.price != null) product.price = req.body.price;
        if (req.body.image != null) product.image = req.body.image;
        if (req.body.category != null) product.category = req.body.category;
        if (req.body.description != null) product.description = req.body.description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. Xóa món (Chỉ Admin - Cần Token)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Không tìm thấy món để xóa!' });

        await product.deleteOne(); // Xóa khỏi DB
        res.json({ message: 'Đã xóa món ăn thành công!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Seed data (Tạo lại dữ liệu mẫu) - Giữ nguyên không cần bảo vệ quá kỹ lúc dev
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
