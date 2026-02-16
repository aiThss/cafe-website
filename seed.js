require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

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
