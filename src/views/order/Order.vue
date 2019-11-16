<template>
  <div class="order">
    <!--    标题-->
    <van-nav-bar
      title="订单结算"
      left-arrow
      @click-left="goTo('/shoppingcart')"
    />
    <!--    收货地址-->
    <div class="address">
      <!-- 地址卡片 -->
      <div class="address-card">
        <div>
          <!--          默认地址存在，选中地址不存在时-->
          <div
            v-if="defaultAdd !== null && addressSelect === undefined"
            class="defaultAdd"
          >
            <van-icon name="location-o" size="30px" class="left" />
            <div class="info">
              <div class="contact">
                <div>收货人:{{ defaultAdd.name }}</div>
                <div>{{ defaultAdd.tel }}</div>
              </div>
              <div class="address">收货地址:{{ defaultAdd.address }}</div>
              <div class="tips">(收获不便时，可选择免费待收货服务)</div>
            </div>
            <van-icon
              name="arrow"
              size="20px"
              class="right"
              @click="GoTo(defaultAdd.address)"
            />
          </div>
          <!--          默认地址存在，选中地址存在时-->
          <div
            v-else-if="defaultAdd !== null && addressSelect !== undefined"
            class="defaultAdd"
          >
            <van-icon name="location-o" size="30px" class="left" />
            <div class="info">
              <div class="contact">
                <div>收货人:{{ addressSelect.name }}</div>
                <div>{{ addressSelect.tel }}</div>
              </div>
              <div class="address">收货地址:{{ addressSelect.address }}</div>
              <div class="tips">(收获不便时，可选择免费待收货服务)</div>
            </div>
            <van-icon
              name="arrow"
              size="20px"
              class="right"
              @click="goto(addressSelect.id)"
            />
          </div>
          <!--          默认地址不在，选中地址存在-->
          <div
            v-else-if="defaultAdd === null && addressSelect !== undefined"
            class="defaultAdd"
          >
            <van-icon name="location-o" size="30px" class="left" />
            <div class="info">
              <div class="contact">
                <div>收货人:{{ addressSelect.name }}</div>
                <div>{{ addressSelect.tel }}</div>
              </div>
              <div class="address">收货地址:{{ addressSelect.address }}</div>
              <div class="tips">(收获不便时，可选择免费待收货服务)</div>
            </div>
            <van-icon
              name="arrow"
              size="20px"
              class="right"
              @click="goto(addressSelect.id)"
            />
          </div>
          <div class="text" @click="goTo('/address')" v-else>
            点击添加收货地址
          </div>
        </div>
        <div class="bgimg"></div>
      </div>
    </div>
    <!--    商品列表-->
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <!--            商品详情-->
        <div class="shopDetal">
          <!--          商品图片-->
          <div class="shopImg">
            <img :src="item.image_path" alt="商品图片" />
          </div>
          <!--            商品信息-->
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <!--              价格与数量-->
            <div class="priceNum">
              <div class="present_price">￥{{ item.present_price }}</div>
              <div class="count">
                <div class="text">x{{ item.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    提交订单-->
    <van-submit-bar
      :price="sum * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Order",
  components: {},
  props: {},
  data() {
    return {
      defaultAdd: {},
      addressSelect: {},
      address: "",
      list: [],
      sum: 0,
      id: [],
      count: 0,
      idDirect: false
    };
  },
  methods: {
    GoTo(address) {
      this.$router.push({
        name: "address",
        query: { address: address }
      });
    },
    goTo(path) {
      this.$router.push(path);
    },
    goto(id) {
      this.$router.push({ name: "address", query: { id: id } });
    },
    //获取默认地址
    async seeDefault() {
      try {
        let res = await this.$api.getDefaultAddress();
        this.defaultAdd = res.defaultAdd;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //  提交订单
    async onSubmit() {
      if (this.defaultAdd !== null && this.addressSelect === undefined) {
        this.address = this.defaultAdd.address;
      } else if (this.defaultAdd !== null && this.addressSelect !== undefined) {
        this.address = this.addressSelect.address;
      } else {
        this.address = this.addressSelect.address;
      }
      this.list.map(item => {
        item.idDirect === undefined ? "" : (this.idDirect = true);
      });
      try {
        let res = await this.$api.placeOrder({
          address: this.address,
          tel: this.defaultAdd.tel,
          orderId: this.id,
          totalPrice: this.sum,
          count: this.count,
          idDirect: this.idDirect
        });
        if (res.code === 200) {
          Toast.success(res.msg);
          this.idDirect = false;
          localStorage.removeItem(this.user + "shoplist");
        } else {
          Toast.fail(res.msg);
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.seeDefault();
    console.log(this.list);
    this.addressSelect = this.$route.query.addressSelect;
    if (JSON.parse(localStorage.getItem(this.user + "shoplist"))) {
      this.list = JSON.parse(localStorage.getItem(this.user + "shoplist"));
      this.list.map(item => {
        this.sum += item.present_price * item.count;
        this.count += item.count;
      });
      this.list.map(item => {
        if (item.idDirect !== undefined) {
          this.id.push(item.id);
        } else {
          this.id.push(item.cid);
        }
      });
    }
    //采用此方法，从地址页面返回时，页面数据会丢失
    // if (this.$route.query.data) {
    //   this.list = this.$route.query.data;
    //   this.list.map(item => {
    //     this.sum += item.present_price * item.count;
    //     this.count += item.count;
    //   });
    //   this.list.map(item => {
    //     if (item.idDirect !== undefined) {
    //       this.id.push(item.id);
    //     } else {
    //       this.id.push(item.cid);
    //     }
    //   });
    // }
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
.order {
  background: white;
  height: 100vh;
  .address {
    .address-card {
      .defaultAdd {
        display: flex;
        justify-content: space-around;
        .left {
          position: relative;
          top: 25px;
        }
        .right {
          position: relative;
          top: 30px;
        }
        .info {
          width: 70%;
          .contact {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
          .address {
            font-size: 13px;
            margin-top: 10px;
          }
          .tips {
            font-size: 13px;
            color: #e58267;
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }
      }
      .text {
        height: 100px;
        line-height: 100px;
        font-size: 13px;
        text-align: center;
      }
      .bgimg {
        height: 5px;
        background: url("../../icons/caitiao.jpg") no-repeat;
      }
    }
  }
  /*  商品地址*/
  .list {
    .item {
      padding: 10px 10px;
      border-bottom: 1px solid #f2f2f2;
      /*商品详情*/
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
          width: 60%;
          .name {
            color: red;
          }
          .priceNum {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            .present_price {
              color: red;
            }
            .count {
              display: flex;
              img {
                width: 20px;
              }
              .text {
                position: relative;
                top: 2px;
                color: #999999;
              }
            }
          }
        }
      }
    }
  }
}
</style>
