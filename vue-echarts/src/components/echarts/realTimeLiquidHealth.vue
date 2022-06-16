<template>
  <div id="rtlhContainer"></div>
</template>

<script>
import common from "../../api/common.js";
import liquid from "echarts-liquidfill";
export default {
  props: ["rtLiquidHealthData"],
  data() {
    return {
      chartObj: null,
    };
  },
  watch: {
    rtLiquidHealthData(val) {
      this.chartObj.setOption({
        series: [
          {
            data: val.data,
          },
        ],
      });
    },
  },
  mounted() {
    var myChartDom = common.getById(rtlhContainer);
    var myChart = this.$echarts.init(myChartDom);
    this.chartObj = myChart;

    var option = {
      title: {
        text: "疫\n情\n治\n愈\n率",
        textStyle: {
          color: "#eee",
          fontWeight: "900",
          textBorderColor: "#d81e06",
          textBorderWidth: "2",
          textShadowColor: "#d81e06",
          textShadowBlur: 2,
        },
        left: "5%",
        top: "center",
      },
      series: [
        {
          type: "liquidFill",
          name: "疫情治愈率",
          radius: "70%",
          center: ["60%", "50%"],
          silent: true,
          animationEasingUpdate: "linear",
          animationDurationUpdate: 1000,
          data: [],
          color: ["#d81e06"],
          label: {
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
          },
          outline: {
            borderDistance: 2,
            itemStyle: {
              borderColor: "rgba(216, 30, 6, 0.5)",
              shadowColor: "#fff",
              borderWidth: 3,
              shadowBlur: 20,
            },
          },
          shape:
            "path://M736.048 127.978c-65.881 0-128.495 24.942-176.314 70.526-4.644 4.3-28.726 28.726-47.304 47.648l-47.304-47.132c-47.82-45.756-110.605-71.042-177.003-71.042-141.224 0-255.957 114.905-255.957 255.957 0 82.395 41.111 144.32 76.546 182.507l316.85 320.118c25.114 25.114 52.98 41.455 86.695 41.455s61.581-16.341 86.695-41.455l318.914-322.354c38.187-47.648 74.31-92.716 74.31-180.099-0.172-141.224-115.077-256.129-256.129-256.129z",
          backgroundStyle: {
            color: "rgba(220, 48, 35, 0.3)",
          },
        },
      ],
    };

    myChart.setOption(option);
    window.onresize = function () {
      myChart.resize();
    };
  },
};
</script>

<style scoped>
#rtlhContainer {
  width: 200px;
  height: 160px;
}
</style>
