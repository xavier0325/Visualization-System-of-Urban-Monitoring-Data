<template>
  <div>
    <div id="allmap"></div>
    <div id="mapDiv">
      <a
        >已完成节能改造项目：<span>{{ mapDivData.projectNum }}</span> 个</a
      >
      <a
        >已完成节能改造面积：<span>{{ mapDivData.projectArea }}</span>
        万平方米</a
      >
      <a
        >申报项目消耗能源合计：<span>{{ mapDivData.consumptionTotal }}</span>
        吨标准煤</a
      >
      <a
        >申报项目平均节能率：<span>{{ mapDivData.rateEnergySaving }}</span
        >%</a
      >
      <!-- <a>{{mapDivData}}</a> -->
    </div>
    <div id="mapDiv1">
      <a style="font-weight: bolder; margin-bottom: 5px">图例说明</a>
      <a
        style="line-height: 24px; color: #e74c3c; font-weight: bolder"
        class="img1"
        ><span style="color: #fff; font-weight: bolder; margin-left: 50px"
          >改造开始</span
        ></a
      >
      <a
        style="line-height: 24px; color: #89e73c; font-weight: bolder"
        class="img2"
        ><span style="color: #fff; font-weight: bolder; margin-left: 50px"
          >改造完成</span
        ></a
      >
      <a
        style="line-height: 24px; color: #e7e33c; font-weight: bolder"
        class="img3"
        ><span style="color: #fff; font-weight: bolder; margin-left: 50px"
          >投入使用</span
        ></a
      >
      <a
        style="line-height: 24px; color: #3cdce7; font-weight: bolder"
        class="img4"
        ><span style="color: #fff; font-weight: bolder; margin-left: 50px"
          >完成验收</span
        ></a
      >
    </div>
  </div>
</template>
<script>
import common from "../../api/common";

