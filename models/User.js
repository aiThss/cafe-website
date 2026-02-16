const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Mật khẩu đã mã hóa
    isAdmin: { type: Boolean, default: false } // Phân quyền admin
});

module.exports = mongoose.model('User', userSchema);
