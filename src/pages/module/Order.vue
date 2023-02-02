<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分页 -->
    <el-card>
      <el-input
        placeholder="请输入内容"
        v-model="queryInfo.orderNo"
        class="input-with-select"
        style="width: 200px; margin-right: 10px"
        @change="handleOption"
      >
      </el-input>
      <el-select
        @change="handleOption"
        v-model="queryInfo.orderStatus"
        style="width: 200px; margin-right: 10px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" size="small " @click="handleConfig"
        >配货完成</el-button
      >
      <el-button type="primary" size="small " @click="handleSend"
        >出货</el-button
      >
      <el-button type="primary" size="small " @click="handleClose"
        >关闭订单</el-button
      >
      <el-table
        :data="orderList"
        style="width: 100%"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <!-- 多选 -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <el-table-column
          prop="totalPrice"
          label="订单总价"
          width="100"
        ></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="120">
          <template slot-scope="scope">
            {{ scope.row.orderStatus | orderFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="payType" label="支付方式" width="120">
          <template slot-scope="scope">
            <span style="color: #67c23a" v-if="scope.row.payType == 1"
              >微信支付</span
            >
            <span style="color: #409eff" v-else-if="scope.row.payType == 2"
              >支付宝支付</span
            >
            <span style="color: #f56c6c" v-else>未支付</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              @click="close(scope.row.orderId)"
              >关闭订单</el-button
            >
            <el-button type="primary" size="mini" @click="orderDetail(scope.row.orderId)">订单详情</el-button>
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
  name: "Order",
  data() {
    return {
      queryInfo: {
        pageNumber: 1,
        pageSize: 10,
        orderNo: "",
        orderStatus: "",
      },
      // 存储获取到的数据
      orderList: [],
      // 总数量
      total: 0,
      // 下拉选择框数据
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 0,
          label: "待支付",
        },
        {
          value: 1,
          label: "已支付",
        },
        {
          value: 2,
          label: "配货完成",
        },
        {
          value: 3,
          label: "出库成功",
        },
        {
          value: 4,
          label: "交易成功",
        },
        {
          value: -1,
          label: "手动关闭",
        },
        {
          value: -2,
          label: "超时关闭",
        },
        {
          value: -3,
          label: "商家关闭",
        },
      ],
      // 选中项
      multipleSelection: [],
    };
  },
  methods: {
    // 获取订单数据
    async getOrderList() {
      const res = await this.$http.order.getOrderList({
        params: this.queryInfo,
      })
      this.orderList = res.data.list;
      this.total = res.data.totalCount;
    },
    // 处理当前在第几页的函数
    handleCurrentChange(val) {
      this.queryInfo.pageNumber = val;
      this.getOrderList();
    },
    // 当多选框被触发时发生
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 输入框失去焦点或按下enter键触发
    handleOption() {
      this.getOrderList();
    },
    // 配货完成
    async handleConfig() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择多选项");
      } else {
        await this.$http.order.handleConfig({
          ids: this.multipleSelection.map((item) => item.orderId),
        })
        this.$message.success("配货成功");
        this.getOrderList();
      }
    },
    // 出货完成
    async handleSend() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择多选项");
      } else {
        await this.$http.order.handleSend({
          ids: this.multipleSelection.map((item) => item.orderId),
        })
        this.$message.success("出库成功");
        this.getOrderList();
      }
    },
    // 关闭订单(多选)
    async handleClose() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择多选项");
      } else {
        await this.$http.order.handleClose({
          ids: this.multipleSelection.map((item) => item.orderId),
        })
        this.$message.success("关闭成功");
        this.getOrderList()
      }
    },
    // 关闭订单(单选)
    close(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
            this.$message.error('后端未搭建环境')
          /* const { data: res } = await this.$http.put("/orders/close", {
            id,
          });
          // console.log(res);
          if (res.resultCode !== 200) this.$message.error(res.message);
          this.$message({
            type: "success",
            message: "删除成功!",
          }); */
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    orderDetail(id) {
        this.$router.push({
            path: '/order_detail',
            query: {
                id,
            }
        })
    }
  },
  // 过滤器，过滤订单状态
  filters: {
    orderFilter(data) {
      switch (data) {
        case 0:
          return "待支付";
        case 1:
          return "已支付";
        case 2:
          return "配货完成";
        case 3:
          return "出库成功";
        case 4:
          return "交易成功";
        case -1:
          return "手动关闭";
        case -2:
          return "超时关闭";
        case -3:
          return "商家关闭";
      }
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
}
/deep/.el-icon-search:before {
  color: #999;
}
/deep/.el-input__inner {
  height: 32px !important;
}
.el-table {
  margin-top: 15px;
}
</style>