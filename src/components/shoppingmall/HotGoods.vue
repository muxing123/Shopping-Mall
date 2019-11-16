<template>
  <div class="hotGoods">
    <div v-for="(item, index) in hotgoods" :key="index" class="item" @click="goTo(item)">
      <img :src="item.image" alt="" /><br />
      <div class="text">{{ item.name }}</div>
      <div class="cont-price">
        <span class="mallPrice">￥{{ item.mallPrice }}</span>
        <span class="price">{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotGoods",
  components: {},
  props: {
    hotgoods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    goTo(item) {
      this.$router.push({ name: "goods", query: { id: item.goodsId } });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.hotGoods {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 49%;
    background: white;
    border-top: 1px solid #f2f2f2;
    border-left: 1px solid #f2f2f2;
    img {
      width: 100%;
    }
    .text {
      padding: 0 5px;
      color: red;
      overflow: hidden;
      height: 20px;
      line-height: 20px;
    }
    .cont-price {
      text-align: center;
      margin: 3px 0;
      .mallPrice {
        color: red;
      }
      .price {
        font-size: 12px;
        color: grey;
        text-decoration: line-through;
        margin-left: 5px;
      }
    }
  }
}
</style>
