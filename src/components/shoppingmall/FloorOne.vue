<template>
  <div class="floorOne">
    <div class="top">
      <div class="left" v-if="floorOne[0]" @click="goTo(floorOne[0])">
        <img :src="floorOne[0].image" alt="商品图片" />
      </div>
      <div class="right" v-if="floorOne[0]">
        <div v-for="(item, index) in floorOne.slice(1, 3)" :key="index" @click="goTo(item)">
          <img :src="item.image" alt="商品图片" />
        </div>
      </div>
    </div>
    <div class="bottom" v-if="floorOne[0]">
      <div v-for="(item, index) in floorOne.slice(3)" :key="index" class="item" @click="goTo(item)">
        <img :src="item.image" alt="商品图片" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FloorOne",
  components: {},
  props: {
    floorOne: {
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
.floorOne {
  .top {
    display: flex;
    .left {
      width: 50%;
      img {
        width: 100%;
      }
    }
    .right {
      width: 50%;
      img {
        width: 100%;
      }
    }
  }
  .bottom {
    display: flex;
    .item {
      width: 50%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
