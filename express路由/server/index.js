let express = require('express');	//引入express
let expresssWs = require('express-ws');	//引入express-ws来提供websocket服务
let path = require('path');
let app = express();
expresssWs(app);
//设置跨域
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With,yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	next();
})

//引用路由文件
let route_tranmap = require('./router/tranmap_ws');
let route_hostmap = require('./router/hostmap');
let route_energy = require('./router/energy');
let route_projectmap = require('./router/projectmap');
let route_provincemap = require('./router/provincemap');
let route_citymap = require('./router/citymap')
let route_realTimeMonitoring = require('./router/realTimeMonitoring_ws');

//使用中间件配置路由
app.use('/tranmap',route_tranmap);
app.use('/hostmap', route_hostmap);
app.use('/energy', route_energy);
app.use('/projectmap', route_projectmap);
app.use('/provincemap', route_provincemap);
app.use('/citymap', route_citymap);
app.use('/realtimemonitoring', route_realTimeMonitoring);

app.use(express.static(path.join(__dirname,'dist')));
app.listen(8888, () => {
	console.log('express is running in port:8888');
});