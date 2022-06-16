<template>
  <div id="rtmContainer"></div>
</template>

<script>
import common from "../../api/common.js";
import "echarts-gl";

export default {
  props: ["rtMapData"],
  data() {
    return {
      geoCoordMap: {
        雨湖区: [112.858449, 27.929966],
        岳塘区: [112.995589, 27.87772],
        湘乡市: [112.376481, 27.70019],
        韶山市: [112.533499, 27.921043],
        湘潭县: [112.827505, 27.614982],
      },
      chartObj: null,
    };
  },
  watch: {
    rtMapData(val) {
      // console.log(val.data);
      this.chartObj.setOption({
        series: [
          {
            data: this.convertData(val.data),
          },
        ],
      });
    },
  },
  mounted() {
    var _this = this;
    var myChartDom = common.getById(rtmContainer);
    var myChart = _this.$echarts.init(myChartDom);
    this.chartObj = myChart;

    myChart.showLoading();
    this.$http
      .get("http://localhost:8888/citymap/data")
      .then((res) => {
        // console.log(res)
        let geoJson = res.data.cityData;

        _this.$echarts.registerMap("xiangtanshi", geoJson);
        myChart.hideLoading();
        let option = {
          title: {
            text: "湘潭市疫情密度地图",
            left: "center",
            top: 0,
            textStyle: {
              color: "#fff",
              textBorderColor: "#d81e06",
              textBorderWidth: "2",
              textShadowColor: "#d81e06",
              textShadowBlur: 2,
            },
          },
          tooltip: {
            show: true,
          },
          visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: ["#fff", "red"],
            calculable: true,
          },
          geo3D: {
            show: true,
            map: "xiangtanshi",
            boxHeight: 30,

            regionHeight: 4, // 三维高度
            // shading: 'realistic',
            // realisticMaterial: {
            // 	detailTexture: bg, // 纹理贴图
            // 	textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
            // },
            label: {
              // 标签的相关设置
              show: false, // (地图上的城市名称)是否显示标签 [ default: false ]
              distance: 0,
              formatter(param) {
                const city = param.name;
                return `{sty1|${city}}`;
              },
              rich: {
                sty1: {
                  color: "#ffffff",
                  fontSize: 14,
                  align: "center",
                },
              },
              textStyle: {
                // 标签的字体样式
                color: "#ffffff", // 地图初始化区域字体颜色
                opacity: 1, // 字体透明度
              },
            },
            environment: new _this.$echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#1e528e", // 天空颜色
                },
                {
                  offset: 0.5,
                  color: "#728a7c", // 地面颜色
                },
                {
                  offset: 1,
                  color: "#95a2ff", // 地面颜色
                },
              ],
              false
            ),
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              color: "#0090FF", // 地图板块的颜色
              // color: '#00F6FF',
              opacity: 1, // 图形的不透明度 [ default: 1 ]
              borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: "#A74A11", // 图形描边的颜色。[ default: #333 ]
            },
            emphasis: {
              // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时 label和itemStyle 的样式)
              label: {
                // label高亮时的配置
                show: true,
                textStyle: {
                  color: "#fff", // 高亮时标签颜色变为 白色
                  fontSize: 15, // 高亮时标签字体 变大
                },
              },
            },
            light: {
              // 光照相关的设置。在 shading 为 'color' 的时候无效。
              // 光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
              main: {
                // 场景主光源的设置，在 globe 组件中就是太阳光。
                color: "#ffeeee", // 主光源的颜色。[ default: #fff ]
                intensity: 1.1, // 主光源的强度。[ default: 1 ]
                shadow: true, // 主光源是否投射阴影。默认关闭。 开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
                alpha: 150, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
                beta: 70, // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
              },
              ambient: {
                // 全局的环境光设置。
                color: "#fff", // 环境光的颜色。[ default: #fff ]
                intensity: 0.5, // 环境光的强度。[ default: 0.2 ]
              },
            },
            groundPlane: {
              show: true,
              color: "#9dcaff",
            },
            viewControl: {
              projection: "perspective",
              autoRotate: false,
              autoRotateAfterStill: 2,
              autoRotateSpeed: 10,
              distance: 130,
              beta: 5,
              alpha: 20,
              minAlpha: -360,
              maxAlpha: 360,
              minBeta: -360,
              maxBeta: 360,
            },
          },
          series: [
            {
              name: "疫情密度",
              type: "bar3D",
              coordinateSystem: "geo3D",
              barSize: 3,
              shading: "lambert",
              opacity: 1,
              bevelSize: 1, //柱子的倒角尺寸
              bevelSmoothness: 10, //柱子的倒角光滑度
              minHeight: 10,
              maxHeight: 20,
              tooltip: {
                formatter: (param) => {
                  return `<h1 style="color: #000;font-weight:900;">${param.name}${param.seriesName}</h2><div style="height: 2px;background-color: #000;margin:5px auto;"></div><span>${param.value[2]}(人/平方米)</span>`; //
                },
              },
              itemStyle: {
                color: "#00F6FF",
                textStyle: {
                  color: "#fff",
                },
              },
              emphasis: {
                label: {
                  fontSize: 17,
                },
              },
              label: {
                show: true,
                formatter: (param) => {
                  return param.value[2] + "（人/㎡）";
                },
                fontWeight: "bolder",
                // color: '#fff',
                // backgroundColor: '#00F6FF',
                // borderWidth: 1
              },
              data: [],
            },
            {
              name: "湘潭市",
              type: "map3D",
              map: "xiangtanshi",
              regionHeight: 5, //模型的高度
              // boxWidth: 70, //三维地图在三维场景的宽度
              boxHeight: 80, ////三维地图在三维场景的长度
              // boxDepth: 20, //三维地图在三维场景的深度
              // // 配置为垂直渐变的背景
              // environment: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              // 	offset: 0,
              // 	color: '#1e528e' // 天空颜色
              // }, {
              // 	offset: 0.5,
              // 	color: '#728a7c' // 地面颜色
              // }, {
              // 	offset: 1,
              // 	color: '#95a2ff' // 地面颜色
              // }], false),

              label: {
                show: true,
                color: "#fff",
                fontSize: 17,
                fontWeight: 900,
                backgroundColor: "transparent",
                // borderColor: '#fff',
                // borderWidth: 1,
              },
              itemStyle: {
                //静态模式下显示的默认样式
                borderWidth: 1.6,
                borderColor: "#95FFFF",
                color: "#0090FF",
              },
              emphasis: {
                //鼠标移上去的样式
                label: {
                  show: true,
                },
                itemStyle: {
                  color: "#0058B8",
                },

                textStyle: {
                  // color:'blue'
                  borderWidth: 1.6,
                  borderColor: "#95FFFF",
                },
              },
              viewControl: {
                projection: "perspective",
                autoRotate: false,
                autoRotateAfterStill: 2,
                autoRotateSpeed: 10,
                distance: 130,
                beta: 5,
                alpha: 20,
                minAlpha: -360,
                maxAlpha: 360,
                minBeta: -360,
                maxBeta: 360,
                // rotateSensitivity: 0
              },
            },
          ],
        };

        myChart.setOption(option);
        window.onresize = function () {
          myChart.resize();
        };
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    },
  },
};
</script>

<style scoped>
#rtmContainer {
  width: 100%;
  height: 593px;
}

#rtmContainer > div {
  min-height: 500px !important;
}
</style>
