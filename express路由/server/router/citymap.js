let express = require('express');
let router = express.Router();

let cityData = require('../mock/xiangtanshi_map.json');
router.get('/data', (req, res) => {
	res.send({
		cityData: cityData,
		
	});
})

module.exports = router;
