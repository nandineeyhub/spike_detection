const express = require("express");
const { getSpikes, downloadCsv } = require("../controllers/spikecontroller");
const router = express.Router();

router.get('/spikes', getSpikes);
router.get('/download-csv', downloadCsv)
module.exports = router;