<template>
	<div id="rtpContainer"></div>
</template>

<script>
	import common from '../../api/common.js'
	export default {
		props: ['rtPeopleData'],
		data() {
			return {
				chartObj: null
			}
		},
		watch: {
			rtPeopleData(val) {
				// console.log(val);
				this.chartObj.setOption({
					xAxis: [{
							data: val.categories
						},
						{
							data: val.categories2
						}
					],
					series: [{
							data: val.data
						},
						{
							data: val.data2
						}
					]
				});
			}
		},
		mounted() {
			var myChartDom = common.getById(rtpContainer);
			var myChart = this.$echarts.init(myChartDom);
			this.chartObj = myChart;
					
			let option = {
				title: {
					text: '疫情人数实况一览',
					left: 'center',
					bottom: 0,
					textStyle: {
						color: '#fff'
					},
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#283b56'
						}
					}
				},
				legend: {
					textStyle: {
						color: '#fff'
					}
				},
				toolbox: {
					show: false,
					feature: {
						dataView: {
							readOnly: false
						},
						restore: {},
						saveAsImage: {}
					}
				},
				dataZoom: {
					show: false,
					start: 0,
					end: 100
				},
				xAxis: [{
						type: 'category',
						boundaryGap: true,
						axisLabel: {
							color: '#eee'
						},
						data: []
					},
					{
						type: 'category',
						boundaryGap: true,
						axisLabel: {
							color: '#eee'
						},
						data: []
					}
				],
				yAxis: [{
						type: 'value',
						scale: true,
						name: '新增人数',
						max: 30,
						min: 0,
						nameGap: 28,	//坐标轴名字与轴线距离
						nameTextStyle: {
							color: '#eee'
						},
						axisLabel: {
							color: '#eee'
						},
						boundaryGap: [0.2, 0.2]
					},
					{
						type: 'value',
						scale: true,
						name: '总体人数',
						max: 1200,
						min: 0,
						nameGap: 28,	//坐标轴名字与轴线距离
						nameTextStyle: {
							color: '#eee'
						},
						axisLabel: {
							color: '#eee'
						},
						boundaryGap: [0.2, 0.2]
					}
				],
				series: [{
						name: '总体人数',
						type: 'bar',
						xAxisIndex: 1,
						yAxisIndex: 1,
						data: []
					},
					{
						name: '新增人数',
						type: 'line',
						data: []
					}
				]
			};
			
			myChart.setOption(option);
			window.onresize = function() {
				document.querySelector("#rtpContainer").style.width = this.chartwidth + 'px';
				myChart.resize();
			}
		}
	}
</script>

<style scoped>
	#rtpContainer {
		width: 440px;
		height: 300px;
	}
</style>
