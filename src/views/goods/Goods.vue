<template>
  <div class="goods">
    <!--    轮播图-->
    <div class="wheel">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item>
          <img
            :src="goodsOne.image_path"
            alt="轮播图"
            class="wheelimg"
            @click="imagePreview()"
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            :src="goodsOne.image_path"
            alt="轮播图"
            class="wheelimg"
            @click="imagePreview()"
          />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/2</div>
      </van-swipe>
    </div>
    <!--    返回·箭头-->
    <div class="arrow" @click="goTo('/shoppingmall')">
      <van-icon name="arrow-left" color="white" />
    </div>
    <!--    商品介绍-->
    <div class="content">
      <div class="goodOne">
        <div class="goodsName">{{ goodsOne.name }}</div>
        <div class="price">￥{{ goodsOne.present_price }}</div>
      </div>
      <div class="three">
        <div>运费:{{ goodsOne.__v }}</div>
        <div>剩余：{{ goodsOne.amount }}</div>
        <!--        收藏-->
        <div>
          <div v-if="collect" @click="change">
            取消收藏：<van-icon name="like" color="red" />
          </div>
          <div v-else @click="change">收藏：<van-icon name="like-o" /></div>
        </div>
      </div>
      <div class="shop">
        <div class="shopTag">
          <van-icon name="shop-o" />有赞的店
          <div class="tag">官方</div>
        </div>
        <div class="enter">进入店铺<van-icon name="arrow" /></div>
      </div>
      <div class="commodity">
        <van-tabs>
          <van-tab title="商品详情">
            <div v-html="goodsOne.detail"></div>
          </van-tab>
          <van-tab title="商品评论">
            <div class="item" v-for="(item, index) in list" :key="index">
              <!--      评价详情-->
              <div class="evaDet">
                <div class="top">
                  <div class="left">
                    <!--            人物头像-->
                    <div>
                      <div class="img" v-if="item.anonymous === false">
                        <img src="../../icons/benefit.jpeg" alt="人物头像" />
                      </div>
                      <div v-else class="img">
                        <img src="../../icons/anymous.png" alt="人物头像" />
                      </div>
                    </div>
                    <div>
                      <div class="rate">
                        <!--              用户名-->
                        <div>
                          <div v-if="item.anonymous === false">{{ user }}:</div>
                          <div v-else>{{ item.comment_nickname }}:</div>
                        </div>
                        <!--          商品评分-->
                        <van-rate
                          v-model="item.rate"
                          :size="15"
                          color="red"
                          void-icon="star"
                          void-color="#eee"
                        />
                      </div>
                    </div>
                  </div>
                  <!--        创建时间-->
                  <div class="right">{{ item.comment_time }}</div>
                </div>
                <!--      评价内容-->
                <div class="content">{{ item.content }}</div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!--    商品导航-->
    <div class="goodsNav">
      <van-goods-action>
        <van-goods-action-icon
          icon="wap-home-o"
          text="商城"
          to="shoppingmall"
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="count"
          to="shoppingcart"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="shopCart"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="showPop"
        />
      </van-goods-action>
    </div>
    <!--    立即购买，商品规格-->
    <div class="pop">
      <van-popup
        v-model="show"
        position="bottom"
        :closeable="true"
        close-icon="close"
        close-icon-position="top-right"
        :style="{ width: '100%', height: '40%' }"
      >
        <div class="top">
          <!--          商品图片-->
          <div class="img">
            <img :src="goodsOne.image_path" :alt="goodsOne.name" />
          </div>
          <!--          商品信息-->
          <div class="right">
            <div class="name">{{ goodsOne.name }}</div>
            <div class="price">￥{{ goodsOne.present_price }}</div>
          </div>
        </div>
        <!--        购买数量-->
        <div class="nums">
          <div class="left">
            <div>购买数量：</div>
            <div class="left-bottom">
              <div>剩余{{ goodsOne.amount }}件</div>
              <div class="red">每人限购50件</div>
            </div>
          </div>
          <div class="right">
            <van-stepper v-model="value" />
          </div>
        </div>
        <!--        立即购买-->
        <div class="button">
          <van-button type="danger" @click="goto">立即购买</van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { Toast } from "vant";
