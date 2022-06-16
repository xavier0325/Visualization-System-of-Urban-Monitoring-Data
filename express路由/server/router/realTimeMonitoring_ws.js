let express = require('express');
let expressWs = require('express-ws');

let router = express.Router();
expressWs(router);
//文件相关
let fs = require('fs');
const filePath = '../server/mock/realtimemonitoring.json';
let obj = null;


router.ws('/realtimemonitoring_ws', function (ws, req) {
  console.log('realtimemonitoring ws connect successful!')
  ws.on('message', function (msg) {	//接收到消息时
    console.log(`客户端： ${msg}`);
  })
  //一些数据的初始化
  //realtimepeople组件的数据
  let rtPeopleData_data = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(Math.round(Math.random() * 200) + 500);
    }
    return res;
  })();
  let rtPeopleData_data2 = (function () {
    let res = [];
    let len = 0;
    while (len < 10) {
      res.push(+(Math.random() * 10 + 5).toFixed(0));
      len++;
    }
    return res;
  })();
  let rtPeopleData_categories = (function () {
    let now = new Date();
    let res = [];
    let len = 10;
    while (len--) {
      res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
      now = new Date(+now - 2000);
    }
    return res;
  })();
  let rtPeopleData_categories2 = (function () {
    let res = [];
    let len = 10;
    while (len--) {
      res.push(10 - len - 1);
    }
    return res;
  })();
  let rtPeopleData_count = 10;
  //realtimeliquid组件的数据
  let rtLiquidData = (function () {
    let res = [];
    let first = Number(Math.random().toFixed(2));
    let temp = first;
    while (temp > 0) {
      res.push(temp);
      let t = temp - 0.1;
      temp = Number(t.toFixed(2));
    }
    return res
  })();
  //realtimeliquidhealth组件的数据
  let rtLiquidHealthData = (function () {
    let res = [];
    let first = Number((Math.random() * 0.6 + 0.4).toFixed(2));
    let temp = first;
    while (temp > 0) {
      res.push(temp);
      let t = temp - 0.1;
      temp = Number(t.toFixed(2));
    }
    return res
  })();
  //realtimecalendar组件的数据
  let rtCalendarData_dateList = [
    "2022-3-1",
    "2022-3-2",
    "2022-3-3",
    "2022-3-4",
    "2022-3-5",
    "2022-3-6",
    "2022-3-7",
    "2022-3-8",
    "2022-3-9",
    "2022-3-10",
    "2022-3-11",
    "2022-3-12",
    "2022-3-13",
    "2022-3-14",
    "2022-3-15",
    "2022-3-16",
    "2022-3-17",
    "2022-3-18",
    "2022-3-19",
    "2022-3-20",
    "2022-3-21",
    "2022-3-22",
    "2022-3-23",
    "2022-3-24",
    "2022-3-25",
    "2022-3-26",
    "2022-3-27",
    "2022-3-28",
    "2022-3-29",
    "2022-3-30",
    "2022-3-31",
  ];
  let rtCalendarData = (function () {
    let res = [];
    for (let i = 0; i < rtCalendarData_dateList.length; i++) {
      res.push([rtCalendarData_dateList[i], Math.floor(Math.random() * 200)]);
    }
    return res
  })();
  //realtimearea组件的数据
  let rtAreaData = (function () {
    let res = [];
    let obj = { 'value': Math.floor(Math.random() * 50 + 50), 'name': '雨湖区' };
    let obj1 = { 'value': Math.floor(Math.random() * 50 + 50), 'name': '岳塘区' };
    let obj2 = { 'value': Math.floor(Math.random() * 50 + 50), 'name': '湘乡市' };
    let obj3 = { 'value': Math.floor(Math.random() * 50 + 50), 'name': '韶山市' };
    let obj4 = { 'value': Math.floor(Math.random() * 50 + 50), 'name': '湘潭县' };
    res.push(obj, obj1, obj2, obj3, obj4);
    return res;
  })();
  //realtimedegree组件的数据
  let rtDegreeData = (function () {
    let res = [];
    let area = ['雨湖区', '岳塘区', '湘乡市', '韶山市', '湘潭县'];
    for (let i = 0; i < 5; i++) {
      let obj = {
        "value": Math.floor(Math.random() * 100),
        "name": area[i] + '疫情风险程度',
        "title": {
          "color": '#fff',
          "textShadowColor": '#eee',
          "textShadowBlur": 5,
          "offsetCenter": [0, '100%']
        }
      };
      res.push(obj);

    }
    return res
  })();
  //realtimemap组件的数据
  let rtMapData = [
    {
      name: "雨湖区",
      value: (Math.random() * 20 + 20).toFixed(1),
    },
    {
      name: "岳塘区",
      value: (Math.random() * 20 + 20).toFixed(1),
    },
    {
      name: "湘乡市",
      value: (Math.random() * 20 + 20).toFixed(1),
    },
    {
      name: "韶山市",
      value: (Math.random() * 20 + 20).toFixed(1),
    },
    {
      name: "湘潭县",
      value: (Math.random() * 20 + 20).toFixed(1),
    },
  ]
  obj = {
    "realtimepeopleData": {
      "data": rtPeopleData_data,
      "data2": rtPeopleData_data2,
      "categories": rtPeopleData_categories,
      "categories2": rtPeopleData_categories2
    },
    "realtimeliquidData": {
      "data": rtLiquidData
    },
    "realtimeliquidhealthData": {
      "data": rtLiquidHealthData
    },
    "realtimecalendarData": {
      "dateList": rtCalendarData_dateList,
      "data": rtCalendarData
    },
    "realtimeareaData": {
      "data": rtAreaData
    },
    "realtimedegreeData": {
      "data": rtDegreeData
    },
    "realtimemapData": {
      "data": rtMapData
    }
  }
  let timer = setInterval(() => { //循环写文件
    //时间戳
    let rtPeopleData_axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
    //读写操作且数据发送给客户端
    executeWC().then(() => {
      fs.readFile(filePath, (error, data) => {
        if (error) {
          console.log('error: ' + error);
        }
        console.log("data:" + data.toString());
        ws.send(data.toString());

        obj.realtimepeopleData.data.shift();
        obj.realtimepeopleData.data.push(Math.round(Math.random() * 200) + 500);
        obj.realtimepeopleData.data2.shift();
        obj.realtimepeopleData.data2.push(+(Math.random() * 10 + 5).toFixed(0));
        obj.realtimepeopleData.categories.shift();
        obj.realtimepeopleData.categories.push(rtPeopleData_axisData);
        obj.realtimepeopleData.categories2.shift();
        obj.realtimepeopleData.categories2.push(rtPeopleData_count++);

        let rtLiquidData_temp = (function () {
          let res = [];
          let first = Number((Math.random() * 0.8 + 0.2).toFixed(2));
          let temp = first;
          while (temp > 0) {
            res.push(temp);
            let t = temp - 0.1;
            temp = Number(t.toFixed(2));
          }
          return res
        })();
        obj.realtimeliquidData.data.splice(0, obj.realtimeliquidData.data.length);
        obj.realtimeliquidData.data = [].concat(rtLiquidData_temp);

        let rtLiquidhealthData_temp = (function () {
          let res = [];
          let first = Number((Math.random() * 0.6 + 0.4).toFixed(2));
          let temp = first;
          while (temp > 0) {
            res.push(temp);
            let t = temp - 0.1;
            temp = Number(t.toFixed(2));
          }
          return res
        })();
        obj.realtimeliquidhealthData.data.splice(0, obj.realtimeliquidhealthData.data.length);
        obj.realtimeliquidhealthData.data = [].concat(rtLiquidhealthData_temp);

        let rtCalendarData_temp = (function () {
          let res = [];
          for (let i = 0; i < rtCalendarData_dateList.length; i++) {
            res.push([rtCalendarData_dateList[i], Math.floor(Math.random() * 200)]);
          }
          return res
        })();
        obj.realtimecalendarData.data.splice(0, obj.realtimecalendarData.data.length);
        obj.realtimecalendarData.data = [].concat(rtCalendarData_temp);

        obj.realtimeareaData.data = obj.realtimeareaData.data.map((item, i, arr) => {
          item.value = Math.ceil(Math.random() * 50 + 50);
          return item;
        })

        obj.realtimedegreeData.data = obj.realtimedegreeData.data.map((item, i, arr) => {
          item.value = Math.floor(Math.random() * 100);
          return item;
        })

        let rtMapData_temp = [
          {
            name: "雨湖区",
            value: (Math.random() * 20 + 20).toFixed(1),
          },
          {
            name: "岳塘区",
            value: (Math.random() * 20 + 20).toFixed(1),
          },
          {
            name: "湘乡市",
            value: (Math.random() * 20 + 20).toFixed(1),
          },
          {
            name: "韶山市",
            value: (Math.random() * 20 + 20).toFixed(1),
          },
          {
            name: "湘潭县",
            value: (Math.random() * 20 + 20).toFixed(1),
          },
        ];
        obj.realtimemapData.data.splice(0, obj.realtimemapData.data.length);
        obj.realtimemapData.data = [].concat(rtMapData_temp);
      })
    })



  }, 2000);

  ws.on('close', function (e) {	//连接关闭时
    console.log('ws connect is closed!');
    clearInterval(timer);
    timer = undefined;
  })
})

//异步写文件
function writeContent(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', (error) => {
      if (error) {
        console.log(error);

        reject('写入错误');
      } else {
        resolve('写入成功');
      }
    })
  })
}

async function executeWC() {
  let wcResult = await writeContent(JSON.stringify(obj));
  console.log(wcResult);

}

module.exports = router;