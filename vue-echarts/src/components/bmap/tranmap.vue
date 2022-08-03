<template>
  <div>
    <div id="tranmap"></div>
    <div id="tranSortBox">
      <tranSort :wsData="wsData"></tranSort>
    </div>
    <div id="searchBox">
      <input
        type="search"
        id="searchInput"
        size="20"
        placeholder="请输入检索地点"
        @input="checkValue"
        v-model="searchWord"
      />
      <label id="searchBtn">
        <svg
          t="1648187269632"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5334"
          width="18"
          height="18"
        >
          <path
            d="M1004.8 915.2l-243.2-243.2c0 0-6.4-6.4-6.4-6.4C800 595.2 832 505.6 832 416 832 185.6 646.4 0 416 0S0 185.6 0 416 185.6 832 416 832c89.6 0 179.2-32 243.2-83.2 0 6.4 6.4 6.4 6.4 6.4l243.2 243.2c25.6 25.6 70.4 25.6 96 6.4C1030.4 979.2 1030.4 940.8 1004.8 915.2zM64 416C64 224 224 64 416 64S768 224 768 416 608 768 416 768 64 608 64 416z"
            p-id="5335"
            fill="#aaaaaa"
          ></path>
        </svg>
      </label>
      <div id="tipBox" v-show="searchList.length">
        <span
          class="searchItem"
          v-for="(item, index) in searchList"
          :key="index"
        >
          <svg
            t="1648187269632"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5334"
            width="14"
            height="14"
          >
            <path
              d="M1004.8 915.2l-243.2-243.2c0 0-6.4-6.4-6.4-6.4C800 595.2 832 505.6 832 416 832 185.6 646.4 0 416 0S0 185.6 0 416 185.6 832 416 832c89.6 0 179.2-32 243.2-83.2 0 6.4 6.4 6.4 6.4 6.4l243.2 243.2c25.6 25.6 70.4 25.6 96 6.4C1030.4 979.2 1030.4 940.8 1004.8 915.2zM64 416C64 224 224 64 416 64S768 224 768 416 608 768 416 768 64 608 64 416z"
              p-id="5335"
              fill="#aaaaaa"
            ></path>
          </svg>
          <b style="font-weight: bolder">{{ item.province }}{{ item.city }}</b
          >{{ item.district }}{{ item.street }}{{ item.business }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import common from "../../api/common.js";
import tranSort from "../echarts/tranSort.vue";

export default {
  components: {
    tranSort,
  },
  data() {
    return {
      startPoint: {
        x: 112.870634,
        y: 27.887929,
      },
      zoom: 15,
      searchList: [],
      searchWord: "",
      path: "ws://localhost:8888/tranmap/tranmap_ws",
      socket: "",
      wsData: {}
    };
  },
  mounted() {
    var _this = this;
    // 百度地图API功能
    var map = new BMap.Map("tranmap"); // 创建Map实例
    var myValue; //检索地点值
    this.wsInit();  //启动WebSocket服务

    map.centerAndZoom(
      new BMap.Point(this.startPoint.x, this.startPoint.y),
      this.zoom
    ); // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("湘潭"); // 设置地图显示的城市
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    // map.setMapStyle(this.styleJson)  //地图样式
    var ctrTraffic = new BMapLib.TrafficControl({
      //交通流量控件
      showPanel: true, //是否显示路况提示面板
    });
    var ctrNavigation = new BMap.NavigationControl({
      //平移和缩放控件
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      type: BMAP_NAVIGATION_CONTROL_SMALL,
      offset: new BMap.Size(10, 50),
    });
    var ctrScale = new BMap.ScaleControl({
      //比例尺控件
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: new BMap.Size(100, 5),
    });
    var ctrMapType = new BMap.MapTypeControl({
      //地图类型控件
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP], //普通街道视图,卫星和路网的混合视图
    });
    var ctrOverView = new BMap.OverviewMapControl({
      //缩略图控件
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      offset: new BMap.Size(10, 10),
      isOpen: true,
    });
    map.addControl(ctrTraffic);
    map.addControl(ctrNavigation);
    map.addControl(ctrScale);
    map.addControl(ctrMapType);
    map.addControl(ctrOverView);
    ctrTraffic.setAnchor(BMAP_ANCHOR_TOP_LEFT); //位置
    ctrTraffic.showTraffic(); //默认开启路况

    //地点检索功能
    var ac = new BMap.Autocomplete({
      //实例化一个自动完成对象
      input: "searchInput",
      location: map,
      onSearchComplete: function (AutocompleteResult) {
        // console.log(ac.getResults())
        // console.log(AutocompleteResult);
        var arr = AutocompleteResult.Ir;
        var temp = [];
        _this.searchList.splice(0, _this.searchList.length);
        for (var i = 0; i < arr.length; i++) {
          temp.push(arr[i]);
        }
        // console.log(temp);
        _this.searchList = [].concat(temp);
      },
    });

    //设置地点
    function setPlace() {
      map.clearOverlays(); //清除地图上所有覆盖物
      function myFun() {
        var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
        map.centerAndZoom(pp, _this.zoom);
        map.addOverlay(new BMap.Marker(pp)); //添加标注
      }
      var local = new BMap.LocalSearch(map, {
        //智能搜索
        onSearchComplete: myFun,
      });
      local.search(myValue);
    }

    common.getById(searchInput).onkeydown = function (e) {
      //通过输入后回车检索
      if (e.keyCode === 13 && e.target.baseURI.match(/tranmap$/i)) {
        if (_this.searchWord.trim() === "") {
          _this.searchList.splice(0, _this.searchList.length);
          map.centerAndZoom(
            new BMap.Point(_this.startPoint.x, _this.startPoint.y),
            _this.zoom
          ); //空输入时回到最开始地图位置状态
        } else {
          _this.searchList.splice(0, _this.searchList.length);
          myValue = _this.searchWord;
          setPlace();
        }
      }
    };
    common.getById(searchBtn).addEventListener("click", function () {
      //通过搜索按钮点击检索
      if (_this.searchWord.trim() === "") {
        _this.searchList.splice(0, _this.searchList.length);
        map.centerAndZoom(
          new BMap.Point(_this.startPoint.x, _this.startPoint.y),
          _this.zoom
        ); //空输入时回到最开始地图位置状态
      } else {
        _this.searchList.splice(0, _this.searchList.length);
        myValue = _this.searchWord;
        setPlace();
      }
    });

    common.getById(tipBox).addEventListener("click", function (e) {
      //通过提示列表点击检索
      myValue = e.target.innerText;
      _this.searchWord = e.target.innerText;
      setPlace();
      _this.searchList.splice(0, _this.searchList.length);
    });
  },
  destroyed() {
    this.socket.onclose = this.wsClose;
  },
  methods: {
    checkValue(e) {
      //检查为空的话就清空提示数组
      // const {
      // 	value
      // } = e.target;
      // console.log(value)
      if (this.searchWord == "") {
        this.searchList.splice(0, this.searchList.length);
      }
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
      this.socket.send('tranmap客户端已连接WebSocket服务!');
    },
    wsError() {
      console.log("WebSocket连接错误!正在重连...");
      this.wsInit();  //连接失败则重连
    },
    wsGetMsg(msg) {
      // console.log(msg.data);
      this.wsData = JSON.parse(msg.data);
    },
    wsSend(content) {
      this.socket.send(content);
    },
    wsClose() {
      this.socket.close();
      this.socket = undefined;
      console.log("WebSocket连接关闭!");
      this.socket.send('连接断开');
    },
  },
};
</script>
<style scoped>
#tranmap {
  width: 100%;
  height: 90%;
  position: absolute;
  z-index: 100;
}

