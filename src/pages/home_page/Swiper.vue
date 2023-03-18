<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图配置</el-breadcrumb-item>
      <el-button type="primary" size="mini" class="btn" @click="addSwiper">
        <i class="el-icon-circle-plus-outline"></i>
        <span>添加</span>
      </el-button>
    </el-breadcrumb>
    <el-card>
      <!-- 表格 -->
      <el-table :data="swiperList" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="date" label="轮播图" width="160px">
          <template slot-scope="scope">
            <img :src="scope.row.carouselUrl" alt="" class="swiperImg" />
          </template>
        </el-table-column>
        <el-table-column label="跳转链接">
          <template slot-scope="scope">
            <a :href="scope.row.redirectUrl" class="swiperLink">
              {{ scope.row.redirectUrl }}</a
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="carouselRank"
          label="排序值"
          width="70px"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="160px"
        ></el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editData(scope.row.carouselId)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteData(scope.row.carouselId)"
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
    <AddSwiper ref="addSwiperDialog" :reload="getSwiperList" :type="type" />
  </div>
</template>

<script>
export default {
  name: "Swiper",
  components: { 
    AddSwiper: ()=> import('../../components/AddSwiper.vue')
   },
  data() {
    return {
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      // 存储数据的数组
      swiperList: [],
      // 获取的数据总数
      total: 0,
      // 操作类型
      type: "add",
    };
  },
  methods: {
    // 获取轮播图表单数据
    async getSwiperList() {
      let params = this.queryInfo;
      const res = await this.$http.swiper.getSwiperList({ params });
      this.swiperList = res.data.list;
      this.total = res.data.totalCount;
    },
    // 处理当前在第几页的函数
    handleCurrentChange(val) {
      this.queryInfo.pageNumber = val;
      this.getSwiperList();
    },
    // 点击添加按钮触发事件
    addSwiper() {
      this.$refs.addSwiperDialog.$data.addDialogVisible = true;
      this.type = "add";
    },
    // 点击修改数据
    editData(id) {
      this.type = "edit";
      this.$refs.addSwiperDialog.$data.addDialogVisible = true;
      this.$bus.$emit("getEditData", id);
    },
    // 点击删除数据
    async deleteData(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          /* await this.$http.swiper.deleteData({
            ids: [id],
          });
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
  },
  created() {
    this.getSwiperList();
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
.swiperImg {
  width: 130px;
  height: 130px;
}
.swiperLink {
  text-decoration: none;
  color: #409eff;
}
</style>