const mongoose = require('mongoose');

const spikeSchema = new mongoose.Schema({
    instrument: String,
    oldPrice: Number,
    newPrice: Number,
    timestamp: Date,
});

module.exports = mongoose.model('Spike', spikeSchema);
