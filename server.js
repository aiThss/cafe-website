require('dotenv').config();
const dns = require('dns');
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']); // Force Google DNS to fix SRV lookup
} catch (e) {
    console.log('Could not set custom DNS servers');
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
// Connect to MongoDB with better error handling and timeout settings
// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
    }
})
    .then(() => console.log('MongoDB connection successful!'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Helper route to check Server IP
app.get('/server-ip', async (req, res) => {
    try {
        // Dynamic import for node-fetch if needed, or use native fetch in Node 18+
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        res.send(data.ip);
    } catch (error) {
        res.status(500).send(`Error fetching IP: ${error.message}`);
    }
});

// Routes
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');

app.use('/products', productRouter);
app.use('/auth', authRouter);

// Start server immediately
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
