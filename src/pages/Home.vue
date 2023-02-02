<template>
  <!-- 页面布局 -->
  <el-container>
    <el-container>
      <el-aside :width="collapse ? '80px' : '200px'">
        <div class="aside_head">
          <img src="../assets/img/elogo.png" alt="" />
          <span>嗨购商城</span>
        </div>
        <el-menu
          :default-active="activeItem"
          background-color="#192a5e"
          text-color="#fff"
          active-text-color="#20a0ff"
          :collapse-transition="false"
          :collapse="collapse"
          router
          unique-opened
        >
          <el-menu-item index="/welcome" @click="setNavState('/welcome')">
            <template>
              <i class="iconfont icon-shouyeshouye"></i>
              <span style="margin-left: 5px">首页</span>
            </template>
          </el-menu-item>
          <el-submenu
            :index="item.id.toString()"
            v-for="item in menu"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span style="margin-left: 5px">{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="setNavState(`${subItem.path}`)"
            >
              <template slot="title">
                <i class="iconfont icon-yuanquan"></i>
                <span style="margin-left: 5px">{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i
            :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="collapse = !collapse"
          ></i>
          <span>嗨购商城</span>
          <el-dropdown>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <el-dropdown-menu slot="dropdown" class="drop-menu">
              <div class="admin">管理员: admin</div>
              <div class="nicheng">昵称: 十三</div>
              <el-tag type="primary" class="tag" size="small" @click="logOut">退出</el-tag>
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
import menu from "../assets/js/index";
export default {
  name: "Home",
  data() {
    return {
      // 控制是否折叠
      collapse: false,
      // 存储当前的index
      activeItem: "/welcome",
      menu,
    };
  },
  methods: {
    logOut() {
      // 清空token
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 将当前的index存储到sessionStorage中
    setNavState(activeItem) {
      window.sessionStorage.setItem("activeItem", activeItem);
      this.activeItem = activeItem;
    },
  },
  created() {
    this.activeItem = window.sessionStorage.getItem("activeItem");
  },
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
.drop-menu {
  position: relative;
  width: 200px;
  height: 100px;
  background-color: #3c5da5;
  color: #fff;
  font-weight: 700;
  .tag {
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
  }
  .admin {
    position: absolute;
    left: 10px;
    top: 10px
  }
  .nicheng {
    position: absolute;
    left: 10px;
    top: 50px
  }
}
</style>