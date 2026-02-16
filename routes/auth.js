const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key cho JWT (Trong thực tế nên để trong .env)
const JWT_SECRET = process.env.JWT_SECRET || 'cafe_plizme_secret_key_2024';

// Đăng ký (Dùng để tạo Admin lần đầu, sau này có thể tắt đi)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Kiểm tra user tồn tại
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            isAdmin: true // Mặc định tạo là admin cho tiện demo
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

        // Tạo token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1d' } // Token hết hạn sau 1 ngày
        );

        res.json({ token, username: user.username, isAdmin: user.isAdmin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
