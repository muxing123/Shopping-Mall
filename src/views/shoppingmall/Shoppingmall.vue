<template>
  <div class="shoppingmall">
    <div class="top">
      <!--      定位-->
      <div class="location">
        <div v-if="city" @click="goTo('/location')">
          {{ city }}
          <img src="../../icons/arrow.png" alt="下箭头" class="arrow" />
        </div>
        <div v-else>
          定位中
          <div class="load"><van-loading /></div>
        </div>
      </div>
      <!--      搜索-->
      <div class="search">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="square"
          background="#f2f2f2"
          @search="onSearch"
          @focus="onFocus"
        >
          <div v-if="show" slot="action" @click="onSearch">搜索</div>
          <div v-if="!show" slot="action" @click="onCancel">取消</div>
        </van-search>
      </div>
    </div>
    <!--    这里是父盒子-->
    <div ref="wrapper" class="wrap" v-if="show">
      <div class="cont">
        <!--    轮播图-->
        <Wheel></Wheel>
        <!--    导航-->
        <div class="nav">
          <van-grid :column-num="5" :border="false">
            <van-grid-item
              v-for="(item, index) in nav"
              :icon="item.image"
              :text="item.mallCategoryName"
              :key="index"
              @click="goto(item, index)"
            />
          </van-grid>
        </div>
        <!--    消息图-->
        <div class="img">
          <img :src="picture" alt="消息" />
        </div>
        <!--    商品推荐-->
        <Recommend :recommendList="recommendList"></Recommend>
        <!--    1楼休闲食品-->
        <!--    标题-->
        <div class="title">
          <div class="num">1F</div>
          <div class="text">休闲食品</div>
        </div>
        <FloorOne :floorOne="floorOne"></FloorOne>
        <!--    2楼新鲜水果-->
        <!--    标题-->
        <div class="title">
          <div class="num">2F</div>
          <div class="text">新鲜水果</div>
        </div>
        <FloorOne :floorOne="floorTwo"></FloorOne>
        <!--    3楼新鲜水果-->
        <!--    标题-->
        <div class="title">
          <div class="num">3F</div>
          <div class="text">营养奶品</div>
        </div>
        <FloorOne :floorOne="floorThree"></FloorOne>
        <!--    热销商品-->
        <div class="title">
          <div class="text">热销商品</div>
        </div>
        <HotGoods :hotgoods="hotgoods"></HotGoods>
      </div>
    </div>
    <!--        这里是子盒子，即滚动区域-->
    <!--    搜索展示-->
    <div v-else>
      <van-popup
        v-model="showPop"
        position="bottom"
        :overlay="false"
        :style="{ width: '100%', height: '92%' }"
      >
        <Search :list="list" :value="value" @send="send"> </Search>
      </van-popup>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Wheel from "../../components/shoppingmall/Wheel";
