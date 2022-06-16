<template>
  <div>
    <div id="rtdContainer"></div>
    <div id="rtdSelector"></div>
  </div>
</template>

<script>
import common from "../../api/common.js";
export default {
  props: ["rtDegreeData"],
  data() {
    return {
      rotateAngle: 216,
      area: "雨湖区",
      chartObj: null,
    };
  },
  watch: {
    rtDegreeData(val) {
      let Data = val.data;
      Data = Data.map(function (item, i) {
        item["detail"] = {
          color: "#eee",
          formatter: function (value) {
            if (value <= 33) {
              return "低风险";
            } else if (value > 33 && value < 66) {
              return "中风险";
            } else {
              return "高风险";
            }
          },
          fontSize: 15,
        };
        return item;
      });
    //   console.log(Data);
      let data = [];
      Data.forEach((item, i) => {
        if (item.name.substring(0, 3) === this.area) {
          data.push(item);
        }
      });
    //   console.log(data);
      this.chartObj.setOption({
        series: [
          {
            data: data,
          },
        ],
      });
    },
  },
  mounted() {
    var _this = this;
    var myChartDom = common.getById(rtdContainer);
    var myChartDom1 = common.getById(rtdSelector);
    var myChart = this.$echarts.init(myChartDom);
    var myChart1 = this.$echarts.init(myChartDom1);
    this.chartObj = myChart;

    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}",
      },
      series: [
        {
          name: "疫情程度",
          type: "gauge",
          radius: "70%",
          min: 0,
          max: 100,
          center: ["50%", "50%"],
          progress: {
            show: true,
            width: 4,
            itemStyle: {
              color: "#fff",
              shadowColor: "#fff",
              shadowBlur: 10,
            },
          },
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.33, "#7CFFB2"],
                [0.66, "#FDDD60"],
                [1, "#FF6E76"],
              ],
            },
          },
          axisLabel: {
            color: "#fff",
            fontSize: 15,
            distance: -40,
            formatter: function (value) {
              if (value === 20) {
                return "低";
              } else if (value === 50) {
                return "中";
              } else if (value === 80) {
                return "高";
              }
              return "";
            },
          },
          detail: {
            valueAnimation: true,
            formatter: "{value}",
          },
          data: [],
        },
      ],
    };
    var option1 = {
      title: {
        text: "⇦",
        subtext: "选择",
        left: 0,
        top: "center",
        textStyle: {
          color: "#fff",
          fontSize: 40,
          textShadowColor: "#fff",
          textShadowBlur: 10,
        },
        subtextStyle: {
          color: "#eee",
          textShadowColor: "#eee",
          textShadowBlur: 10,
        },
        itemGap: 0,
      },
      tooltip: {
        show: false,
      },
      series: [
        {
          name: "查看区域选择",
          type: "pie",
          center: ["60%", "50%"],
          radius: [0, "80%"],
          startAngle: 216,
          label: {
            show: "true",
            position: "inside",
            color: "#fff",
            fontWeight: "bolder",
          },
          itemStyle: {
            // color: 'rgba(149, 162, 255, 0.4)',
            borderColor: "rgba(255,255,255,1)",
            borderWidth: 1,
            borderRadius: "100%",
          },
          emphasis: {
            label: {
              fontSize: 25,
            },
            scaleSize: 15,
          },
          data: [
            {
              name: "雨湖区",
              value: 1,
            },
            {
              name: "岳塘区",
              value: 1,
            },
            {
              name: "湘乡市",
              value: 1,
            },
            {
              name: "韶山市",
              value: 1,
            },
            {
              name: "湘潭县",
              value: 1,
            },
          ],
        },
      ],
    };

    myChart.setOption(option);
    myChart1.setOption(option1);

    myChart1.on("click", function (params) {
      var i = params.dataIndex;
      _this.rotateAngle = 216 + 72 * i;
      _this.area = params.data.name;
      myChart1.setOption({ series: [{ startAngle: _this.rotateAngle }] });
    });

    window.onresize = function () {
      myChart.resize();
      myChart1.resize();
    };
  },
};
</script>

<style scoped>
#rtdContainer {
  width: 220px;
  height: 160px;
  float: left;
}

#rtdSelector {
  width: 220px;
  height: 160px;
  float: left;
}
</style>
