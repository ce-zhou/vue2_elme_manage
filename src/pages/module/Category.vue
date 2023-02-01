<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-button type="primary" size="mini" class="btn1" @click="addCategory">
        <i class="el-icon-circle-plus-outline"></i>
        <span>添加</span>
      </el-button>
      <el-button type="success" size="mini" class="btn2" @click="goBack">
        <i class="el-icon-back"></i>
        <span>上一步</span>
      </el-button>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 列表 -->
      <el-table :data="categoryList" style="width: 100%" border stripe>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="categoryName" label="分类名称"></el-table-column>
        <el-table-column prop="categoryRank" label="排序值"></el-table-column>
        <el-table-column prop="createTime" label="添加时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editCategory(scope.row.categoryId)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="下级分类"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-arrow-down"
                size="mini"
                @click="nextLevel(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteCategory(scope.row.categoryId)"
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
    <AddCategory ref="addCategoryRef" :type="type" :reload="getCategoryList" />
  </div>
</template>

<script>
import AddCategory from "@/components/AddCategory.vue";
export default {
  name: "Category",
  components: { AddCategory },
  data() {
    return {
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
        categoryLevel: 1,
        parentId: 0,
      },
      categoryList: [],
      total: 0,
      type: "add",
    };
  },
  methods: {
    // 获取数据列表
    async getCategoryList() {
      const { level = 1, parent_id = 0 } = this.$route.query
      this.queryInfo.categoryLevel = level
      this.queryInfo.parentId = parent_id
      const { data: res } = await this.$http.get("/categories", {
        params: this.queryInfo,
      });
      console.log(this);
      if (res.resultCode !== 200) return this.$message.error("获取列表失败");
      this.categoryList = res.data.list;
      this.total = res.data.totalCount;
    },
    // 处理当前在第几页的函数
    handleCurrentChange(val) {
      this.queryInfo.pageNumber = val;
      this.getCategoryList();
    },
    // 点击按钮，打开添加对话框
    addCategory() {
      this.type = "add";
      this.$refs.addCategoryRef.$data.addDialogVisible = true;
    },
    // 点击按钮，打开修改对话框
    editCategory(id) {
      this.type = "edit";
      this.$refs.addCategoryRef.$data.addDialogVisible = true;
      this.$bus.$emit("getCategoryDialog", id);
    },
    // 点击删除数据
    async deleteCategory(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          /* const { data: res } = await this.$http.delete(`'/categories'/${id}`);
          if (res.resultCode !== 200) return this.$message.error("删除失败");
          this.getSwiperList();
          this.$message.success("删除成功"); */
          this.$message.error("后端接口没完成此项功能");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击下一级
    nextLevel(row) {
      const levelNumber = row.categoryLevel + 1;
      if (levelNumber == 4) {
        this.$message.error("没有下一级");
        return;
      } else {
        this.$router.push({
          name: `level${levelNumber}`,
          query: {
            level: levelNumber,
            parent_id: row.categoryId
          }
        })
      }
    },
    // 点击返回上一步
    goBack() {
      this.$router.back()
    }
  },
  watch: {
    '$route':'getCategoryList'
  },
  created() {
    this.getCategoryList();
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  position: relative;
}
.btn1 {
  position: absolute;
  right: 0;
  bottom: -5px;
}
.btn2 {
  position: absolute;
  right: 100px;
  bottom: -5px;
}
</style>