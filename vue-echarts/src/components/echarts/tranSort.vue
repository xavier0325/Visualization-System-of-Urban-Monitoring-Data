<template>
  <div id="tsContainer"></div>
</template>

<script>
import common from "../../api/common.js";
export default {
  props: ["wsData"],
  data() {
    return {
      chartObj: null,
      yData: [],
      tranData: [],
    };
  },
  watch: {
    wsData(val) {
      // console.log(val);
      this.yData = val.tranmapData.map(function (item, i) {
        return item.name;
      });
      this.tranData = val.tranmapData.map(function (item, i) {
        return item.value;
      });
      this.chartObj.setOption({
        yAxis: {
          data: this.yData,
        },
        series: [
          {
            type: "bar",
            data: this.tranData,
          },
        ],
      });
    },
  },
  mounted() {
    var _this = this;
    var myChartDom = common.getById(tsContainer);
    var myChart = this.$echarts.init(myChartDom);
    this.chartObj = myChart;

    myChart.setOption(this.drawChart());
  },
  methods: {
    drawChart() {
      return {
        title: {
          text: "top10交通道路拥堵指数实时排序",
          left: "center",
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {},
        grid: {
          show: true,
          bottom: "6%",
        },
        xAxis: {
          max: "dataMax",
          axisLabel: {
            color: "#000",
          },
          axisTick: {
            show: true,
          },
        },
        yAxis: {
          type: "category",
          data: this.yData,
          inverse: true,
          axisLabel: {
            color: "#000",
          },
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 9,
        },
        legend: {
          show: true,
          top: "6%",
        },
        series: [
          {
            realtimeSort: true,
            name: "交通道路拥堵指数",
            type: "bar",
            data: this.tranData,
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
            itemStyle: {
              borderRadius: [0, 10, 10, 0],
            },
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
    },
  },
};
</script>

<style scoped>
#tsContainer {
  width: 100%;
  height: 100%;
}
</style>
