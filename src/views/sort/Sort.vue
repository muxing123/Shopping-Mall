<template>
  <div class="sort">
    <div class="title">商品分类</div>
    <!--    右侧内容展示-->
    <div class="right">
      <!--    侧边导航-->
      <div class="nav">
        <div
          class="item"
          :class="{ white: num === index }"
          v-for="(item, index) in category"
          :key="index"
          @click="set(item.bxMallSubDto, index)"
        >
          <div>{{ item.mallCategoryName }}</div>
        </div>
      </div>
      <!--    右侧商品展示-->
      <div class="content">
        <div class="navtrans">
          <van-tabs
            v-model="active"
            v-if="list.length === 0"
            @click="getData"
            :ellipsis="false"
          >
            <van-tab
              v-for="(item, index) in bxMallSubDto"
              :key="index"
              :title="item.mallSubName"
              :name="item.mallSubId"
            >
            </van-tab>
          </van-tabs>
          <van-tabs
            v-model="active"
            v-if="list.length > 0"
            @click="getData"
            :ellipsis="false"
          >
            <van-tab
              v-for="(item, index) in list"
              :key="index"
              :title="item.mallSubName"
              :name="item.mallSubId"
            >
            </van-tab>
          </van-tabs>
        </div>
        <!--      这里是父盒子-->
        <div ref="wrapper" class="wrap">
          <!--        这里是子盒子，即滚动区域-->
          <div class="goods">
            <div
              v-for="(item, index) in goodsList"
              :key="index"
              class="item"
              @click="goTo(item)"
            >
              <div class="img">
                <img :src="item.image_path" :alt="item.name" />
              </div>
              <div class="text">
                <div class="name">{{ item.name }}</div>
                <span class="present_price">￥{{ item.present_price }} </span>
                <span class="orl_price">{{ item.orl_price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Sort",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      list: [],
      goodsList: [],
      num: 0
    };
  },
  methods: {
    set(item, index) {
      this.num = index;
      this.list = item;
      this.getData(this.list[0].mallSubId);
      this.active = 0;
    },
    goTo(item) {
      this.$router.push({ name: "goods", query: { id: item.id } });
    },
    async getData(name) {
      try {
        let res = await this.$api.category(name);
        this.goodsList = res.dataList;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getData(this.bxMallSubDto[0].mallSubId);
    if (this.$route.query.num) {
      this.num = this.$route.query.num;
    }
    if (this.$route.query.data) {
      this.list = this.$route.query.data;
      this.list = this.list.bxMallSubDto;
      this.getData(this.list[0].mallSubId);
    }
    //纵向滚动
    this.$nextTick(() => {
      // 初始化
      new BScroll(this.$refs.wrapper, {
        startY: 0,
        click: true,
        scrollY: true
      });
    });
  },
  created() {},
  filters: {},
  computed: {
    category() {
      return this.$store.state.category;
    },
    bxMallSubDto() {
      return this.$store.state.bxMallSubDto;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.white {
  background: white;
}
.sort {
  .title {
    width: 100%;
    padding: 10px;
    text-align: center;
    background: white;
    border-bottom: 1px solid #f2f2f2;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  /*右侧内容样式*/
  .right {
    height: 100vh;
    /*侧边栏样式*/
    .nav {
      width: 25%;
      background: skyblue;
      position: fixed;
      top: 37px;
      bottom: 0;
      .item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #f2f2f2;
      }
    }
    /*商品内容样式*/
    .content {
      width: 75%;
      height: 100%;
      background: white;
      flex: 1;
      position: absolute;
      top: 37px;
      left: 93.75px;
      /*横向标签页*/
      .navtrans {
        position: fixed;
        top: 37px;
        width: 75%;
        z-index: 100;
      }
      /*商品内容*/
      .wrap {
        margin-top: 50px;
        height: 0;
        .goods {
          .item {
            display: flex;
            padding: 8px 0 8px 15px;
            background: white;
            .img {
              /*width: 30%;*/
              border: 1px solid #f2f2f2;
              img {
                width: 80px;
              }
            }
            .text {
              padding: 0 10px;
              color: red;
              .name {
                margin-bottom: 20px;
              }
              .present_price {
                color: red;
                font-weight: bold;
              }
              .orl_price {
                font-size: 12px;
                color: #555555;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
  }
}
</style>
