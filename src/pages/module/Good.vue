<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-button type="primary" size="mini" class="btn" @click="addGood">
        <i class="el-icon-circle-plus-outline"></i>
        <span>添加</span>
      </el-button>
    </el-breadcrumb>
    <!-- 分页 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="goodList" style="width: 100%">
        <el-table-column prop="goodsId" label="商品编号"> </el-table-column>
        <el-table-column prop="goodsName" label="商品名"> </el-table-column>
        <el-table-column prop="goodsIntro" label="商品简介"></el-table-column>
        <el-table-column label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.goodsCoverImg" alt="" class="goodImg" />
          </template>
        </el-table-column>
        <el-table-column prop="stockNum" label="商品库存" width="120"></el-table-column>
        <el-table-column prop="sellingPrice" label="商品售价"></el-table-column>
        <el-table-column prop="goodsSellStatus" label="上架状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.goodsSellStatus == 0"
              >销售中</el-tag
            >
            <el-tag type="danger" v-else>已下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editGood(scope.row.goodsId)">修改</el-button>
            <el-button type="primary" size="mini" v-if="scope.row.goodsSellStatus == 0" @click="handleStatus(scope.row.goodsId, 1)">下架</el-button>
            <el-button type="primary" size="mini" v-else @click="handleStatus(scope.row.goodsId, 0)">上架</el-button>
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
  </div>
</template>

<script>
export default {
  name: "Good",
  data() {
    return {
      // 获取表格数据要提交的信息
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
      },
      // 存储获取到的数据
      goodList: [],
      // 获取数据的总数
      total: 0,
    };
  },
  methods: {
    // 获取表格数据
    async getGoodList() {
      const res = await this.$http.good.getGoodList({
        params: this.queryInfo,
      })
      this.goodList = res.data.list;
      this.total = res.data.totalCount;
    },
    // 处理当前在第几页的函数
    handleCurrentChange(val) {
      this.queryInfo.pageNumber = val;
      this.getGoodList();
    },
    async handleStatus(id, status) {
        const res = await this.$http.good.handleStatus(status,{
            ids: id ? [id] : []
        })
        this.$message.success(res.message)
        this.getGoodList()
    },
    // 点击添加，跳转页面到商品添加
    addGood() {
      this.$router.push('/add')
    },
    // 点击修改按钮， 跳转页面到商品添加
    editGood(id) {
      this.$router.push({
        path: '/add',
        query: {
          id,
        }
      })
    }
  },
  created() {
    this.getGoodList();
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
.goodImg {
  width: 100px;
  height: 100px;
}
</style>