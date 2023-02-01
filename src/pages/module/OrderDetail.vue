<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/order' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分页 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="order-style">订单状态</div>
            <el-divider></el-divider>
            <div class="order-style2">
              {{ orderDetailList.orderStatusString }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="order-style">创建时间</div>
            <el-divider></el-divider>
            <div class="order-style2">
              {{ orderDetailList.createTime }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="order-style">订单号</div>
            <el-divider></el-divider>
            <div class="order-style2">
              {{ orderDetailList.orderNo }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="order-style">订单总价</div>
            <el-divider></el-divider>
            <div class="order-style2">
              {{ orderDetailList.totalPrice }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableList" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.goodsCoverImg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="goodsId" label="商品编号">
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名"></el-table-column>
        <el-table-column prop="goodsCount" label="商品数量"></el-table-column>
        <el-table-column prop="sellingPrice" label="价格"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "OrderDetail",
  data() {
    return {
      // query携带的id
      id: this.$route.query.id,
      // 存储获取到的数据
      orderDetailList: {},
      tableList: []
    };
  },
  methods: {
    async getOrderDetail() {
      const { data: res } = await this.$http.get(`/orders/${this.id}`);
      console.log(res);
      if (res.resultCode !== 200) this.$message.error(res.message);
      this.orderDetailList = res.data;
      this.tableList = res.data.newBeeMallOrderItemVOS
    },
  },
  created() {
    this.getOrderDetail();
  },
};
</script>

<style lang="less" scoped>
.order-style {
  font-size: 14px;
}
.order-style2 {
  color: #192a5e;
  font-size: 18px;
  font-weight: 700;
}
.el-divider--horizontal {
  margin: 12px 0;
}
.el-table {
  margin-top: 15px;
  img {
    width: 100px;
    height: 100px
  }
}
</style>