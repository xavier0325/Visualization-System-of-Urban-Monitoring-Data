<template>
  <div>
    <!--echats -->
    <div id="energy"></div>
    <!--data-->
    <div class="data-energy" v-show="detaileg">
      <div class="data-energy-wrapper">
        <div class="data-energy-main">
          <eymain :name="name" :eyCollectionData="eyCollectionData"></eymain>
        </div>
      </div>
      <!--data close -->
      <div class="data-energy-close">
        <a @click="dataEnergyClose">关闭</a>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../api/common";
import eymain from "./eyMain";
export default {
  components: {
    eymain,
  },
  data() {
    return {
      name: "",
      detaileg: false,
      energyData: [],
      xData: [],
      ratedPower: [],
      realPower: [],
      eyCollectionData: [],
    };
  },
  methods: {
    requireData() {},
    dataEnergyClose() {
      this.detaileg = false;
    },
    createdBar() {
      let _this = this;
      let container = common.getById(energy);
      common.setContentSize(energy);
      let myChart = _this.$echarts.init(container);
      window.onresize = myChart.resize;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            textStyle: {
              color: "#fff",
            },
          },
        },
        grid: {
          //网格
          borderWidth: 0,
          top: 110,
          bottom: 95,
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          //图例
          // x: '50%',
          top: "11%",
          right: "10%",
          textStyle: {
            color: "#90979c",
          },
          data: ["实际功率", "额定功率"],
        },
        calculable: true,
        xAxis: [
          //x轴
          {
            type: "category", //类目轴
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            splitLine: {
              //分割线设置
              show: false,
            },
            axisTick: {
              //坐标轴刻度设置
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLable: {
              interval: 0,
            },
            data: _this.xData,
          },
        ],
        yAxis: [
          //y轴
          {
            type: "value",
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#90979c",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            splitArea: {
              show: false,
            },
          },
        ],
        dataZoom: [
          //缩放组件
          {
            show: true,
            height: 30,
            xAxisIndex: [0],
            bottom: 15,
            start: 0,
            end: 25,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%", //两侧控制手柄
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#fff",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1, //数据窗口范围的起始百分比
            end: 35, //数据窗口范围的结束百分比
          },
        ],
        series: [
          {
            type: "bar",
            name: "实际功率",
            barMaxWidth: 70, //柱条的最大宽度
            itemStyle: {
              //图形样式。
              // normal: {
              color: "#03fed2",
              label: {
                show: true,
                position: "top",
                formatter: (p) => (p.value > 0 ? p.value : ""),
              },
              // }
            },
            data: _this.realPower,
          },
          {
            type: "scatter", //散点图
            name: "额定功率",
            symbol: "circle", //标记的图形
            symbolSize: 15,
            itemStyle: {
              // normal: {
              color: "rgba(252,230,48,1)",
              label: {
                show: true,
                position: "top",
                formatter: (p) => (p.value > 0 ? p.value : ""),
              },
              // }
            },
            data: _this.ratedPower,
          },
        ],
      };

      myChart.setOption(option);
      //窗口或框架被调整大小时发生。
      window.onresize = function () {
        //重置容器高宽
        common.setContentSize(energy);
        myChart.resize();
      };
      //图表点击展示具体楼栋
      myChart.on("click", (params) => {
        _this.detaileg = true;
        this.name = params.name;
        let temp = [];
        temp = this.energyData.map(function (item, i, arr) {
          if (item.name === params.name) {
            // console.log(item);
            return item.eyCollectionData;
          }
        });
        temp.forEach((item) => {
          if(item!=undefined) {
            _this.eyCollectionData = item;
          }
        });
        // console.log(temp);
        // console.log(_this.eyCollectionData)
      });
    },
  },
  created() {},
  mounted() {
    let _this = this;
    this.$http
      .get("http://localhost:8888/energy/data")
      .then((res) => {
        this.energyData = [].concat(res.data.energyData);
        // console.log(this.energyData);
        this.xData = res.data.energyData.map(function (item, i, arr) {
          return item.name;
        });
        this.ratedPower = res.data.energyData.map(function (item, i, arr) {
          return item.ratedPower;
        });
        this.realPower = res.data.energyData.map(function (item, i, arr) {
          return item.realPower;
        });
        // this.eyCollectionData = res.data.energyData.map(function (
        //   item,
        //   i,
        //   arr
        // ) {
        //   return item.eyCollectionData;
        // });
        this.createdBar();
        // console.log(_this.xData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.data-energy {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
  overflow: auto;
  top: 0;
  background: rgba(7, 17, 27, 0.9);
}
.data-energy-wrapper {
  min-height: 100%;
}
.data-energy-wrapper::after {
  display: block;
  content: ".";
  clear: both;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
.data-energy-main {
  color: #fff;
  padding: 5%;
}
.data-energy-close {
  position: relative;
  height: 32px;
  margin: -64px 60px;
  float: right;
  font-size: 24px;
  letter-spacing: 8px;
  cursor: pointer;
}
.data-energy-close a {
  color: #f01400;
}
</style>
