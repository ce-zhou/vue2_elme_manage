<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>热销商品配置</el-breadcrumb-item>
      <el-button type="primary" size="mini" class="btn" @click="addIndex">
        <i class="el-icon-circle-plus-outline"></i>
        <span>添加</span>
      </el-button>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="indexConfigList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="configName"
          label="商品名称"
          width="140"
        ></el-table-column>
        <el-table-column label="跳转链接" width="140">
          <template slot-scope="scope">
            <a :href="scope.row.redirectUrl" class="link">{{
              scope.row.redirectUrl
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="configRank"
          label="排序值"
          width="100"
        ></el-table-column>
        <el-table-column prop="goodsId" label="商品编号"></el-table-column>
        <el-table-column prop="updateTime" label="添加时间"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editData(scope.row.configId)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteData(scope.row.configId)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNumber"
        :page-size="queryInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <AddIndexConfig ref="addIndexRef" :reload="getIndexConfig" :type="type" :configType="queryInfo.configType"/>
  </div>
</template>

<script>
import AddIndexConfig from '../../components/AddIndexConfig.vue'
export default {
  name: "IndexConfig",
  components: {AddIndexConfig},
  data() {
    return {
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
        configType: 3,
      },
      indexConfigList: [],
      total: 0,
      configTypeMap: {
        hot: 3,
        new: 4,
        recommend: 5,
      },
      type: 'add'
    };
  },
  methods: {
    // 获取当前页面数据
    async getIndexConfig() {
      const { data: res } = await this.$http.get("/indexConfigs", {
        params: this.queryInfo,
      });
      // console.log(res);
      if (res.resultCode !== 200) return this.$message.error("获取数据失败");
      this.indexConfigList = res.data.list;
      this.total = res.data.totalCount;
    },
    // 处理当前在第几页的函数
    handleCurrentChange(val) {
      this.queryInfo.pageNumber = val;
      this.getIndexConfig();
    },
    // 点击按钮，打开添加对话框
    addIndex() {
        this.type = 'add'
        this.$refs.addIndexRef.$data.addDialogVisible = true
    },
    // 点击按钮，打开修改对话框
    editData(id) {
      this.type = 'edit'
      this.$refs.addIndexRef.$data.addDialogVisible = true
      this.$bus.$emit('getEditDialog', id)
    },
    // 点击删除数据
    async deleteData(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
          /* const { data: res } = await this.$http.delete(`'/indexConfigs'/${id}`);
          if (res.resultCode !== 200) return this.$message.error("删除失败");
          this.getSwiperList();
          this.$message.success("删除成功"); */
          this.$message.error('后端接口没完成此项功能')
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    // this.queryInfo.configType = this.configTypeMap[this.$route.name]
    this.getIndexConfig();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (["hot", "new", "recommend"].includes(to.name)) {
        vm.queryInfo.configType = vm.configTypeMap[to.name]
        vm.queryInfo.pageNumber = 1
        vm.getIndexConfig()
      }
    });
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  position: relative;
}
.btn {
  position: absolute;
  right: 0;
  bottom: -5px;
}
.link {
  text-decoration: none;
  color: #409eff;
}
</style>