const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Kết nối MongoDB (Copy từ server.js cho chắc)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cafe_user:cafe123@cluster0.mongodb.net/cafe_db?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const createAdmin = async () => {
    try {
        // Xóa admin cũ nếu có để tránh trùng
        await User.deleteMany({ username: 'admin' });

        const hashedPassword = await bcrypt.hash('123123', 10); // Mật khẩu mặc định: 123123

        const adminUser = new User({
            username: 'admin',
            password: hashedPassword,
            isAdmin: true
        });

        await adminUser.save();
        console.log('✅ Admin account created successfully!');
        console.log('👤 Username: admin');
        console.log('🔑 Password: 123123');

    } catch (error) {
        console.error('❌ Error creating admin:', error);
    } finally {
        mongoose.disconnect();
    }
};

createAdmin();
