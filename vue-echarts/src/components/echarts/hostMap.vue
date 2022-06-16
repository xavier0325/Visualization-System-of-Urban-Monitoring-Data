<template>
  <div>
    <div id="hostMap"></div>
    <div id="funnelContainer"></div>
  </div>
</template>

<script>
require("echarts/extension/bmap/bmap");
export default {
  data() {
    return {
      style: {
        width: "100%",
        height: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      hostmapData: {},
      chartObj: {},
      chartObj1: {},
    };
  },
  watch: {
    hostmapData: function (val) {
      //异步请求的数据完成后肯定data里的该值发生了变化
      //   console.log(val);
      var geoCoordMap = val.geoCoordMap;
      var Data = val.hostData;
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[1].name];
          var toCoord = geoCoordMap[dataItem[0].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
            });
          }
        }
        return res;
      };
      var series = [];
      [["湘潭大学", Data]].forEach(function (item, i) {
        var color = "";
        // console.log(item[0] +'***'+ item[1]);
        // item[1].map(function (dataItem){
        // 	console.log(dataItem[1].name);
        // })
        //item[1]===Data
        series.push(
          {
            name: item[0],
            type: "lines",
            coordinateSystem: "bmap",
            zlevel: 1,
            effect: {
              show: true,
              period: 7, //特效动画的时间，单位为 s。
              trailLength: 0.8, //特效尾迹的长度
              color: "#03fed2",
              symbolSize: 2,
            },
            lineStyle: {
              // normal: {
              color: "#03fed2",
              width: 0,
              curveness: 0.2, //边的曲度，支持从 0 到 1 的值，值越大曲度越大
              // }
            },
            data: convertData(item[1]),
          },
          {
            name: item[0],
            type: "lines",
            coordinateSystem: "bmap",
            zlevel: 2,
            effect: {
              show: true,
              period: 6, //特效动画的时间，单位为 s。
              trailLength: 0, //特效尾迹的长度
            },
            lineStyle: {
              // normal: {
              color: "#03fed2",
              width: 1,
              opacity: 0.4,
              curveness: 0.2,
              // }
            },
            data: convertData(item[1]),
          },
          {
            name: "详细信息",
            type: "effectScatter", //带有涟漪特效动画的气泡图
            coordinateSystem: "bmap",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效配置
              brushType: "stroke", //波纹配置方式
            },
            label: {
              //图形上的文本标签
              // normal: {
              show: true,
              position: "right",
              formatter: "{b}", //字符串模板：数据名
              // }
            },
            symbolSize: function (val) {
              return val[2] / 5;
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
                itemStyle: {
                  // normal: {
                  color: dataItem[1].color,
                  // }
                },
              };
            }),
          }
        );
      });

      var option = {
        tooltip: {
          trigger: "item",
          // position: 'left',
          formatter: function (data) {
            // console.log(data)
            var line1 = data.seriesName + "<br/>";
            var line2 = "热点名：" + data.name + "<br/>";
            var res;
            if (data.componentSubType == "lines") {
              res = "";
            } else {
              var arr = geoCoordMap[data.name];
              var line3 = "经纬度：" + arr[0] + "," + arr[1] + "<br/>";
              var line4 = "能源综合值：" + data.value[2];
              res = line1 + line2 + line3 + line4;
            }
            return res;
          },
          confine: true, //是否将 tooltip 框限制在图表的区域内。
          appendToBody: true, //是否将 tooltip 的 DOM 节点添加为 HTML 的 <body> 的子节点。只有当 renderMode 为 'html' 是有意义的。
        },
        bmap: {
          roam: true,
          silent: true,
          mapStyle: {
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
                  color: "#03FED2",
                  visibility: "off",
                },
              },
            ],
          },
        },
        series: series,
      };

      var option1 = {
        title: {
          text: "能源热点漏斗图",
          left: "center",
          top: "4%",
          textStyle: {
            color: "#fff",
            textBorderColor: "#95a2ff",
            textBorderWidth: "2",
            textShadowColor: "#95a2ff",
            textShadowBlur: 2,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        legend: {
          show: true,
          bottom: 0,
          left: "2%",
          textStyle: {
            color: "#eee",
          },
          orient: "vertical",
        },
        series: [
          {
            name: "能源热点漏斗图",
            type: "funnel",
            left: "10%",
            bottom: 0,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inner",
              textStyle: {
                color: "#eee",
                textBorderColor: "#000",
                textBorderWidth: "2",
                textShadowColor: "#000",
                textShadowBlur: 1,
              },
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: val.funnelData,
          },
        ],
      };

      this.chartObj.setOption(option);
      this.chartObj1.setOption(option1);
      var map = this.chartObj.getModel().getComponent("bmap").getBMap();
      map.disableDoubleClickZoom();
      map.centerAndZoom(new BMap.Point(112.870634, 27.887929), 14); // 初始化地图121.39908,31.177505
    },
  },
  created() {
    var _this = this;
    this.$http
      .get("http://localhost:8888/hostmap/data")
      .then(function (res) {
        _this.hostmapData = res.data.hostmapData;
        // console.log(res.data.hostmapData)
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {
    var hostmap = document.getElementById("hostMap");
    hostmap.style.width = window.innerWidth + "px";
    hostmap.style.height = window.innerHeight * 0.9 + "px";
    var myChart = this.$echarts.init(hostmap);
    var funnelContainer = document.getElementById("funnelContainer");
    var myChart1 = this.$echarts.init(funnelContainer);
    this.chartObj = myChart;
    this.chartObj1 = myChart1;
    // myChart.on('dblclick',function(params){
    // 	console.log(params);
    // })

    window.onresize = function () {
      myChart.resize(); //图表自适应
    };
  },
};
</script>

<style scoped>
#funnelContainer {
  width: 400px;
  height: 450px;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ccff;
  border-left: none;
  border-radius: 0 10px 10px 0;
  box-shadow: -4px -5px 36px rgba(159, 158, 156, 0.6);
}
</style>
