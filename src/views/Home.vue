<template>
  <div class="home">
    <router-view></router-view>
    <div class="bottom">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o" to="/shoppingmall">
          商城
        </van-tabbar-item>
        <van-tabbar-item icon="wap-nav" to="/sort">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" to="/shoppingcart">
          购物车
        </van-tabbar-item>
        <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      active: 0
    };
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.bottom {
}
</style>