import Recommend from "../../components/shoppingmall/Recommend";
import FloorOne from "../../components/shoppingmall/FloorOne";
import HotGoods from "../../components/shoppingmall/HotGoods";
import Search from "../../components/shoppingmall/Search";
export default {
  name: "Shoppingmall",
  components: {
    Wheel,
    Recommend,
    FloorOne,
    HotGoods,
    Search
  },
  props: {},
  data() {
    return {
      city: "",
      value: "",
      nav: [],
      picture: "",
      recommendList: [],
      floorOne: [],
      floorTwo: [],
      floorThree: [],
      hotgoods: [],
      show: true,
      showPop: false,
      list: [],
      historyList: []
    };
  },
  methods: {
    //搜索
    async sendSearch() {
      try {
        let res = await this.$api.search(this.value, 1);
        this.list = res.data.list;
        this.color();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //接收历史关键字
    send(data) {
      this.value = data;
    },
    //关键字标红
    color() {
      this.list.map(item => {
        let replaceReg = new RegExp(this.value, "g");
        let replaceString = `<span style='color:red'>${this.value}</span>`;
        item.name = item.name.replace(replaceReg, replaceString);
      });
      //方法不完善,不能灵活匹配关键字
      // this.list.map(item => {
      //   let bef = item.name.slice(0, item.name.indexOf(this.value.charAt(0)));
      //   let aft = item.name.slice(
      //     item.name.indexOf(this.value.charAt(this.value.length - 1)) + 1
      //   );
      //   let mod = item.name.substr(
      //     item.name.indexOf(this.value.charAt(0)),
      //     this.value.length
      //   );
      //   this.$set(item, "bef", bef);
      //   this.$set(item, "aft", aft);
      //   this.$set(item, "mod", mod);
      // });
    },
    //控制搜索展示开关
    onFocus() {
      this.show = false;
      this.showPop = true;
    },
    //取消搜索
    onCancel() {
      this.value = "";
      this.show = true;
      this.showPop = false;
    },
    onSearch() {
      this.show = false;
      this.showPop = true;
    },
    //请求首页数据
    async getData() {
      try {
        let res = await this.$api.recommend();
        this.nav = res.data.category;
        this.picture = res.data.advertesPicture.PICTURE_ADDRESS;
        this.recommendList = res.data.recommend;
        this.floorOne = res.data.floor1;
        this.floorTwo = res.data.floor2;
        this.floorThree = res.data.floor3;
        this.hotgoods = res.data.hotGoods;
        this.$store.state.category = res.data.category;
        this.$store.state.bxMallSubDto = res.data.category[0].bxMallSubDto;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    goto(item, index) {
      this.$router.push({ name: "sort", query: { data: item, num: index } });
    }
  },
  mounted() {
    if (this.locationCity) {
      this.city = this.locationCity;
    }
    if (this.$route.query.city) {
      this.city = this.$route.query.city;
    }
    //竖向滚动
    this.$nextTick(() => {
      // 初始化
      new BScroll(this.$refs.wrapper);
    });
    this.getData();
    if (!this.locationCity) {
      let _this = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          _this.city = data.addressComponent.city;
          //没有找到适合的动作来清除
          // localStorage.setItem("city", data.addressComponent.city);
          _this.$store.state.city = data.addressComponent.city;
          console.log(data);
          // data是具体的定位信息
        }

        function onError(data) {
          // 定位出错
          console.log(data);
        }
      });
    }
  },
  created() {},
  filters: {},
  computed: {
    //computed里声明，无法改变，但可用于刷新
    locationCity() {
      return this.$store.state.city;
    }
  },
  watch: {
    value(val) {
      console.log(val);
      if (val.trim() !== "") {
        this.sendSearch();
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.shoppingmall {
  /*顶部样式*/
  padding-bottom: 200px;
  .top {
    width: 100%;
    background: #f2f2f2;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    padding-right: 10px;
    /*padding: 10px 20px;*/
    display: flex;
    justify-content: space-between;
    /*定位样式*/
    .location {
      padding: 17px;
      .arrow {
        width: 13px;
        position: relative;
        top: 3px;
      }
      .load {
        width: 18px;
        display: inline-block;
        position: relative;
        bottom: 3px;
      }
    }
    /*搜索样式*/
    .search {
      width: 260px;
      .van-search {
        .van-search__content,
        .van-search__content--square {
          background-color: white !important;
        }
      }
    }
  }
  /*父盒子样式*/
  .wrap {
    height: 0;
    margin-top: 60px;
    /*子盒子样式*/
    .cont {
      padding-bottom: 200px;
      background: white;
      /*  导航样式*/
      .nav {
        margin-top: 10px;
        padding: 10px;
        background: #f2f2f2;
      }
      /*  消息图样式*/
      .img {
        background: #f2f2f2;
        img {
          width: 100%;
          margin-bottom: 12px;
        }
      }
      /*  标题样式*/
      .title {
        background: #f2f2f2;
        display: flex;
        color: red;
        justify-content: center;
        padding: 10px;
        .text {
          position: relative;
          top: 2px;
        }
        .num {
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 50%;
          text-align: center;
          color: white;
          font-size: 12px;
          background: red;
        }
      }
    }
  }
}
</style>
