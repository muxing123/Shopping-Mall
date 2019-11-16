<template>
  <div class="recommend">
    <div class="title">商品推荐</div>
    <!--      这里是父盒子-->
    <div ref="wrapper" class="wrap">
      <!--        这里是子盒子，即滚动区域-->
      <div class="cont">
        <div
          class="cont-item"
          v-for="(item, index) in recommendList"
          :key="index"
          @click="goTo(item)"
        >
          <div class="cont-img">
            <img class="img" :src="item.image" :alt="item.goodsName" />
          </div>
          <div class="cont-dest">{{ item.goodsName }}</div>
          <div class="cont-price">
            <span class="mallPrice">￥{{ item.mallPrice }}</span>
            <span class="price">￥{{ item.price }}</span>
          </div>
          <!--          按钮部分-->
          <div class="cont-button">
            <van-button
              icon="shopping-cart"
              type="warning"
              size="mini"
              class="cart"
            />
            <van-button
              type="danger"
              size="mini"
              class="right"
              @click="goTo(item)"
            >
              查看详情
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Recommend",
  components: {},
  props: {
    recommendList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    goTo(item) {
      this.$router.push({ name: "goods", query: { id: item.goodsId } });
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化
      new BScroll(this.$refs.wrapper, {
        startX: 0,
        click: true,
        scrollX: true
      });
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.recommend {
  background: white;
  .title {
    padding: 10px 20px;
  }
  /*父盒子*/
  .wrap {
    display: flex;
    overflow: hidden;
    /*子盒子*/
    .cont {
      display: flex;
      flex: 1;
      /*每一项商品样式*/
      .cont-item {
        border-top: 1px solid #f2f2f2;
        border-right: 1px solid #f2f2f2;
        .cont-img {
          .img {
            width: 100%;
          }
        }
        .cont-dest {
          padding: 2px 0 2px 6px;
          height: 19px;
          line-height: 19px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        .cont-price {
          padding-left: 6px;
          .price {
            font-size: 12px;
            color: grey;
            text-decoration: line-through;
            margin-left: 5px;
          }
        }
        /*按钮样式*/
        .cont-button {
          padding: 5px;
          display: flex;
          .cart {
            min-width: 30px;
            border-radius: 4px 0 0 4px;
          }
          .right {
            width: 85px;
            margin: 0;
            border-radius: 0 4px 4px 0;
          }
        }
      }
    }
  }
}
</style>
