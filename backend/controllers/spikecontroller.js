const Spike = require("../models/spikeSchema");
const path = require('path');
const fs = require('fs');

const logSpike = async (spikeData) => {
  try {
    const spike = new Spike(spikeData);
    await spike.save();
    return spike;
  } catch (error) {

  }
};

const getSpikes = async (req, res) => {
  try {
    const spikes = await Spike.find().sort({ timestamp: -1 }).limit(100);
    res.json(spikes);
  } catch (error) {
    console.log(error);
  }
};

const downloadCsv = (req, res) => {
    const filePath = path.join(__dirname, '../spikes_log.csv');
    
    if (fs.existsSync(filePath)) {
        res.download(filePath, 'spikes_log.csv', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Internal Server Error');
            }
        });
    } else {
        res.status(404).send('File not found');
    }
};

module.exports = {logSpike, getSpikes, downloadCsv}
