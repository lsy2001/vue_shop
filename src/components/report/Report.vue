<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2.为 ECharts 准备一个定义了宽高的 DOM -->
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 1.导入echarts
// import echarts from 'echarts'  不可用
let echarts = require('echarts')
//导入合并所需
import _ from 'lodash'

export default {
  data() {
    return {}
  },
  created() {},
  //此时页面上的元素已渲染完毕
  async mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败！')
    }
    // 4.指定图表的配置项和数据

    // 5.使用刚指定的配置项和数据显示图表。
    myChart.setOption(res.data)
  },
  methods: {},
}
</script>

<style lang="less" scoped>
</style>