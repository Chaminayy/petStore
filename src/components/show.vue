<template>
  <div class="indexFrame">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'show',
  mounted() {
    const myChart = this.$echarts.init(document.querySelector('#main'))
    myChart.setOption({
      title: {
        text: 'Test'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }
};
</script>

<style lang="less" scoped>
.indexFrame {
  width: 100%;
  height: 200px;
  /*background: green;*/
}
</style>
