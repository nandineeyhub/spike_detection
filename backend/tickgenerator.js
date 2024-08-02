const { Server } = require("socket.io");
const { logSpike } = require('./controllers/spikecontroller');
const { createObjectCsvWriter } = require('csv-writer');

const instruments = ['NSE:ACC', 'NSE:SBIN', 'NSE:TCS', 'NSE:INFY'];
let prices = {
    'NSE:ACC': 100,
    'NSE:SBIN': 100,
    'NSE:TCS': 100,
    'NSE:INFY': 100,
};

// CSV Writer setup
const csvWriter = createObjectCsvWriter({
    path: 'spikes_log.csv',
    header: [
        { id: 'instrument', title: 'Instrument' },
        { id: 'oldPrice', title: 'Old Price' },
        { id: 'newPrice', title: 'New Price' },
        { id: 'timestamp', title: 'Timestamp' }
    ]
});

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on('connection', (socket) => {
        console.log('Client connected');

        instruments.forEach(instrument => {
            setInterval(() => generateTick(instrument), 1);
        });
        
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    const generateTick = async (instrument) => {
        const oldPrice = prices[instrument];
        const newPrice = oldPrice + (Math.random() - 0.5) * 2; // Random price change

        if (Math.abs(newPrice - oldPrice) / oldPrice > 0.1) { // 10% spike detection
            const spikeData = {
                instrument,
                oldPrice,
                newPrice,
                timestamp: new Date(),
            };

            const spike = await logSpike(spikeData);

    
            await csvWriter.writeRecords([spikeData]);
            console.log("check ticks")
            io.emit('spike', spike);
        }

        prices[instrument] = newPrice;
    };
   
  

    return io;
};

module.exports = initializeSocket;
