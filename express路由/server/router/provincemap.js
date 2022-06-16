let express = require('express');
let router = express.Router();

let provinceData = require('../mock/provincemap.json');
router.get('/data', (req, res) => {
	res.send({
		provinceData: provinceData,
		aqiData: [
				{name: '长沙市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '株洲市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '湘潭市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '衡阳市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '邵阳市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '岳阳市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '常德市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '张家界市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '益阳市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '郴州市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '永州市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '怀化市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '娄底市',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
				{name: '湘西土家族苗族自治州',value: Math.ceil(Math.random()*200),PM_25: Math.ceil(Math.random()*100),PM_10: Math.ceil(Math.random()*300),CO: Math.ceil(Math.random()*20),NO2: Math.ceil(Math.random()*200),SO2: Math.ceil(Math.random()*700)},
			]
	});
})

module.exports = router;