export default {
  data() {
    return {
      icon1: require("../../assets/1.png"),
      icon2: require("../../assets/2.png"),
      icon3: require("../../assets/3.png"),
      icon4: require("../../assets/4.png"),
      icon5: require("../../assets/5.jpg"),
      mapDivData: {
        // 'projectNum': 0,
        // 'projectArea': 0,
        // 'consumptionTotal': 0,
        // 'rateEnergySaving': 0,
        // 'projects': {
        // 	'points': []
        // }
      },
    };
  },
  mounted() {
    let _this = this;
    // 百度地图API功能
    var bmap = common.getById(allmap);
    bmap.style.height = window.innerHeight * 0.9 + "px";
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.centerAndZoom(new BMap.Point(112.929681, 27.887929), 14); // 初始化地图,设置中心点坐标和地图级别
    map.setMapStyle({
      styleJson: [
        {
          featureType: "water",
          elementType: "all",
          stylers: {
            color: "#031628",
          },
        },
        {
          featureType: "land",
          elementType: "geometry",
          stylers: {
            color: "#000102",
          },
        },
        {
          featureType: "highway",
          elementType: "all",
          stylers: {
            visibility: "off",
          },
        },
        {
          featureType: "arterial",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "arterial",
          elementType: "geometry.stroke",
          stylers: {
            color: "#0b3d51",
          },
        },
        {
          featureType: "local",
          elementType: "geometry",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "railway",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "railway",
          elementType: "geometry.stroke",
          stylers: {
            color: "#08304b",
          },
        },
        {
          featureType: "subway",
          elementType: "geometry",
          stylers: {
            lightness: -70,
          },
        },
        {
          featureType: "building",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: {
            color: "#857f7f",
          },
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "building",
          elementType: "geometry",
          stylers: {
            color: "#022338",
          },
        },
        {
          featureType: "green",
          elementType: "geometry",
          stylers: {
            color: "#062032",
          },
        },
        {
          featureType: "boundary",
          elementType: "all",
          stylers: {
            color: "#465b6c",
          },
        },
        {
          featureType: "manmade",
          elementType: "all",
          stylers: {
            color: "#022338",
          },
        },
        {
          featureType: "label",
          elementType: "all",
          stylers: {
            visibility: "off",
          },
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: {
            color: "#022338",
            visibility: "off",
          },
        },
      ],
    });

    //获取数据以及地图标注
    _this.$http
      .get("http://localhost:8888/projectmap/data")
      .then(function (response) {
        // console.log(response.data.projectmapData.projects.points);
        _this.mapDivData = response.data.projectmapData;
        var points = [..._this.mapDivData.projects.points];
        addMarker(points);
      })
      .catch(function (error) {
        console.log(error);
      });

    function addMarker(points) {
      //循环添加标注
      for (var i = 0; i < points.length; i++) {
        var point = new BMap.Point(points[i].lng, points[i].lat);
        var myIcon = null;
        switch (points[i].type) {
          case 1:
            myIcon = new BMap.Icon(_this.icon1, new BMap.Size(40, 45));
            break;
          case 2:
            myIcon = new BMap.Icon(_this.icon2, new BMap.Size(40, 45));
            break;
          case 3:
            myIcon = new BMap.Icon(_this.icon3, new BMap.Size(40, 45));
            break;
          case 4:
            myIcon = new BMap.Icon(_this.icon4, new BMap.Size(40, 45));
            break;
          default:
            break;
        }

        //将点转化为标注点
        var marker = new BMap.Marker(point, {
          icon: myIcon,
        });
        //把标注点添加到地图上
        map.addOverlay(marker);
        (function () {
          var _point = points[i];
          marker.addEventListener("onmouseover", function () {
            showInfo(this, _point);
          });
        })();
      }
    }

    function showInfo(thisMarker, point) {
      //axios请求数据
      var projectName = point.project_name;
      var buildingName = point.building_name;
      var projectAddr = point.project_addr;
      var buildingStruct = point.building_struct;
      var startDay = point.start_day;
      var investSum = point.invest_sum;
      var transformEySaving = point.transform_eySaving;
      var buildingFunc = point.building_func;
      var buildingAreaTotal = point.building_areaTotal;
      var floorAreaTotal = point.floor_areaTotal;
      var endDay = point.end_day;
      var useDay = point.use_day;
      var contractEyUsed = point.contract_eyUsed;
      var rateEyTransform = point.rate_eyTransform;
      var imgUrl = point.img_url;
      var powerBefore = point.power_before;
      var powerAfter = point.power_after;

      var sContent =
        '<div style="width:691px;height:700px;font-size:12px;margin-top:10px;overflow:scroll;" class="infoContent">' +
        '<div  style="width:691px;height:266px;display:flex;">' +
        '<div style="width:500px;height:266px;display:flex;" class="infoContent">' +
        '<div style="height:400px;width:158px;padding-top:7px">' +
        '<h5 style="font-weight:bolder;color:#006400;margin-bottom:18px;font-size:17px;">工程基本信息</h5>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">工程名称</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑名称</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">工程地址</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑结构体系</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">开工日期</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">总投资(万元)</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">改造后年节能标煤(吨)</a>' +
        "</div>" +
        '<div style="height:400px;width:158px;padding-top:42px">' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${projectName}` +
        "</a>" +
        "<a title=" +
        `${buildingName}` +
        ' style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777;overflow:auto;">' +
        `${buildingName}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777;overflow:auto;">' +
        `${projectAddr}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${buildingStruct}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${startDay}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${investSum}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${transformEySaving}` +
        "</a>" +
        "</div>" +
        '<div style="height:400px;width:158px;padding-top:42px">' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑功能</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑总面积(㎡)</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">占地面积(㎡)</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">竣工日期</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">投入使用日期</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">是否采用合同能源</a>' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">改造节能率%</a>' +
        "</div>" +
        '<div style="height:400px;width:158px;padding-top:42px">' +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${buildingFunc}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${buildingAreaTotal}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${floorAreaTotal}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${endDay}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${useDay}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${contractEyUsed}` +
        "</a>" +
        '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' +
        `${rateEyTransform}` +
        "</a>" +
        "</div>" +
        "</div>" +
        // 建筑图片
        '<div style="width:230px;height:224px;margin-top:42px;">' +
        "<img src='" +
        `${imgUrl}` +
        "'" +
        'style="width:100%;height:100%;max-height:100%;max-width:100%;" alt="建筑图片">' +
        "</div>" +
        "</div>" +
        // echarts部分
        '<div id="echartsBox" style="width: 691px;height:500px;display:flex">' +
        '<div id="containerOne" style="flex:1;background:#eee;border-right: 4px solid #ccc"></div>' +
        '<div id="containerTwo" style="flex:1;background:#eee;border-left: 4px solid #ccc"></div>' +
        "</div>" +
        "</div>";

      var infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象

      infoWindow.addEventListener("open", function () {
        var el = common.getById(mapDiv);
        var el1 = common.getById(mapDiv1);
        var echartsOne = common.getById(containerOne);
        var echartsTwo = common.getById(containerTwo);

        el.style.top = window.innerHeight - 200 + "px";
        el.style.opacity = "0";
        el1.style.opacity = "0";
        setTimeout(() => {
          el.style.zIndex = "-66";
          el1.style.zIndex = "-66";
        }, 1000);
        var eyConsumption = _this.$echarts.init(echartsOne);
        var eyConsumption2 = _this.$echarts.init(echartsTwo);

        var optionOne = {
          title: {
            text: "原能源消耗构成",
            textStyle: {
              color: "black",
            },
            top: "5%",
            left: "center",
          },
          tooltip: {
            triggle: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            top: "13%",
            left: "center",
            show: "true",
            data: ["原煤", "型煤", "焦炭", "天然气", "原油", "电力"],
          },
          series: [
            {
              name: "原能源消耗构成",
              type: "pie",
              radius: "50%",
              center: ["50%", "45%"],
              label: {
                alignTo: "none",
                formatter: "{per|{d}%} \n{hr|}\n  {b|{b}}",
                rich: {
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 2,
                    height: 0,
                  },
                  b: {
                    fontSize: 14,
                    color: "#000",
                    lineHeight: 20,
                  },
                  per: {
                    color: "#000",
                    fontSize: 16,
                    lineHeight: 20,
                  },
                },
              },
              labelLine: {
                smooth: false,
                lineStyle: {
                  width: 2,
                },
              },
              data: powerBefore,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };

        eyConsumption.setOption(optionOne);

        var optionTwo = {
          title: {
            text: "改造后能源消耗构成",
            textStyle: {
              color: "black",
            },
            top: "5%",
            left: "center",
          },
          tooltip: {
            triggle: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            top: "13%",
            left: "center",
            show: "true",
            data: ["原煤", "型煤", "焦炭", "天然气", "原油", "电力"],
          },
          series: [
            {
              name: "改造后能源消耗构成",
              type: "pie",
              radius: "50%",
              center: ["50%", "45%"],
              roseType: "area",
              label: {
                alignTo: "none",
                formatter: "{per|{d}%} \n{hr|}\n  {b|{b}}",
                rich: {
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 2,
                    height: 0,
                  },
                  b: {
                    fontSize: 14,
                    color: "#000",
                    lineHeight: 20,
                  },
                  per: {
                    color: "#000",
                    fontSize: 16,
                    lineHeight: 20,
                  },
                },
              },
              labelLine: {
                smooth: false,
                lineStyle: {
                  width: 2,
                },
              },
              data: powerAfter,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        eyConsumption2.setOption(optionTwo);
      });
      infoWindow.addEventListener("close", function () {
        var el = common.getById(mapDiv);
        var el1 = common.getById(mapDiv1);
        el.style.zIndex = "66";
        el.style.opacity = "1";
        el.style.top = "100px";
        el1.style.zIndex = "66";
        el1.style.opacity = "1";
      });
      thisMarker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
    }
  },
  methods: {
    async update() {
      let _this = this;
      let result = null;
      //axios请求数据
      await _this.$http
        .get("http://localhost:8888/projectmap/data")
        .then((response) => {
          _this.mapDivData = response.data.projectmapData;
          result = response.data.projectmapData;
          // console.log(_this.mapDivData);
        });

      return result;
    },
  },
};
</script>
<style scoped>
#allmap {
  width: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}

#mapDiv {
  width: 340px;
  height: 200px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 40px;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 4px 5px 10px rgba(159, 158, 156, 0.6);
  transition: all 1s ease;
}

#mapDiv a {
  height: 36px;
  line-height: 36px;
  font-size: 18px;
  color: #fff;
  font-weight: bolder;
}

#mapDiv a span {
  color: #fffc11;
  font-size: 24px;
}

#mapDiv1 {
  width: 200px;
  height: 200px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 40px;
  bottom: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: -4px -5px 10px rgba(159, 158, 156, 0.6);
  transition: all 1s ease;
}

#mapDiv1 a {
  height: 36px;
  line-height: 36px;
  font-size: 18px;
  color: #fff;
}

.infoContent a {
  background: #f01400 !important;
  text-overflow: ellipsis;
}

.img1 {
  background: url(../../assets/1.png) no-repeat;
  background-size: 32px 30px;
}

.img2 {
  background: url(../../assets/2.png) no-repeat;
  background-size: 32px 30px;
}

.img3 {
  background: url(../../assets/3.png) no-repeat;
  background-size: 32px 30px;
}

.img4 {
  background: url(../../assets/4.png) no-repeat;
  background-size: 32px 30px;
}
</style>
