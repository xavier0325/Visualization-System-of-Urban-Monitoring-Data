let express = require('express');
let router = express.Router();

let projectmapData = require('../mock/projectmap.json');
projectmapData.projectNum = projectmapData.projects.points.length;	//项目数量
projectmapData.projects.points.forEach((item, index) => {	//修改能源改造前后比例构成为随机数
	item.power_before.forEach((item,index) => {
		item.value = randomPower();
	});
	item.power_after.forEach((item,index) => {
		item.value = randomPower();
	});
})

// console.log(projectmapData.projects.points[0].power_before[0].value);
router.get('/data', (req, res) => {
	res.send({ projectmapData: projectmapData })
})

function randomPower() {
	return Math.floor(Math.random() * 700 + 300);
}

module.exports = router;