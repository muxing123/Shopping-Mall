<template>
  <div class="evaluationone">
    <!--    标题-->
    <div class="title">
      <van-nav-bar
        title="评价中心"
        left-arrow
        @click-left="goTo('/evaluation')"
      />
    </div>
    <!--    商品展示-->
    <div class="show">
      <div class="img">
        <img :src="data.image_path" alt="商品图片" />
      </div>
      <div class="right">
        <div class="text">商品评分</div>
        <div class="score">
          <van-rate
            v-model="value"
            :size="25"
            color="red"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
    </div>
    <!--    购物感受-->
    <div class="feel">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="5"
          autosize
          type="textarea"
          placeholder="说说你的购物感受吧~~"
        />
      </van-cell-group>
    </div>
    <!--    图片上传-->
    <div class="upload">
      <van-uploader :after-read="afterRead" />
    </div>
    <!--    匿名评价-->
    <div class="anonymous">
      <van-radio-group v-model="anonymous">
        <van-radio :name="true">匿名评价</van-radio>
      </van-radio-group>
    </div>
    <!--    提交-->
    <div class="button">
      <van-button type="primary" @click="sendEvaOne">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "EvaluationOne",
  components: {},
  props: {},
  data() {
    return {
      value: 5,
      data: {},
      message: "",
      anonymous: false,
      image: []
    };
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // this.image.push(file);
      console.log(file);
    },
    //提交
    async sendEvaOne() {
      try {
        let res = await this.$api.comment({
          id: this.data.cid,
          rate: this.value,
          content: this.message,
          anonymous: this.anonymous,
          _id: this.data._id,
          order_id: this.data.order_id,
          image: this.image
        });
        if (res.code === 200) {
          Toast.success(res.msg);
          this.$router.push("/evaluation");
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
    this.data = this.$route.query.data;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.evaluationone {
  background: white;
  height: 100vh;
  /*商品展示*/
  .show {
    display: flex;
    background: white;
    .img {
      width: 100px;
      img {
        width: 100%;
      }
    }
    .right {
      margin-left: 20px;
      .text {
        margin-top: 20px;
      }
      .score {
        margin-top: 20px;
      }
    }
  }
  /*  购物感受*/
  .van-cell {
    background: #f2f2f2;
  }
  .van-field__control {
    background: #f2f2f2;
  }
  /*图片上传*/
  .upload {
    background: #f2f2f2;
    .van-uploader {
      margin-left: 20px;
      background: #f2f2f2;
    }
  }
  /*  匿名评价*/
  .anonymous {
    padding: 10px;
    background: white;
  }
  /*  提交*/
  .button {
    padding: 0 20px;
    margin-top: 30px;
    background: white;
    .van-button {
      width: 100%;
    }
  }
}
</style>
