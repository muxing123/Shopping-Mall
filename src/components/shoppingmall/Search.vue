<template>
  <div class="Search">
    <!--    搜索商品展示-->
    <div v-if="value !== ''">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="goto(item.id)"
      >
        <div class="img">
          <img :src="item.image_path" :alt="item.name" />
        </div>
        <div class="text">
          <div class="name" v-html="item.name"></div>
          <span class="present_price">￥{{ item.present_price }} </span>
          <span class="orl_price">{{ item.orl_price }}</span>
        </div>
      </div>
    </div>
    <!--    搜索历史-->
    <div v-else-if="historyList.length !== 0 && username" class="history">
      <div class="top">
        <div>搜索历史</div>
        <van-icon name="delete" @click="del" />
      </div>
      <div class="button">
        <van-button
          round
          color="burlywood"
          size="mini"
          v-for="(item, index) in historyList"
          :key="index"
          @click="send(item)"
        >
          {{ item }}
        </van-button>
      </div>
    </div>
    <!--  暂无搜索历史  -->
    <div v-else class="noHave">暂无搜索历史</div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "Search",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      historyList: [],
      historyName: ""
    };
  },
  methods: {
    //  跳转商品详情页面并且添加历史记录
    goto(id) {
      this.$router.push({ name: "goods", query: { id: id } });
      if (this.username) {
        if (this.historyList.indexOf(this.value) === -1 && this.value !== "") {
          this.historyList.push(this.value);
        }
        localStorage.setItem(
          this.historyName,
          JSON.stringify({ list: this.historyList })
        );
      }
    },
    //  传递value值
    send(item) {
      this.$emit("send", item);
    },
    //  删除搜索历史
    del() {
      Dialog.confirm({
        message: "是否删除搜索历史"
      })
        .then(() => {
          this.historyList = [];
          localStorage.removeItem(this.historyName);
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    this.historyName = this.username + "history";
    let history = JSON.parse(localStorage.getItem(this.historyName));
    if (history) {
      this.historyList = history.list;
    }
    console.log(this.historyList);
  },
  created() {},
  filters: {},
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Search {
  .item {
    display: flex;
    padding: 8px 0 8px 15px;
    .img {
      /*width: 30%;*/
      border: 1px solid #f2f2f2;
      img {
        width: 80px;
      }
    }
    .text {
      padding: 0 10px;
      color: red;
      .name {
        color: black;
        margin-bottom: 20px;
        .mod {
          color: red;
        }
      }
      .present_price {
        color: red;
        font-weight: bold;
      }
      .orl_price {
        font-size: 12px;
        color: #555555;
        text-decoration: line-through;
      }
    }
  }
  /*  搜索历史*/
  .history {
    .top {
      display: flex;
      padding: 10px;
      justify-content: space-between;
    }
    .button {
      padding: 10px;
    }
  }
  /*  暂无搜索历史*/
  .noHave {
    padding: 10px;
    text-align: center;
    margin-top: 100px;
  }
}
</style>
