<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分页 -->
    <el-card>
      <el-button type="success" size="mini" @click="handleSolve">
        <i class="el-icon-plus icon"></i>
        <span>解除禁用</span>
      </el-button>
      <el-button type="danger" size="mini" @click="handleForbid">
        <i class="el-icon-delete icon"></i>
        <span>禁用账户</span>
      </el-button>
      <!-- 表格区域 -->
      <el-table :data="guestList" style="width: 100%" ref="table" @selection-change="handleSelectionChange">
        <!-- 多选 -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="loginName" label="登录名"></el-table-column>
        <el-table-column prop="lockedFlag" label="身份状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.lockedFlag == 0"
              >正常</el-tag
            >
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isDeleted" label="是否注销">
          <template slot-scope="scope">
            <el-tag
              type="success"
              v-if="scope.row.isDeleted == 0 && scope.row.lockedFlag == 0"
              >正常</el-tag
            >
            <el-tag
              type="danger"
              v-else-if="scope.row.isDeleted == 0 && scope.row.lockedFlag == 1"
              >正常</el-tag
            >
            <el-tag type="danger" v-else>注销</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Guest",
  data() {
    return {
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      guestList: [],
      total: 0,
      multipleSelection: []
    };
  },
  methods: {
    // 获取会员数据
    async getGuestList() {
      const res = await this.$http.guest.getGuestList({
        params: this.queryInfo,
      })
      this.guestList = res.data.list;
      this.total = res.data.total;
    },
    // 解除禁用
    async handleSolve() {
        if (this.multipleSelection.length === 0) {
            this.$message.error('请选择多选项')
        } else {
            await this.$http.guest.handleSolve({
                ids: this.multipleSelection.map(item => item.userId)
            })
            this.$message.success('解除成功')
            this.getGuestList()
        }
    },
    // 禁用账户
    async handleForbid() {
        if (this.multipleSelection.length === 0) {
            this.$message.error('请选择多选项')
        } else {
            await this.$http.guest.handleForbid({
                ids: this.multipleSelection.map(item => item.userId)
            })
            this.$message.success('禁用成功')
            this.getGuestList()
        }
    },
    handleSelectionChange(val) {
        this.multipleSelection = val
    }
  },
  created() {
    this.getGuestList();
  },
};
</script>

<style lang="less" scoped>
.icon {
  margin-right: 2px;
}
</style>