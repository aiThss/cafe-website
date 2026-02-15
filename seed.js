require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    { id: "1", name: "Cà Phê Đen", price: 29000, image: "coffee.jpg", category: "coffee", description: "Cà phê đen đậm đà, chuẩn vị Việt" },
    { id: "2", name: "Cà Phê Sữa", price: 35000, image: "latte.jpg", category: "coffee", description: "Hương vị truyền thống ngọt ngào" },
    { id: "3", name: "Bạc Xỉu", price: 39000, image: "machiato.jpg", category: "coffee", description: "Sữa tươi hòa quyện cà phê nhẹ nhàng" },
    { id: "4", name: "Trà Đào Cam Sả", price: 45000, image: "hong-tra-sua.jpg", category: "tea", description: "Thanh mát giải nhiệt ngày hè" },
    { id: "5", name: "Trà Sữa Trân Châu", price: 42000, image: "capuchino.png", category: "tea", description: "Topping trân châu dai ngon" },
    { id: "6", name: "Sinh Tố Bơ", price: 55000, image: "americano.jpg", category: "smoothie", description: "Béo ngậy từ bơ sáp Daklak" }
];

// Thay 'bacground5.png' bằng 'capuchino.png' cho hợp lý hơn (nếu có), hoặc giữ nguyên nếu user thích. 
// Trong list file Step 1219 có 'capuchino.png'. Trà sữa dùng capuchino.png tạm hoặc bacground5.png như cũ.
// Để an toàn tôi dùng lại danh sách cũ, nhưng sửa image "Trà Sữa" thành "bacground5.png" (như cũ) hoặc đổi sang cái khác nếu cần.
// Step 1567 dùng "bacground5.png". Ok giữ nguyên.

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected for seeding...');

        try {
            await Product.deleteMany({});
            console.log('Cleared old products.');

            await Product.insertMany(products);
            console.log('Inserted sample products.');

            console.log('Seeding completed!');
            process.exit(0);
        } catch (error) {
            console.error('Seeding error:', error);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
