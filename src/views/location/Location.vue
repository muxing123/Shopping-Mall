<template>
  <div class="location">
    <div class="title">
      <van-icon name="arrow-left" @click="goTo('/shoppingmall')" />
      城市列表
    </div>
    <!--    搜索-->
    <van-search
      placeholder="请输入城市关键字"
      v-model="value"
      background="#f2f2f2"
    />
    <div v-if="value === ''">
      <!--    当前城市-->
      <div class="current">
        <div class="currentTitle">当前城市</div>
        <div class="text">
          <div class="city" @click="goto(city)">{{ city }}</div>
        </div>
      </div>
      <!--    热门城市-->
      <div class="current">
        <div class="currentTitle">热门城市</div>
        <div class="textList">
          <div
            class="city"
            v-for="(item, index) in hotCity"
            :key="index"
            @click="goto(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!--    地址索引栏-->
      <van-index-bar>
        <div v-for="(item, index) in cities" :key="index">
          <van-index-anchor :index="index" />
          <van-cell
            v-for="it in item"
            :title="it.name"
            :key="it.id"
            @click="goto(it.name)"
          />
        </div>
      </van-index-bar>
    </div>
    <div v-if="value !== ''">
      <div
        v-for="item in arr"
        :key="item.id"
        class="searchCity"
        @click="goto(item.name)"
      >
        {{ item.name }}
      </div>
      <div v-if="arr.length === 0">城市不存在</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      hotCity: [],
      cities: {},
      arr: []
    };
  },
  methods: {
    goto(item) {
      this.$router.push({ name: "shoppingmall", query: { city: item } });
    },
    goTo(path) {
      this.$router.push(path);
    },
    getCity() {
      this.hotCity = this.$city.data.hotCities;
      this.cities = this.$city.data.cities;
    }
  },
  mounted() {
    this.getCity();
  },
  created() {},
  filters: {},
  computed: {
    city() {
      return this.$store.state.city;
    }
  },
  watch: {
    value(val) {
      // 说明输入框有值
      if (val.trim() !== "") {
        if (val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90) {
          val = val.toLowerCase();
        }
        let list = [];
        for (let i in this.cities) {
          this.cities[i].map(item => {
            if (item.name.includes(val) || item.spell.includes(val)) {
              list.push(item);
            }
          });
        }
        this.arr = list;
        // this.arr = this.cities.filter(item => {
        //   return JSON.stringify(item).includes(val);
        //   // return JSON.stringify(item).indexOf(val) > 0
        //   // return JSON.stringify(item).indexOf(val) !== -1
        // });
      } else {
        this.arr = [];
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.location {
  .title {
    background: white;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    .van-icon {
      position: absolute;
      top: 12px;
      left: 10px;
    }
  }
  /*搜索样式*/
  .van-search__content,
  .van-search__content--square {
    background: white;
  }
  /*城市样式*/
  .current {
    .currentTitle {
      padding: 5px 10px 10px;
    }
    .text {
      background: white;
      padding: 10px;
      .city {
        width: 30%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid grey;
        border-radius: 4px;
      }
    }
    .textList {
      background: white;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      .city {
        width: 30%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid grey;
        border-radius: 4px;
        margin-left: 6px;
        margin-bottom: 10px;
      }
    }
  }
  /*索引栏样式*/
  .searchCity {
    background: white;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
    padding: 0 0 5px 10px;
  }
  /*.van-index-bar__index {*/
  /*  margin-top: 5px;*/
  /*  color: skyblue;*/
  /*}*/
}
</style>
