require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// Connect to MongoDB with better error handling and timeout settings
// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connection successful!'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route explicitly (optional, but good for safety)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Routes
const productRouter = require('./routes/products');
app.use('/products', productRouter);

// Start server immediately
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
