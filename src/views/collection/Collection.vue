<template>
  <div class="collection">
    <!--    标题-->
    <van-nav-bar title="我的收藏" left-arrow @click-left="goTo('/my')" />
    <!--    收藏列表-->
    <div class="collect" v-if="user">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="img">
          <img :src="item.image_path" :alt="item.name" />
        </div>
        <div class="text">
          <div class="name">{{ item.name }}</div>
          <span class="present_price">￥{{ item.present_price }} </span>
          <div class="close">
            <van-icon name="close" @click="canaelCollect(item.cid)" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="goLogin">请先登录</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Collection",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    //  跳转
    goTo(path) {
      this.$router.push(path);
    },
    //查询我的收藏
    async sendCollect() {
      try {
        let res = await this.$api.getCollection(1);
        this.list = res.data.list;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //  取消收藏
    async canaelCollect(id) {
      try {
        let res = await this.$api.cancelCollection(id);
        if (res.code === 200) {
          Toast.success(res.msg);
          this.sendCollect();
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
    this.sendCollect();
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
.collection {
  background: white;
  height: 100vh;
  /*收藏样式*/
  .collect {
    .item {
      display: flex;
      padding: 8px 10px 8px 15px;
      background: white;
      border-bottom: 1px solid #f2f2f2;
      .img {
        border: 1px solid #f2f2f2;
        img {
          width: 80px;
        }
      }
      .text {
        padding: 0 10px;
        width: 70%;
        .name {
          margin-bottom: 20px;
        }
        .present_price {
          color: red;
          font-weight: bold;
        }
        .close {
          text-align: right;
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
