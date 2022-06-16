let express = require('express');
let router = express.Router();
let hostmapData = require('../mock/hostmap.json');

router.get('/data', (req, res) => {
    res.send({ hostmapData: hostmapData });
})

module.exports = router;