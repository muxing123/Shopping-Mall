<template>
  <div class="addressEdit">
    <!--    标题-->
    <van-nav-bar title="编辑地址" left-arrow @click-left="goTo('/address')" />
    <!-- 地址编辑 -->
    <van-address-edit
      :address-info="editingAddress"
      :area-list="areaList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-default="sendDefault"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "AddressEdit",
  components: {},
  props: {},
  data() {
    return {
      editingAddress: {},
      areaList: {},
      address: "",
      id: ""
    };
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    //设置默认地址
    async sendDefault(value) {
      if (this.editingAddress !== undefined) {
        if (value) {
          try {
            let res = await this.$api.setDefaultAddress(
              this.editingAddress.uid
            );
            console.log(res);
            if (res.code === 200) {
              Toast.success(res.msg);
            } else {
              Toast.fail(res.msg);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    },
    // 保存地址
    async onSave(content) {
      this.address =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      this.$set(content, "address", this.address);
      this.editingAddress === undefined
        ? ""
        : this.$set(content, "id", this.editingAddress._id);
      console.log(content);
      try {
        let res = await this.$api.postAddress({ ...content });
        console.log(res);
        if (res.code === 200) {
          Toast.success(res.msg);
          this.$router.push("/address");
        } else {
          Toast.fail(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 删除地址
    async onDelete() {
      try {
        let res = await this.$api.deleteAddress(this.editingAddress._id);
        console.log(res);
        if (res.code === 200) {
          Toast.success(res.msg);
          this.$router.push("/address");
        } else {
          Toast.fail(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.editingAddress = this.$route.query.address;
    this.areaList = this.$area;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.addressEdit {
  background: white;
  height: 100vh;
}
</style>
