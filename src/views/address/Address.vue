<template>
  <div class="address">
    <!--    标题-->
    <van-nav-bar title="地址列表" left-arrow @click-left="goTo('/order')" />
    <div v-if="user">
      <!-- 地址列表 -->
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
      <!--    无收货地址时-->
      <div class="text" v-if="list.length === 0">暂无收货地址~~</div>
    </div>
    <div v-else class="goLogin" @click="goTo('/loginregistration')">
      请先登录
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      goMy: false
    };
  },
  // 组件内路由守卫
  //不同的页面访问地址列表，返回相应的页面
  beforeRouteLeave(to, from, next) {
    if (this.goMy) {
      this.goMy = false;
      next("/my");
    } else {
      next();
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    back() {
      this.$router.go(-1);
    },
    //获取地址
    async sendAddress() {
      try {
        let res = await this.$api.getAddress();
        this.list = res.address;
        //数组中的对象可以直接改变，不用新的数组接收
        this.list.map((item, index) => {
          this.$set(item, "id", index + 1);
          if (item.isDefault === true) {
            this.chosenAddressId = item.id;
          }
          if (item.address === this.$route.query.address) {
            this.chosenAddressId = item.id;
          }
        });
        console.log(res, this.list);
      } catch (e) {
        console.log(e);
      }
    },
    // 新增地址
    onAdd() {
      this.$router.push("/addressEdit");
    },
    // 编辑地址
    onEdit(item) {
      this.$router.push({ name: "addressEdit", query: { address: item } });
    },
    // 选中地址
    onSelect(item) {
      this.chosenAddressId = item.id;
      this.$router.push({ name: "order", query: { addressSelect: item } });
    }
  },
  mounted() {
    this.sendAddress();
    this.chosenAddressId = this.$route.query.id;
    if (this.$route.query.goMy) {
      this.goMy = this.$route.query.goMy;
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
.address {
  background: white;
  height: 100vh;
  .text {
    position: absolute;
    top: 100px;
    left: 130px;
    color: #f9cc9d;
    z-index: 10;
  }
  .goLogin {
    text-align: center;
    margin-top: 40px;
    color: #ff6c6c;
  }
}
</style>
