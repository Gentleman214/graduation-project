<template>
  <page title="入出库统计">
    <template slot="content">
      <div id="myChart" :style="{width: '800px', height: '400px'}"></div>
    </template>
  </page>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        options: {
          tooltip: {   //鼠标悬浮框的提示文字
            trigger: 'axis'
          },
          legend: {
            data:['入库量','出库量']
          },
          xAxis : [{  //x轴坐标数据
            type : 'category',
            boundaryGap : false,
            data : []
          }],
          yAxis : [{   //y轴坐标数据
            type : 'value'
          }],
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"入库量",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[]
            },
            {
              name:"出库量",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:[]
            }
          ]
        }
      }
    },
    created () {
      this.fetchData()
    },
    mounted (){
      this.getDay()
    },
    methods: {
      fetchData () {
        this.$api.statistics.salesVolumeStatistics(1).then(res => {
          if (res?.code === 200) {
            this.options.series[0].data = res.data
            this.drawLine()
          }
        })
        this.$api.statistics.salesVolumeStatistics(2).then(res => {
          if (res?.code === 200) {
            this.options.series[1].data = res.data
            this.drawLine()
          }
        })
      },
       drawLine (){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(this.options);
      },
      getDay () {
        let today = new Date()
        for (let i = 7; i >= 0; i--) {
          this.options.xAxis[0].data.push(`${new Date(today.getTime() - 3600 * 1000 * 24 * i).getDate()}号`)
        }
      }
    }
  }
</script>

<style scoped>

</style>