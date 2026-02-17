const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // MongoDB tự tạo _id, không cần id thủ công
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false }, // Cho phép thiếu ảnh (sẽ lấy default)
    category: { type: String, required: true },
    description: String,
    rating: { type: Number, default: 5 }
});

module.exports = mongoose.model('Product', productSchema);
