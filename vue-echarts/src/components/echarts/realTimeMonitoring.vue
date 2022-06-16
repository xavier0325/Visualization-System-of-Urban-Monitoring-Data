<template>
  <div id="page">
    <div class="col">
      <div class="left_box border">
        <div class="content" style="height: 110px; top: -58px">
          <realTimeWord></realTimeWord>
        </div>
      </div>
      <div class="left_box border">
        <div class="content">
          <realTimePeople :rtPeopleData="rtPeopleData"></realTimePeople>
        </div>
      </div>
      <div class="left_box" style="display: flex">
        <div
          class="border"
          style="flex: 1; height: 98px; max-width: 110px; min-width: 90px"
        >
          <div
            class="content"
            style="width: 220px; height: 160px; min-width: 200px"
          >
            <realTimeLiquid :rtLiquidData="rtLiquidData"></realTimeLiquid>
          </div>
        </div>
        <div
          class="border"
          style="flex: 1; height: 98px; max-width: 110px; min-width: 90px"
        >
          <div
            class="content"
            style="width: 220px; height: 160px; min-width: 200px"
          >
            <realTimeLiquidHealth
              :rtLiquidHealthData="rtLiquidHealthData"
            ></realTimeLiquidHealth>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div id="center_box">
        <realTimeMap :rtMapData="rtMapData"></realTimeMap>
      </div>
    </div>
    <div class="col">
      <div class="right_box border">
        <div class="content" style="height: 110px; top: -55px">
          <realTimeCalendar :rtCalendarData="rtCalendarData"></realTimeCalendar>
        </div>
      </div>
      <div class="right_box border">
        <div class="content">
          <realTimeArea :rtAreaData="rtAreaData"></realTimeArea>
        </div>
      </div>
      <div class="right_box border">
        <div class="content" style="height: 165px">
          <realTimeDegree :rtDegreeData="rtDegreeData"></realTimeDegree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "../../api/common.js";
import realTimeWord from "./realTimeWord.vue";
import realTimePeople from "./realTimePeople.vue";
import realTimeLiquid from "./realTimeLiquid.vue";
import realTimeLiquidHealth from "./realTimeLiquidHealth.vue";
import realTimeMap from "./realTimeMap.vue";
import realTimeCalendar from "./realTimeCalendar.vue";
import realTimeArea from "./realTimeArea.vue";
import realTimeDegree from "./realTimeDegree.vue";

export default {
  components: {
    realTimeWord,
    realTimePeople,
    realTimeLiquid,
    realTimeLiquidHealth,
    realTimeMap,
    realTimeCalendar,
    realTimeArea,
    realTimeDegree,
  },
  data() {
    return {
      path: "ws://localhost:8888/realtimemonitoring/realtimemonitoring_ws",
      socket: "",
      rtPeopleData: {},
      rtLiquidData: {},
      rtLiquidHealthData: {},
      rtCalendarData: {},
      rtAreaData: {},
      rtDegreeData: {},
      rtMapData: {}
    };
  },
  mounted() {
    var _this = this;
    this.wsInit();
    var pageBox = common.getById(page);

    // pageBox.style.width = window.innerWidth + 'px';
    pageBox.style.height = window.innerHeight * 0.9 + "px";
  },
  destroyed() {
    this.socket.onclose = this.wsClose;
  },
  methods: {
    setContent() {
      document.querySelector(".content").style.width =
        document.querySelector(".border").clientWidth;
    },
    wsInit() {
      if (!WebSocket) {
        console.log("Your browser do not apply WebSocket!");
      } else {
        this.socket = new WebSocket(this.path); //socket实例
        this.socket.onopen = this.wsOpen; //socket开启
        this.socket.onerror = this.wsError; //socket错误
        this.socket.onmessage = this.wsGetMsg; //socket消息
      }
    },
    wsOpen() {
      console.log("WebSocket连接成功!");
      this.socket.send("realtimemonitoring客户端已连接WebSocket服务!");
    },
    wsError() {
      console.log("WebSocket连接错误!正在重连...");
      this.wsInit(); //连接失败则重连
    },
    wsGetMsg(msg) {
      // console.log(JSON.parse(msg.data));
      this.rtPeopleData = JSON.parse(msg.data).realtimepeopleData;
      this.rtLiquidData = JSON.parse(msg.data).realtimeliquidData;
      this.rtLiquidHealthData = JSON.parse(msg.data).realtimeliquidhealthData;
      this.rtCalendarData = JSON.parse(msg.data).realtimecalendarData;
      this.rtAreaData = JSON.parse(msg.data).realtimeareaData;
      this.rtDegreeData = JSON.parse(msg.data).realtimedegreeData;
      this.rtMapData = JSON.parse(msg.data).realtimemapData;
    },
    wsSend(content) {
      this.socket.send(content);
    },
    wsClose() {
      this.socket.close();
      this.socket = undefined;
      console.log("WebSocket连接关闭!");
      this.socket.send("连接断开");
    },
  },
};
</script>

<style scoped>
#page {
  width: 98%;
  display: flex;
  max-width: 1920px;
  margin: 0 auto;
  /* padding: 10px; */
}

#page .col {
  flex: 3;

  /* background: rgba(149,162,255,0.1); */
  /* border: 2px solid #fff; */
}

#page .col:nth-child(2) {
  flex: 4;
}

.border {
  max-width: 440px;
  min-width: 300px;
  margin-bottom: 20px;
}

#page .col:first-child .border {
  position: relative;
  border: 15px solid transparent;
  border-image-source: url(../../assets/border.png);
  border-width: 54px 40px 13px 97px;
  border-image-slice: 51 38 20 132;
  /* box-shadow: 0 0 18px #fff; */
}

#page .col:last-child .border {
  position: relative;
  border: 15px solid transparent;
  border-image-source: url(../../assets/border_reverse.png);
  border-width: 54px 40px 13px 97px;
  border-image-slice: 51 38 20 132;
}

.left_box {
  color: #fff;
  /* background: #FFFC11; */
}

.left_box:nth-child(1),
.right_box:nth-child(1) {
  height: 7%;
}

.left_box:nth-child(2),
.right_box:nth-child(2) {
  height: 40%;
}

.left_box:nth-child(3),
.right_box:nth-child(3) {
  height: 15%;
}

#center_box {
  width: 90%;
  height: 90%;
  min-width: 350px;
  border: 1px solid rgba(149, 162, 255, 0.5);
  margin: 10% auto;
  color: #fff;
  box-shadow: 0 0 10px rgba(149, 162, 255, 0.5);
}

.right_box {
  height: 100px;
  color: #fff;
}

.content {
  width: 440px;
  height: 300px;
  min-width: 440px;
  position: absolute;
  left: -91px;
  top: -44px;
}
</style>
