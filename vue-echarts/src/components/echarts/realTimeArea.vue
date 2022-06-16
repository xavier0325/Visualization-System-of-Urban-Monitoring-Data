<template>
	<div id="rtaContainer"></div>
</template>

<script>
	import common from '../../api/common.js'
	export default {
		props: ['rtAreaData'],
		data() {
			return {
				chartObj: null
			}
		},
		watch: {
			rtAreaData(val) {
				this.chartObj.setOption({
					series: [{
						data: val.data
					}]
				})
			}
		},
		mounted() {
			var myChartDom = common.getById(rtaContainer);
			myChartDom.style.width = '440px';
			myChartDom.style.height = '300px';
			var myChart = this.$echarts.init(myChartDom);
			this.chartObj = myChart;

			var data = (function() {
				let res = [];
				let obj = {'value': Math.floor(Math.random()*50+50) ,'name': '雨湖区'};
				let obj1 = {'value': Math.floor(Math.random()*50+50) ,'name': '岳塘区'};
				let obj2 = {'value': Math.floor(Math.random()*50+50) ,'name': '湘乡市'};
				let obj3 = {'value': Math.floor(Math.random()*50+50) ,'name': '韶山市'};
				let obj4 = {'value': Math.floor(Math.random()*50+50) ,'name': '湘潭县'};
				res.push(obj,obj1,obj2,obj3,obj4);
				return res;
			})()
			var option = {
				title: {
					text: '疫情地区患者人数比例实况',
					left: 'center',
					bottom: 0,
					textStyle: {
						color: '#fff'
					}
				},
				graphic: {
					type: 'text',
					left: 'center',
					top: 'center',
					style: {
						text: '湘潭市',
						fill: '#fff',
						fontSize: 20,
					}
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}<br/>总人数：{c}<br/>比例：{d}%',
					// backgroundColor: 'rgba(255,255,255,0.9)'
				},
				legend: {
					top: '5%',
					left: 'center',
					textStyle: {
						color: '#eee'
					},
					z: 1
				},
				series: [{
					name: '湘潭市疫情地区患者人数比例',
					type: 'pie',
					radius: ['30%', '60%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: true,
						formatter: '{b}\n\n{d}%',
						color: '#fff',
						textBorderColor: '#95a2ff',
						textBorderWidth: 1,
						textShadowColor: '#fff',
						textShadowBlur: 7,
						position: 'outside',
						z: 2
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '25',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: []
				}]
			};
			myChart.setOption(option);
			window.onresize = function() {
				myChart.resize();
			}
			// setInterval(function() {
			// 	data = data.map(function(item,i,arr) {
			// 		item.value = Math.ceil(Math.random()*50+50);
			// 		return item
			// 	});
			// 	myChart.setOption({
			// 		series: [{
			// 			data: data
			// 		}]
			// 	})
			// },2000);
		}
	}
</script>

<style scoped>
</style>
