<template>
  <div>
    <div class="box">
      <!-- 图标和标题 -->
      <div class="head">
        <img src="../assets/img/elogo.png" alt="" />
        <div>
          <span class="shop_font">外卖商城</span>
          <span class="manage_font">vue2.0 后台管理系统</span>
        </div>
      </div>
      <!-- 表单 -->
      <el-form
        label-width="100px"
        label-position="top"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" show-password v-model="loginForm.password"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: "Login",
  data () {
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单验证对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods: {
    // 点击重置按钮后，表单重置
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击确定按钮后，预验证，并提交信息到后台
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        let data =  {
          userName: this.loginForm.username,
          passwordMd5: md5(this.loginForm.password)
        }
        const res = await this.$http.login.login(data)
        // 登陆成功，将返回的token保存到本地
        window.sessionStorage.setItem("token", res.data)
        this.$router.push('/home')
        return this.$message.success('登陆成功')
      })
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 21px 41px 0 rgb(0 0 0 / 20%);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
  img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  div {
    display: flex;
    flex-direction: column;
    .shop_font {
      font-size: 28px;
      color: #20a0ff;
      font-weight: 700;
    }
    .manage_font {
      font-size: 12px;
      color: #999;
    }
  }
}
.el-form {
  padding: 0 63px;
}
.el-form-item {
  margin-bottom: 12px;
}
.btn {
  display: flex;
  margin-top: 25px;
  justify-content: end;
}
</style>