<template>
  <div class="evaluationdetails">
    <!--    标题-->
    <div class="title">
      <van-nav-bar
        title="评价详情"
        left-arrow
        @click-left="goTo('/evaluation')"
      />
    </div>
    <!--      评价详情-->
    <div class="evaDet">
      <div class="top">
        <div class="left">
          <!--            人物头像-->
          <div>
            <div class="img" v-if="list.anonymous === false">
              <img src="../../icons/benefit.jpeg" alt="人物头像" />
            </div>
            <div v-else class="img">
              <img src="../../icons/anymous.png" alt="人物头像" />
            </div>
          </div>
          <div>
            <div class="rate">
              <!--              用户名-->
              <div v-if="list.anonymous === false">{{ user }}</div>
              <!--          商品评分-->
              <van-rate
                v-model="list.rate"
                :size="15"
                color="red"
                void-icon="star"
                void-color="#eee"
              />
            </div>
          </div>
        </div>
        <!--        创建时间-->
        <div class="right">{{ list.comment_time }}</div>
      </div>
      <!--      评价内容-->
      <div class="content">评价内容：{{ list.content }}</div>
    </div>
    <!--    商品列表-->
    <div class="list">
      <!--            商品详情-->
      <div class="shopDetal">
        <!--          商品图片-->
        <div class="shopImg">
          <img :src="list.goods[0].image_path" alt="商品图片" />
        </div>
        <!--            商品信息-->
        <div class="info">
          <div class="name">{{ list.goods[0].name }}</div>
          <div class="cart" @click="goto(list.cid)">
            <van-icon name="cart-o" size="30px" color="red" />
          </div>
        </div>
      </div>
    </div>
    <!--    返回-->
    <div class="back">
      <van-button type="primary" @click="goTo('/evaluation')">返回</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluationDetails",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      list: {}
    };
  },
  methods: {
    //  查询单条评论
    async sendEvaDet() {
      try {
        let res = await this.$api.evaluateOne(this.id);
        this.list = res.evaluateOne;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    goto(id) {
      this.$router.push({ name: "goods", query: { id: id } });
    }
  },
  mounted() {
    this.id = this.$route.query._id;
    this.sendEvaDet();
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
.evaluationdetails {
  background: white;
  height: 100vh;
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
          top: 40px;
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
      padding: 0 0 20px 10px;
      border-bottom: 1px solid #f2f2f2;
    }
  }
  /*  商品列表*/
  .list {
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
        width: 70%;
        .name {
          margin-top: 8px;
          font-size: 13px;
        }
        .cart {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #ff6c6c;
          position: relative;
          left: 190px;
          .van-icon {
            position: relative;
            top: 12px;
            left: 8px;
          }
        }
      }
    }
  }
  /*  返回*/
  .back {
    padding: 0 20px;
    margin-top: 250px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
