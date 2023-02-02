<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="wel-icon1">
            <i class="el-icon-s-goods"></i>
          </div>
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="36271"
              title="今日日活"
            ></el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="wel-icon2">
            <i class="el-icon-s-claim"></i>
          </div>
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="1888"
              title="今日订单数"
            ></el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="wel-icon3">
            <i class="el-icon-s-marketing"></i>
          </div>
          <div>
            <el-statistic :value="0.2" title="转化率"></el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="main" style="width: 1000px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Welcome",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "系统折线图",
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['新增注册', '付费用户', '活跃用户', '订单数', '当日总收入']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['2021-03-11', '2021-03-12', '2021-03-13', '2021-03-14', '2021-03-15', '2021-03-16', '2021-03-17']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '新增注册',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '付费用户',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '活跃用户',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '订单数',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '当日总收入',
          type: 'line',
          stack: '总量',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>

<style lang="less" scoped>
/deep/.el-card__body {
  display: flex;
  align-items: center;
  padding: 0 !important;
}
.wel-icon1,
.wel-icon2,
.wel-icon3 {
  height: 80px;
  width: 80px;
  font-size: 30px;
  color: #fff;
  text-align: center;
  line-height: 80px;
}
.wel-icon1 {
  background-color: #22b8d0;
}
.wel-icon2 {
  background-color: #ffbc7e;
}
.wel-icon3 {
  background-color: #52acf4;
}
.el-statistic {
  margin-left: 20px;
}
#main {
  margin-top: 25px;
}
</style>