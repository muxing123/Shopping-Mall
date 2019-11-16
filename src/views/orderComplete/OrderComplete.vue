<template>
  <div class="ordercomplete">
    <!--    标题-->
    <div class="title">
      <van-nav-bar title="我的订单" left-arrow @click-left="goTo('/my')" />
    </div>
    <!--          已完成订单-->
    <div class="completed" v-if="user">
      <div class="item" v-for="(item, index) in list" :key="index">
        <!--         订单编号   -->
        <div class="orderNum">
          订单编号:<span>{{ item.order_id }}</span>
          <span class="right">交易完成</span>
        </div>
        <!--            商品列表-->
        <div class="orderList">
          <div class="orderItem" v-for="(it, ie) in item.order_list" :key="ie">
            <!--            商品详情-->
            <div class="shopDetal">
              <!--          商品图片-->
              <div class="shopImg">
                <img :src="it.image_path" alt="商品图片" />
              </div>
              <!--            商品信息-->
              <div class="info">
                <div class="name">{{ it.name }}</div>
                <!--              价格与数量-->
                <div class="priceNum">
                  <div class="present_price">￥{{ it.present_price }}</div>
                  <div class="count">
                    <div class="text">x{{ it.count }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--              创建时间、地址、数量、合计-->
        <div class="remarks">
          <div class="time">创建时间:{{ item.add_time }}</div>
          <div class="address">收货地址:{{ item.address }}</div>
          <div class="priceLen">
            <div class="length">共{{ item.order_list.length }}件商品</div>
            <div class="price">合计:{{ item.mallPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="goLogin">请先登录</div>
  </div>
</template>

<script>
// import { Toast } from "vant";
export default {
  name: "OrderComplete",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    //获取用户订单数量
    async sendOrderNum() {
      try {
        let res = await this.$api.getOrderNum();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //  订单查询
    async sendOrder() {
      try {
        let res = await this.$api.getMyOrder();
        this.list = res.list;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.sendOrderNum();
    this.sendOrder();
    this.active = this.$route.query.active;
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
.ordercomplete {
  /*已完成订单样式*/
  .completed {
    padding: 10px;
    .item {
      background: white;
      border-radius: 8px;
      margin-bottom: 10px;
      .orderNum {
        padding: 8px 0 8px 10px;
        height: 15px;
        line-height: 15px;
        border-bottom: 1px solid #f2f2f2;
        span {
          font-size: 13px;
        }
        .right {
          color: darkorange;
          margin-left: 60px;
        }
      }
      .orderList {
        .orderItem {
          /*商品详情*/
          margin-top: 10px;
          .shopDetal {
            display: flex;
            /*商品图片*/
            .shopImg {
              width: 100px;
              border: 1px solid #f2f2f2;
              margin: 0 10px;
              img {
                width: 100%;
              }
            }
            /*  商品信息*/
            .info {
              width: 55%;
              display: flex;
              .name {
                color: red;
              }
              .priceNum {
                margin-left: 20px;
                .present_price {
                }
                .count {
                  .text {
                    position: relative;
                    top: 2px;
                    color: #999999;
                    text-align: right;
                  }
                }
              }
            }
          }
        }
      }
      /*  商品备注*/
      .remarks {
        text-align: right;
        padding: 10px;
        margin-top: 10px;
        border-top: 1px solid #f2f2f2;
        .address {
          margin-top: 10px;
        }
        .priceLen {
          display: flex;
          margin-top: 10px;
          .length {
            margin-left: auto;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .goLogin {
    text-align: center;
    margin-top: 40px;
    color: #ff6c6c;
  }
}
</style>
