const express = require('express');
const http = require('http');
const spikeRoutes = require('./routes/spikeRoutes');
const initializeSocket = require('./tickgenerator');
const connectDB = require('./config/db');

const app = express();
const port = 8000;

// MongoDB setup
connectDB()

// Middleware
app.use(express.json());

// Routes
app.use('/api', spikeRoutes);

app.get('/', (req, res) => {
    res.send('Price Ticker API');
});

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = initializeSocket(server);
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