export default {
  name: "Goods",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      page: 1,
      goodsOne: {},
      current: 0,
      count: 0,
      list: [],
      collect: 0,
      show: false,
      value: 1,
      browseHistory: ""
    };
  },
  methods: {
    //跳转订单结算
    goto() {
      this.$set(this.goodsOne, "count", this.value);
      this.$set(this.goodsOne, "idDirect", true);
      let list = [];
      list.push(this.goodsOne);
      localStorage.setItem(this.user + "shoplist", JSON.stringify(list));
      this.$router.push("/order");
      // this.$router.push({ name: "order", query: { data: list } });
    },
    //收藏
    async change() {
      this.collect = !this.collect;
      if (this.collect) {
        try {
          let res = await this.$api.collection(this.goodsOne);
          if (res.code === 200) {
            Toast.success(res.msg);
          } else {
            Toast.fail(res.msg);
          }
          console.log(res);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          let res = await this.$api.cancelCollection(this.goodsOne.id);
          if (res.code === 200) {
            Toast.success(res.msg);
          } else {
            Toast.fail(res.msg);
          }
          console.log(res);
        } catch (e) {
          console.log(e);
        }
      }
    },
    //控制弹出层
    showPop() {
      this.show = !this.show;
    },
    //查询商品是否已收藏
    async sendIscollect() {
      try {
        let res = await this.$api.isCollection(this.id);
        this.collect = res.isCollection;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //将浏览过的商品放入一个数组
    unshift() {
      if (this.user) {
        let goodsList = JSON.parse(localStorage.getItem(this.browseHistory));
        if (goodsList.length === 0) {
          goodsList.unshift(this.goodsOne);
        } else {
          goodsList.map((item, index) => {
            if (item.id === this.goodsOne.id) {
              goodsList.splice(index, 1);
            }
          });
          goodsList.unshift(this.goodsOne);
        }
        localStorage.setItem(this.browseHistory, JSON.stringify(goodsList));
      }
    },
    async getData() {
      try {
        let res = await this.$api.goodOne(this.id, this.page);
        this.goodsOne = res.goods.goodsOne;
        this.list = res.goods.comment;
        this.unshift();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    imagePreview() {
      ImagePreview({
        images: [this.goodsOne.image, this.goodsOne.image],
        showIndicators: true
      });
    },
    onChange(index) {
      this.current = index;
    },
    goTo(path) {
      this.$router.push(path);
    },
    //请求购物车数据
    async sendCar() {
      try {
        let res = await this.$api.getCard();
        this.count = res.shopList.length;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //加入购物车
    async shopCart() {
      try {
        let res = await this.$api.addShop(this.goodsOne.id);
        if (res.code === 200) {
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
        this.count += 1;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    if (this.user) {
      this.browseHistory = this.user + "browseHistory";
      let browse = JSON.parse(localStorage.getItem(this.browseHistory));
      if (browse === null) {
        localStorage.setItem(this.browseHistory, JSON.stringify([]));
      }
    }
    this.id = this.$route.query.id;
    this.getData();
    this.sendIscollect();
    this.sendCar();
  },
  created() {},
  filters: {},
  computed: {
    user() {
      return this.$store.state.username;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.goods {
  background: white;
  height: 100vh;
  padding-bottom: 200px;
  /*轮播图样式*/
  .wheel {
    .wheelimg {
      width: 100%;
    }
    .custom-indicator {
      position: absolute;
      top: 350px;
      left: 320px;
      background: rgba(0, 0, 0, 0.2);
      color: white;
      width: 40px;
      text-align: center;
      height: 20px;
      line-height: 20px;
      border-radius: 4px;
    }
  }
  /*  返回箭头*/
  .arrow {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
    .van-icon {
      position: relative;
      top: 1px;
      right: 1px;
    }
  }
  /* 商品介绍 */
  .content {
    .goodOne {
      padding: 10px;
      border-bottom: 1px solid #f2f2f2;
      border-top: 1px solid #f2f2f2;
      .price {
        color: red;
        padding: 5px 0;
      }
    }
    .three {
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #f2f2f2;
      height: 30px;
      line-height: 30px;
      color: #999999;
      .van-icon {
        position: relative;
        top: 3px;
      }
    }
    .shop {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f2f2f2;
      border-top: 1px solid #f2f2f2;
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      .shopTag {
        display: flex;
        .van-icon {
          position: relative;
          top: 12px;
          margin-left: 10px;
        }
        .tag {
          width: 30px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          text-align: center;
          background: red;
          color: white;
          border-radius: 4px;
          margin-left: 5px;
          position: relative;
          top: 10px;
        }
      }
      .enter {
        margin-right: 10px;
        .van-icon {
          position: relative;
          top: 2px;
          color: #999999;
        }
      }
    }
    .commodity {
      /deep/img {
        display: block;
      }
      .evaDet {
        .top {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          .left {
            display: flex;
            /*人物头像*/
            .img {
              width: 80px;
              img {
                width: 100%;
                border-radius: 50%;
              }
            }
            /*  评分*/
            .rate {
              margin-left: 10px;
              position: relative;
              top: 20px;
              .van-rate {
                margin-top: 10px;
              }
            }
          }
          /*  创建时间*/
          .right {
            font-size: 13px;
            position: relative;
            top: 30px;
          }
        }
        /*  评价内容*/
        .content {
          padding: 0 0 20px 100px;
          border-bottom: 1px solid #f2f2f2;
          position: relative;
          bottom: 15px;
        }
      }
    }
  }
  /*  弹出层样式*/
  .pop {
    position: relative;
    .top {
      position: relative;
      /*商品图片*/
      .img {
        width: 100px;
        border: 1px solid #f2f2f2;
        position: fixed;
        top: 380px;
        left: 20px;
        background: white;
        img {
          width: 100%;
        }
      }
      /*  右侧样式*/
      .right {
        margin-left: 140px;
        font-size: 13px;
        padding-top: 10px;
        .price {
          color: red;
          margin-top: 25px;
        }
      }
    }
    /*  购买数量*/
    .nums {
      margin-top: 40px;
      display: flex;
      border-top: 1px solid #f2f2f2;
      border-bottom: 1px solid #f2f2f2;
      padding: 5px 0 20px 20px;
      .left {
        .left-bottom {
          margin-top: 10px;
          display: flex;
          color: #999999;
          .red {
            color: red;
            margin-left: 20px;
          }
        }
      }
      .right {
        margin-left: 30px;
        margin-top: 10px;
      }
    }
    /*  立即购买*/
    .button {
      position: absolute;
      bottom: 0;
      width: 100%;
      .van-button {
        width: 100%;
      }
    }
  }
}
</style>