#tranSortBox {
  width: 600px;
  height: 400px;
  position: absolute;
  left: 0;
  bottom: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 3px solid skyblue;
  border-radius: 0 10px 10px 0;
  z-index: 101;
}

#searchBox {
  display: flex;
  width: 260px;
  padding-top: 5px;
  position: relative;
  margin: 0 auto;
  font-size: 0;
  z-index: 101;
}

#searchBox #searchInput {
  flex: 1;
  width: 200px;
  height: 47px;
  line-height: 27px;
  padding: 8px 52px 8px 12px;
  font-size: 16px;
  color: black;
  font-weight: bold;
  letter-spacing: 1px;
  border: 2px solid skyblue;
  border-right: none;
  border-radius: 12px;
  background: #fff;
  outline: none;
  z-index: 101;
}

#searchBox #searchInput:focus {
  transition: border linear 1s;
  border-color: rgba(141, 39, 142, 0.75);
  box-shadow: 0 0 18px rgba(38, 130, 188, 0.3);
}

#searchBox label {
  flex: 1;
  display: flex;
  position: absolute;
  right: -7px;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 43px;
  background-color: #eee;
  border: 2px solid skyblue;
  border-left: none;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  z-index: 102;
}

#searchBox label:hover {
  background-color: #ddd;
  border-color: rgba(141, 39, 142, 0.75);
  box-shadow: 14px 0 20px rgba(38, 130, 188, 0.3);
}

#searchBox #tipBox {
  position: absolute;
  top: 60px;
  width: 219px;
  height: auto;
  max-height: 550px;
  overflow: auto;
  background: #fff;
  border: 1px solid #e4e6e7;
  box-shadow: 0 0 30px #aaa;
}

#searchBox #tipBox::before {
  content: "";
  border: 7px solid transparent;
  border-bottom-color: skyblue;
  position: absolute;
  left: 5px;
  top: -14px;
}

#searchBox #tipBox .searchItem {
  display: inline-block;
  width: 199px;
  height: auto;
  line-height: 30px;
  color: #666;
  padding: 0 10px;
  border-bottom: 2px solid #e4e6e7;
  font-size: 15px;
  cursor: pointer;
}

#searchBox #tipBox .searchItem:last-child {
  border-bottom: none;
}

#searchBox #tipBox .searchItem:hover {
  background: #eee;
}
</style>
