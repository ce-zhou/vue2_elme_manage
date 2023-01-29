<template>
  <!-- 页面布局 -->
  <el-container>
    <el-container>
      <el-aside :width="collapse ? '80px': '200px'">
        <div class="aside_head">
          <img src="../assets/img/elogo.png" alt="" />
          <span>嗨购商城</span>
        </div>
        <el-menu
          default-active="/welcome"
          background-color="#192a5e"
          text-color="#fff"
          active-text-color="#20a0ff"
          :collapse-transition="false"
          :collapse="collapse"
          router
          unique-opened
        >
          <el-menu-item index="/welcome">
            <i class="el-icon-menu"></i>
            <span>首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页配置</span>
            </template>
            <el-menu-item index="/swiper">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>轮播图配置</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/hot">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>热销商品配置</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/new">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>新品上线配置</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/recommend">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>为你推荐配置</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>模块管理</span>
            </template>
            <el-menu-item index="/category">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>分类管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/guest">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>会员管理</span>
              </template> </el-menu-item
            ><el-menu-item index="/order">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>订单管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/good">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/add">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>添加商品</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/account">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>修改密码</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i :class="collapse ? 'el-icon-s-unfold' :'el-icon-s-fold'" @click="collapse = !collapse"></i>
          <span>嗨购商城</span>
          <el-dropdown>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      collapse: false
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-menu {
  border-right: 0;
}
.el-header {
  display: flex;
  position: relative;
  align-items: center;
  height: 80px !important;
  background-color: #eef4f9;
  i {
    color: #666;
    cursor: pointer;
    margin-right: 15px;
  }
  span {
    color: #3963bc;
    font-size: 14px;
    margin-right: 15px;
  }
  .el-dropdown {
    position: absolute;
    right: 7px;
  }
}
.el-aside {
  background-color: #192a5e;
}
.aside_head {
  display: flex;
  align-items: center;
  height: 80px;
  background-color: #122150;
  img {
    height: 100%;
  }
  span {
    color: #fff;
    font-size: 24px;
    margin-left: 5px;
  }
}
.el-avatar {
  width: 45px;
  height: 45px;
}
</style>