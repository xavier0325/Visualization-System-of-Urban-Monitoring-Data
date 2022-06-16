<template>
  <div>
    <div style="display: flex; flex-wrap: nowrap">
      <div id="aqi" style="flex: 1"></div>
      <div id="aqimap" style="flex: 1"></div>
    </div>
  </div>
</template>
<!-- 空气质量指数 -->
<script>
import common from "../../api/common";
export default {
  data() {
    return {
      name: "湘潭市",
      valueArr: [],
    };
  },
  mounted() {
    let _this = this;
    var aqiData;

    //aqiEcharts
    let aqiContainer = common.getById(aqi);
    // aqiContainer.style.width = window.innerWidth *0.5 + 'px';
    aqiContainer.style.height = window.innerHeight * 0.9 + "px";
    let aqiEcharts = this.$echarts.init(aqiContainer);
    //aqimapEcharts
    let aqimapContainer = common.getById(aqimap);
    // aqimapContainer.style.width = window.innerWidth*0.5 + 'px';
    aqimapContainer.style.height = window.innerHeight * 0.9 + "px";
    let aqimapEcharts = this.$echarts.init(aqimapContainer);
    //加载完地图轮廓数据后展示aqi地图
    aqimapEcharts.showLoading();
    this.$http
      .get("http://localhost:8888/provincemap/data")
      .then((res) => {
        let geoJson = res.data.provinceData;
        aqiData = [].concat(res.data.aqiData);
        for (let i = 0; i < aqiData.length; i++) {
          if (aqiData[i].name == "湘潭市")
            _this.valueArr.push(
              aqiData[i].value,
              aqiData[i].PM_25,
              aqiData[i].PM_10,
              aqiData[i].CO,
              aqiData[i].NO2,
              aqiData[i].SO2
            );
        }
        aqimapEcharts.hideLoading();
        _this.$echarts.registerMap("hunan", geoJson);
        let mapOption = {
          title: {
            text: "湖南省AQI地图",
            subtext: "第三方数据",
            textStyle: {
              color: "#fff",
            },
            left: "center",
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>AQI:{c}",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: {
                readOnly: false,
              },
              restore: {},
              saveAsImage: {},
            },
          },
          visualMap: {
            //视觉映射组件
            min: 0,
            max: 100,
            text: ["高", "低"],
            textStyle: {
              color: "#fff",
            },
            realtime: false,
            calculable: true,
            inRange: {
              color: ["lightskyblue", "yellow", "orangered"],
            },
          },
          geo: {
            map: "hunan",
            zoom: 1.1,
            aspectScale: 1.1,
            itemStyle: {
              // normal: {
              areaColor: "rgba(0,255,255,.1)",
              borderColor: "#00ffff",
              borderWidth: 5,
              shadowColor: "#00ffff",
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 50,
              // }
            },
          },
          series: [
            {
              name: "湖南地区市级AQI地图",
              type: "map",
              map: "hunan",
              label: {
                show: true,
                color: "#000",
                fontWeight: "lighter",
                fontSize: 14,
              },

              itemStyle: {
                borderColor: "#fff",
                borderWidth: 1.5,
              },
              emphasis: {
                itemStyle: {
                  areaColor: "rgba(238, 197, 102, 0.8)",
                  borderWidth: 2,
                },
              },
              aspectScale: 1.1, //scale地图的长宽比
              zoom: 1.1,
              data: aqiData,
            },
          ],
        };
        aqimapEcharts.setOption(mapOption);

        let lineStyle = {
          // normal: {
          width: 1.5,
          opacity: 0.5,
          // }
        };
        let option = {
          tooltip: {}, //提示框
          legend: {
            //图例
            data: [_this.name],
            bottom: 5,
            textStyle: {
              color: "#fff",
              fontSize: 18,
            },
            itemStyle: {
              color: "rgba(238, 197, 102, 0.8)",
            },
          },
          radar: {
            shap: "circle", //雷达图绘制类型，支持 'polygon' 和 'circle'。
            indicator: [
              //雷达图的指示器，用来指定雷达图中的多个变量（维度）
              {
                name: "AQI",
                max: 300,
              },
              {
                name: "PM2.5",
                max: 150,
              },
              {
                name: "PM10",
                max: 350,
              },
              {
                name: "CO",
                max: 24,
              },
              {
                name: "NO2",
                max: 280,
              },
              {
                name: "SO2",
                max: 800,
              },
            ],
            splitNumber: 5, //指示器轴的分割段数。
            splitLine: {
              lineStyle: {
                color: [
                  "rgba(238, 197, 102, 0.1)",
                  "rgba(238, 197, 102, 0.2)",
                  "rgba(238, 197, 102, 0.4)",
                  "rgba(238, 197, 102, 0.6)",
                  "rgba(238, 197, 102, 0.8)",
                  "rgba(238, 197, 102, 1)",
                ].reverse(),
              },
            },
            splitArea: {
              //分割区域展示
              show: false,
            },
            axisLine: {
              //坐标轴轴线相关设置。
              lineStyle: {
                color: "rgba(238, 197, 102, 1)",
              },
            },
          },
          series: [
            {
              name: _this.name,
              type: "radar",
              lineStyle: lineStyle,
              areaStyle: {
                // normal: {
                opacity: 0.1,
                // }
              },
              data: [
                {
                  value: _this.valueArr,
                  name: _this.name,
                  lineStyle: lineStyle,
                  symbol: "none",
                  itemStyle: {
                    // normal: {
                    color: "#fff",
                    // }
                  },
                },
              ],
            },
          ],
        };
        aqiEcharts.setOption(option);
      })
      .catch((error) => {
        console.log(error);
      });

    //点击切换市AQI雷达图
    aqimapEcharts.on("click", function (params) {
      _this.name = params.data.name;
      _this.valueArr.splice(
        0,
        _this.valueArr.length,
        params.data.value,
        params.data.PM_25,
        params.data.PM_10,
        params.data.CO,
        params.data.NO2,
        params.data.SO2
      );
      // console.log(_this.valueArr);
      // console.log(_this.name);
      let lineStyle = {
        // normal: {
        width: 1.5,
        opacity: 0.5,
        // }
      };
      aqiEcharts.setOption({
        //改变要变化数据的配置项
        legend: {
          //图例
          data: [_this.name],
          bottom: 5,
          textStyle: {
            color: "#fff",
            fontSize: 18,
          },
        },
        series: [
          {
            name: _this.name,
            type: "radar",
            lineStyle: lineStyle,
            areaStyle: {
              // normal: {
              opacity: 0.1,
              // }
            },
            data: [
              {
                value: _this.valueArr,
                name: _this.name,
                lineStyle: lineStyle,
                symbol: "none",
                itemStyle: {
                  // normal: {
                  color: "#fff",
                  // }
                },
              },
            ],
          },
        ],
      });
    });
    //窗口发生改变重新改变调整大小
    window.onresize = function () {
      aqimapEcharts.resize();
      aqiEcharts.resize();
    };
  },
};
</script>

<style>
</style>
