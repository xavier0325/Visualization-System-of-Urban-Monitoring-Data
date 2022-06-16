<template>
  <div id="powerChart"></div>
</template>

<script>
import common from "../../api/common.js";
export default {
  data() {
    return {
      obj: {},
    };
  },
  props: ["eyCollectionData"],
  watch: {
    eyCollectionData: function (newValue, oldValue) {
      console.log(newValue);
      this.obj.setOption({
        series: [
          {
            data: newValue[0],
          },
          {
            data: newValue[1],
          },
          {
            data: newValue[2],
          },
        ],
      });
    },
  },
  mounted() {
    let _this = this;
    let pChart = common.getById(powerChart);
    pChart.style.width = window.innerWidth * 0.9 + "px";
    pChart.style.height = window.innerHeight * 0.7 + "px";
    let myChart = this.$echarts.init(pChart);
    this.obj = myChart;

    let option = {
      title: {
        text: "用电量",
        textStyle: {
          fontSize: 16,
          fontWeight: "normal",
          color: "#f1f1f3",
        },
        left: "3%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#57617b",
          },
        },
      },
      legend: {
        icon: "rect",
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ["1号楼", "2号楼", "3号楼"],
        right: "4%",
        textStyle: {
          fontSize: 12,
          color: "#f1f1f3",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          name: "时间",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          data: [
            "13:00",
            "13:05",
            "13:10",
            "13:15",
            "13:20",
            "13:25",
            "13:30",
            "13:35",
            "13:40",
            "13:45",
            "13:50",
            "13:55",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "单位（千瓦/时）",
          textStyle: {
            fontSize: 14,
          },
          axisTick: {
            //坐标轴刻度
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisLabel: {
            //坐标轴刻度标签
            margin: 10,
          },
          splitLine: {
            lineStyle: {
              color: "#57617b",
            },
          },
        },
      ],
      series: [
        {
          name: "1号楼",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            // normal: {
            width: 2,
            // }
          },
          areaStyle: {
            // normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(137,189,27,0.3)",
              },
              {
                offset: 0.8,
                color: "rgba(137,189,27,0)",
              },
            ]),
            shadowColor: "rgba(0,0,0,0.2)",
            shadowBlur: 10,
            // }
          },
          itemStyle: {
            // normal: {
            color: "rgb(137,189,27)",
            borderColor: "rgba(137,189,27,0.2)",
            borderWidth: 12,
            // }
          },
          data: _this.eyCollectionData[0],
        },
        {
          name: "2号楼",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            // normal: {
            width: 2,
            // }
          },
          areaStyle: {
            // normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 136, 212, 0.3)",
              },
              {
                offset: 0.8,
                color: "rgba(0, 136, 212, 0)",
              },
            ]),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
            // }
          },
          itemStyle: {
            // normal: {
            color: "rgb(0,136,212)",
            borderColor: "rgba(0,136,212,0.2)",
            borderWidth: 12,

            // }
          },

          data: _this.eyCollectionData[1],
        },
        {
          name: "3号楼",
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            // normal: {
            width: 2,
            // }
          },
          areaStyle: {
            // normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(219, 50, 51, 0.3)",
              },
              {
                offset: 0.8,
                color: "rgba(219, 50, 51, 0)",
              },
            ]),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
            // }
          },
          itemStyle: {
            // normal: {

            color: "rgb(219,50,51)",
            borderColor: "rgba(219,50,51,0.2)",
            borderWidth: 12,
            // }
          },
          data: _this.eyCollectionData[2],
        },
      ],
      animationDurationUpdate: 0,
    };
    myChart.setOption(option);
    window.onresize = function () {
		common.setContentSize(powerChart);
      myChart.resize();
    };
  },
};
</script>

<style scoped>
</style>
