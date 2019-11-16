<template>
  <div class="evaluation">
    <!--    标题-->
    <div class="title">
      <van-nav-bar title="评价中心" left-arrow @click-left="goTo('/my')" />
    </div>
    <!--    背景图-->
    <div class="bgImg">
      <img src="../../icons/evaluate.jpg" alt="评价中心" />
    </div>
    <!--    标签页-->
    <div class="tabs">
      <div class="tab">
        <van-tabs @click="onClick">
          <van-tab title="待评价" :name="1"> </van-tab>
          <van-tab title="已评价" :name="2"> </van-tab>
        </van-tabs>
      </div>
    </div>
    <!--    评价展示-->
    <!--      这里是父盒子-->
    <div ref="wrapper" class="wrap">
      <!--        这里是子盒子，即滚动区域-->
      <div class="cont">
        <!--    待评价-->
        <div class="tobeEva" v-if="this.name === 1 && user">
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
                <div class="button">
                  <van-button
                    icon="chat"
                    type="danger"
                    plain
                    round
                    size="mini"
                    @click="goto(item)"
                  >
                    评论晒单
                  </van-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--    已评价-->
        <div class="tobeEva" v-if="this.name === 2 && user">
          <div class="item" v-for="(item, index) in alrList" :key="index">
            <!--            商品详情-->
            <div class="shopDetal">
              <!--          商品图片-->
              <div class="shopImg">
                <img :src="item.goods[0].image_path" alt="商品图片" />
              </div>
              <!--            商品信息-->
              <div class="info">
                <div class="name">{{ item.goods[0].name }}</div>
                <div class="button">
                  <van-button
                    icon="search"
                    color="#7232dd"
                    plain
                    round
                    size="mini"
                    @click="Goto(item._id)"
                  >
                    查看评价
                  </van-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!user" class="goLogin">请先登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Evaluation",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      alrList: [],
      name: 1
    };
  },
  methods: {
    onClick(name) {
      this.name = name;
    },
    Goto(_id) {
      this.$router.push({
        name: "evaluationdetails",
        query: { _id: _id }
      });
    },
    goto(item) {
      this.$router.push({ name: "evaluationone", query: { data: item } });
    },
    goTo(path) {
      this.$router.push(path);
    },
    //  查询待评价
    async sendEva() {
      try {
        let res = await this.$api.tobeEvaluated(1);
        this.list = res.data.list;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //  查询已评价
    async sendAlready() {
      try {
        let res = await this.$api.alreadyEvaluated(1);
        this.alrList = res.data.list;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化
      new BScroll(this.$refs.wrapper);
    });
    this.sendEva();
    this.sendAlready();
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
.evaluation {
  background: white;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
/*背景图样式*/
.bgImg {
  position: fixed;
  top: 46px;
  z-index: 10;
  img {
    width: 100%;
  }
}
/*  标签页样式*/
.tabs {
  width: 90%;
  padding: 0 20px;
  position: fixed;
  top: 248px;
  z-index: 10;
  .tab {
    border-radius: 4px;
    box-shadow: 0 0 5px #888888;
  }
}

/*父盒子样式*/
.wrap {
  width: 100%;
  height: 10px;
  position: fixed;
  top: 288px;
  .cont {
    width: 100%;
    padding-bottom: 200px;
    /*列表样式*/
    .tobeEva {
      width: 100%;
      background: white;
      padding-top: 10px;
      .item {
        /*商品详情*/
        padding: 0 10px 10px 10px;
        margin-top: 10px;
        border-bottom: 1px solid #f2f2f2;
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
              font-size: 13px;
            }
            .button {
              text-align: right;
              margin-top: 50px;
              .van-button {
                width: 100px;
              }
            }
          }
        }
      }
    }
    .goLogin {
      text-align: center;
      margin-top: 80px;
      color: #ff6c6c;
    }
  }
}
</style>
