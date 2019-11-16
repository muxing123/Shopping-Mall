<template>
  <div class="recently">
    <!--    标题-->
    <van-nav-bar title="最近浏览" left-arrow @click-left="goTo('/my')" />
    <!--    收藏列表-->
    <div class="collect" v-if="user">
      <div class="item" v-for="(item, index) in goodsList" :key="index">
        <div class="img">
          <img :src="item.image_path" :alt="item.name" />
        </div>
        <div class="text">
          <div class="name">{{ item.name }}</div>
          <span class="present_price">￥{{ item.present_price }} </span>
          <div class="close">
            <van-icon name="close" @click="delBrowse(index)" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="goLogin" @click="goTo('/loginregistration')">
      请先登录
    </div>
  </div>
</template>

<script>
export default {
  name: "Recently",
  components: {},
  props: {},
  data() {
    return {
      goodsList: [],
      browseHistory: ""
    };
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    delBrowse(index) {
      this.goodsList.splice(index, 1);
      localStorage.setItem(this.browseHistory, JSON.stringify(this.goodsList));
    }
  },
  mounted() {
    if (this.user) {
      this.browseHistory = this.user + "browseHistory";
      let history = JSON.parse(localStorage.getItem(this.browseHistory));
      if (history) {
        this.goodsList = history;
      }
    }
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
.recently {
  background: white;
  height: 100vh;
  .collect {
    .item {
      display: flex;
      padding: 8px 10px 8px 15px;
      border-bottom: 1px solid #f2f2f2;
      background: white;
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
