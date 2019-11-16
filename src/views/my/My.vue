<template>
  <div class="my">
    <!--    标题-->
    <div class="title">
      会员中心
    </div>
    <!--    设置弹出层-->
    <div class="set">
      <van-cell is-link @click="showPopup">
        <van-icon name="setting" v-if="user" />
      </van-cell>
      <!--      弹出层-->
      <van-popup
        v-model="show"
        position="right"
        :closeable="true"
        close-icon="arrow-left"
        close-icon-position="top-left"
        :style="{ width: '100%', height: '100%' }"
      >
        <div class="height"></div>
        <div class="title">个人资料</div>
        <div class="github">github</div>
        <div class="headImg">
          <div>头像</div>
          <div class="right">
            <div class="bgImg">
              <img :src="this.userInfo.avatar" alt="头像" />
            </div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div>
          <van-cell-group>
            <van-field
              v-model="this.userInfo.username"
              clearable
              label="用户名"
              placeholder="请输入用户名"
            />
            <van-field
              v-model="this.userInfo.nickname"
              clearable
              label="昵称"
              placeholder="请输入昵称"
            />
            <van-field
              v-model="this.userInfo.gender"
              clearable
              label="性别"
              placeholder="请输入性别"
            />
            <van-field
              v-model="value"
              clearable
              label="邮箱"
              placeholder="请输入邮箱"
            />
            <!--            选择时间-->
            <van-field
              v-model="date"
              clearable
              label="出生年月"
              placeholder="请输入出生年月"
              @click="showTwo"
            />
            <van-popup
              v-model="showPop"
              position="bottom"
              :style="{ width: '100%', height: '40%' }"
            >
              <van-datetime-picker
                v-model="datePop"
                type="date"
                @confirm="set"
                @cancel="showTwo"
              />
            </van-popup>
          </van-cell-group>
        </div>
        <!--        保存-->
        <div class="save">
          <van-button type="primary" size="large" @click="revise"
            >保存</van-button
          >
        </div>
        <!--        取消-->
        <div class="esc">
          <van-button type="default" size="large" @click="showPopup"
            >取消</van-button
          >
        </div>
      </van-popup>
    </div>
    <!--    用户主页-->
    <div class="homepage">
      <div>
        <div class="userImg" v-if="user"></div>
        <div class="img" v-else></div>
      </div>
      <div>
        <div class="userText" v-if="user">
          <div class="top">欢迎您:{{ user }}</div>
          <div @click="sendLoginOut">退出登录</div>
        </div>
        <div class="text" @click="goTo('/loginregistration')" v-else>
          登录/注册
        </div>
      </div>
    </div>
    <!--    横向导航-->
    <div>
      <div class="userNav" v-if="user">
        <van-grid :column-num="5">
          <van-grid-item icon="paid" text="待收款" @click="goto(1)" />
          <van-grid-item icon="free-postage" text="待发货" @click="goto(2)" />
          <van-grid-item icon="points" text="待收货" @click="goto(3)" />
          <van-grid-item
            icon="thumb-circle-o"
            text="评价"
            :info="count === 0 ? '' : count"
            to="evaluation"
          />
          <van-grid-item icon="like-o" text="已完成" @click="goto(4)" />
        </van-grid>
      </div>
      <div v-else>
        <van-grid :column-num="5">
          <van-grid-item icon="paid" text="待收款" @click="goto(1)" />
          <van-grid-item icon="free-postage" text="待发货" @click="goto(2)" />
          <van-grid-item icon="points" text="待收货" @click="goto(3)" />
          <van-grid-item icon="thumb-circle-o" text="评价" to="evaluation" />
          <van-grid-item icon="like-o" text="已完成" @click="goto(4)" />
        </van-grid>
      </div>
    </div>
    <!--    纵向导航-->
    <div class="Lnav">
      <div class="item one">
        <div class="left">
          <van-icon name="records" />
          <div>全部订单</div>
        </div>
        <van-icon name="arrow" @click="goTo('/ordercomplete')" />
      </div>
      <div class="item two">
        <div class="left">
          <van-icon name="star-o" />
          <div>收藏商品</div>
        </div>
        <van-icon name="arrow" @click="goTo('/collection')" />
      </div>
      <div class="item">
        <div class="left">
          <van-icon name="location-o" />
          <div>地址管理</div>
        </div>
        <van-icon name="arrow" @click="GoTo" />
      </div>
      <div class="item">
        <div class="left">
          <van-icon name="eye-o" />
          <div>最近浏览</div>
        </div>
        <van-icon name="arrow" @click="goTo('/recently')" />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      value: "",
      showPop: false,
      date: "",
      datePop: "",
      userInfo: {},
      year: "",
      month: "",
      day: "",
      goMy: true
    };
  },
  methods: {
    //  查询待评价
    async sendEva() {
      try {
        let res = await this.$api.tobeEvaluated(1);
        this.$store.state.evaCount = res.data.count;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //控制地址页面跳转
    GoTo() {
      this.$router.push({ name: "address", query: { goMy: this.goMy } });
    },
    //跳转到订单页面
    goto(num) {
      this.$router.push({ name: "myorder", query: { active: num } });
    },
    //控制弹出层开关
    showPopup() {
      this.show = !this.show;
    },
    showTwo() {
      this.showPop = !this.showPop;
    },
    set(value) {
      this.date = this.$dayjs(value).format("YYYY年MM月DD日");
      this.year = Number(this.date.slice(0, 4));
      this.month = Number(this.date.slice(5, 7));
      this.day = Number(this.date.slice(8, 10));
      this.showPop = !this.showPop;
      console.log(this.year, this.month, this.day);
    },
    //修改
    async revise() {
      try {
        let res = await this.$api.saveUser({
          gender: this.userInfo.gender,
          year: this.year,
          month: this.month,
          day: this.day,
          id: this.userInfo._id,
          nickname: this.userInfo.nickname
        });
        if (res.code === 200) {
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //请求时间和用户信息
    async sendDate() {
      try {
        let res = await this.$api.user();
        this.date = `${res.userInfo.year}年${res.userInfo.month}月${res.userInfo.day}日`;
        this.userInfo = res.userInfo;
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    //退出
    async sendLoginOut() {
      try {
        let res = await this.$api.loginOut();
        console.log(res);
        if (res.code === 0) {
          Toast.success(res.msg);
          this.$store.state.username = "";
          this.$store.state.userInfo = "";
          localStorage.removeItem(this.userInfo.nickname);
          localStorage.removeItem("user");
        } else {
          Toast.fail(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    if (this.user) {
      this.sendDate();
    }
    this.sendEva();
  },
  created() {},
  filters: {},
  computed: {
    user() {
      return this.$store.state.username;
    },
    count() {
      return this.$store.state.evaCount;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.my {
  background: white;
  height: 100vh;
  /*标题样式*/
  .title {
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
  }
  /*设置样式*/
  .set {
    position: absolute;
    top: 40px;
    left: 300px;
    .van-icon {
      z-index: 10;
      color: #f2f2f2;
    }
    .van-cell__right-icon {
      display: none;
    }
    .height {
      height: 10px;
    }
    .title {
      text-align: center;
    }
    .github {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 16px;
    }
    .headImg {
      display: flex;
      justify-content: space-between;
      height: 100px;
      line-height: 100px;
      border-bottom: 1px solid #f2f2f2;
      padding: 0 16px;
      .right {
        display: flex;
        .bgImg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          img {
            width: 100%;
            border-radius: 50%;
            position: relative;
            top: 10px;
            right: 20px;
            /*border: 1px solid red;*/
          }
        }
        .van-icon {
          color: black;
          position: relative;
          top: 40px;
        }
      }
    }
    /*  保存*/
    .save {
      margin-top: 20px;
      padding: 0 20px;
    }
    /*  取消*/
    .esc {
      margin-top: 20px;
      padding: 0 20px;
    }
  }
  /*用户主页*/
  .homepage {
    background: indianred;
    text-align: center;
    position: relative;
    padding-top: 30px;
    padding-bottom: 30px;
    /*用户登录时*/
    .userImg {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: url("../../icons/tianzhongtwo.png") no-repeat;
      background-size: cover;
      position: relative;
      left: 50%;
      margin-left: -50px;
    }
    .userText {
      margin-top: 20px;
      color: white;
      .top {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    /*用户未登录时*/
    .img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: url("../../icons/tianzhong.jpeg") no-repeat;
      background-size: cover;
      position: relative;
      left: 50%;
      margin-left: -50px;
    }
    .text {
      margin-top: 20px;
      color: white;
    }
  }
  /*  纵向导航栏*/
  .Lnav {
    .item {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: 1px solid #f2f2f2;
      .left {
        display: flex;
        justify-content: space-between;
        .van-icon {
          position: relative;
          top: 12px;
          margin-right: 3px;
        }
      }
      .van-icon {
        position: relative;
        top: 12px;
      }
    }
    .one {
      margin-bottom: 10px;
    }
    .two {
      border-top: 1px solid #f2f2f2;
    }
  }
}
</style>
