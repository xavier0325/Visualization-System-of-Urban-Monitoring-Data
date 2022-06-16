let express = require('express');
let expressWs = require('express-ws');	//引入express-ws来提供websocket服务

let router = express.Router();
expressWs(router); //相当于给router添加ws方法

let tranmapData = require('../mock/tranmap.json');	//引入Mock数据


//WebSocket服务建立
router.ws('/tranmap_ws', function (ws, req) {
	console.log('ws connect successful!');
	// console.log(ws);

	ws.on('message', function (msg) {	//接收到消息时
		console.log(`客户端： ${msg}`);
	})

	let timer = setInterval(() => {
		tranmapData.tranmapData.forEach(function (item, i) {
			item.value = randomValue();
		})
		ws.send(JSON.stringify(tranmapData));
	}, 2000);

	ws.on('close', function (e) {	//连接关闭时
		console.log('ws connect is closed!');
		clearInterval(timer);
		timer = undefined;
	})
})

function randomValue() {
	return (Math.random() * 10 + 20).toFixed(2);
}

module.exports = router;