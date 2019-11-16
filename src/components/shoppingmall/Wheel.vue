<template>
  <div class="wheel">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in list" :key="index" @click="goTo(item)">
        <img :src="item.image" alt="轮播图" class="wheelimg" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Wheel",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    async getData() {
      try {
        let res = await this.$api.recommend();
        this.list = res.data.slides;
      } catch (e) {
        console.log(e);
      }
    },
    goTo(item) {
      this.$router.push({ name: "goods", query: { id: item.goodsId } });
    }
  },
  mounted() {
    this.getData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.wheel {
  .wheelimg {
    width: 100%;
  }
}
</style>
