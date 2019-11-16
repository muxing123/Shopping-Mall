<template>
  <div class="loginRegistration">
    <!--    返回·箭头-->
    <div class="arrow" @click="back">
      <van-icon name="arrow-left" color="white" />
    </div>
    <!--    注册表单-->
    <div class="form">
      <!--    文字标题-->
      <div class="title">
        登录/注册
      </div>
      <van-cell-group>
        <van-field
          v-model="username"
          label="USERNAME"
          placeholder="请输入用户名"
          required
          error
          clearable
        />
        <van-field
          v-model="password"
          type="password"
          label="PASSWORD"
          placeholder="请输入密码"
          required
          error
          clearable
        />
        <div class="codeList">
          <van-field
            v-model="code"
            label="验证码"
            placeholder="请输入验证码"
            required
            error
            clearable
          />
          <div class="code" v-html="data" @click="getAverify"></div>
        </div>
      </van-cell-group>
      <div class="button">
        <van-button type="primary" class="login" @click="sendLogin">
          登录
        </van-button>
        <van-button
          type="danger"
          class="registration"
          @click="sendRegistration"
        >
          注册
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "LoginRegistration",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      code: "",
      data: ""
    };
  },
  methods: {
    //获取验证码
    //没有局部引入axios，而是全局引入，所以是之前的方法
    getAverify() {
      this.$axios
        .get(`/api/verify?mt=${Math.random()}`)
        .then(res => {
          this.data = res.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //注册请求
    async sendRegistration() {
      try {
        let res = await this.$api.register(
          this.username,
          this.password,
          this.code
        );
        console.log(res);
        if (res.code === 200) {
          this.$store.state.username = res.userInfo.nickname;
          Toast.success(res.msg);
          this.$router.push("/my");
        } else {
          Toast.fail(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //登录请求
    async sendLogin() {
      try {
        let res = await this.$api.login(
          this.username,
          this.password,
          this.code
        );
        console.log(res);
        if (res.code === 200) {
          Toast.success(res.msg);
          localStorage.setItem(
            res.userInfo.nickname,
            JSON.stringify({ userInfo: res.userInfo })
          );
          localStorage.setItem(
            "user",
            JSON.stringify({ userInfo: res.userInfo })
          );
          this.$store.state.username = res.userInfo.nickname;
          this.$store.state.userInfo = res.userInfo;
          this.$router.push("/my");
        } else {
          Toast.fail(res.msg);
          this.getAverify();
        }
      } catch (e) {
        console.log(e);
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.loginRegistration {
  background: url("../../icons/login.jpg") no-repeat;
  width: 100vw;
  height: 100vh;
  /*  返回箭头*/
  .arrow {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
    .van-icon {
      position: relative;
      top: 1px;
      right: 1px;
    }
  }
  /*  表单样式*/
  .form {
    padding: 0 10px;
    padding-top: 150px;
    .title {
      background: white;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      font-weight: bold;
      padding: 20px;
    }
    .codeList {
      display: flex;
      .code {
        position: relative;
        top: 2px;
        right: 5px;
      }
    }
  }
  /*  按钮*/
  .button {
    background: white;
    height: 100px;
    line-height: 100px;
    .login {
      margin-left: 20px;
    }
    .registration {
      margin-left: 10px;
    }
  }
}
</style>
