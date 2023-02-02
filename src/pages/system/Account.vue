<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        ref="form1"
        :model="accountList"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名: " prop="loginUserName">
          <el-input
            style="width: 300px"
            v-model="accountList.loginUserName"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称: " prop="nickName">
          <el-input
            style="width: 300px"
            v-model="accountList.nickName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitName">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="account-card">
      <el-form
        ref="form2"
        :model="accountList"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="原密码: " prop="oldpass">
          <el-input
            style="width: 300px"
            v-model="accountList.oldpass"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码: " prop="newpass">
          <el-input
            style="width: 300px"
            v-model="accountList.newpass"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitPass">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: "Account",
  data() {
    return {
      accountList: {
        loginUserName: "",
        nickName: "",
        oldpass: "",
        newpass: "",
      },
      rules: {
        loginUserName: [
          { required: "true", message: "登录名不能为空", trigger: ["change"] },
        ],
        nickName: [
          { required: "true", message: "昵称不能为空", trigger: ["change"] },
        ],
        oldpass: [
          { required: "true", message: "原密码不能为空", trigger: ["blur"] },
        ],
        newpass: [
          { required: "true", message: "新密码不能为空", trigger: ["blur"] },
        ],
      },
    };
  },
  methods: {
    async getAccount() {
      const res = await this.$http.account.getAccount();
      //   console.log(res);
      this.accountList = res.data;
    },
    submitName() {
      this.$refs.form1.validate(async (valid) => {
        if (!valid) return;
        let data = {
          loginUserName: this.accountList.loginUserName,
          nickName: this.accountList.nickName,
        }
        await this.$http.account.submitName(data)
        this.$message.success("修改成功");
        window.location.reload();
      });
    },
    submitPass() {
      this.$refs.form2.validate(async (valid) => {
        if (!valid) return
        let data = {
          originalPassword: md5(this.accountList.oldpass),
          newPassword: md5(this.accountList.newpass),
        }
        await this.$http.account.submitPass(data);
        this.$message.success("修改成功");
        window.location.reload();
      });
    },
  },
  created() {
    this.getAccount();
  },
};
</script>

<style lang="less" scoped>
.account-card {
  margin-top: 20px;
}
</style>