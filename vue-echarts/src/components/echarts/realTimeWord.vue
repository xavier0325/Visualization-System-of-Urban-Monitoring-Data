<template>
	<div id="rtwContainer"></div>
</template>

<script>
	import common from '../../api/common.js'
	import 'echarts-wordcloud/dist/echarts-wordcloud'
	import 'echarts-wordcloud/dist/echarts-wordcloud.min'

	export default {
		mounted() {
			var myChartDom = common.getById(rtwContainer);
			var myChart = this.$echarts.init(myChartDom);


			var maskImage = new Image();
			maskImage.src =
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA/BJREFUeF7lm1nIDlEYx3+fKBciS0nEjUK2lBQu7EvWLFmSJRIJ2VPIkiUlJSm7LBGylCzJlihFKcmFNVyIXJCQ3OhfZ2q837xn5n3nzPvOzPvU5Pv6znmWn3POnHnOc+pIRhoAPYDuQCegOdDCPN7P3r+/Af/zy/f7c8D/fHftbp0DhY2BIb6AFXhXB3qDVHz0AbkL3AH+xLFVLoDOwEBgLDAqjgMO+l4HbgIPgCel6isFwEhgADAY6FOqoQq1fw3cN0DORrEZBqAVsACYBPSKojBFbd4Al4BDwMtifhUD0B9YAUxMUUBxXNF6sQ+4UKikEIDm9X6zcscxmNa+P4DdwCbPwUIAWs1vpdV7R35ttgEYZhYQR7ZSqcYKYARwI5Vuu3PKCkDv9KvubKVSkxXAGOBKKt1255QVwHjgsjtbqdRkBTABuJhKt905ZQUwGTjvzlYqNVkBTAEi7aFTGVo0p6wApgOno+nJbCsrgBnAqcyGFs1xK4CZwIloejLbygpgDnAss6FFc9wKYC5wJJqezLayApgPHMxsaNEctwJQ9kf5gDyLFcAikzmpWQCLgb15jh6wjoClwJ5aBrDc5MzyzMA6AlYCu/IcfdgUWAPsrGUAa4EdtQxgHbC1lgFsALbUMgCdmGzMOQBt9w97MRaeDNXCuUBP4FkxAE0B51UYKRpRP4Emfn+CTodVkpJUhUe1WdwGhoYB0PyYV21PE7KvTd7qMADTgDMJOVBttbOAk2EAWgJfq+1pAvb/AqptehsGQH9X4ZFqgvIkqg7Rwc9/UqxEJo/fBPWGv0gUA9AbeJyj//5PQJegV7ytSuw4IGp5kAPAwqBAbABUMKXqqjzIaOBaqQDUXgtH1kvldNyvOsdACSuUzEPFiCrfVFNcFgB1UpZY2eIsijY91nUsbAQo6NbAPbOJyBqEvsAjm9NRAKh/Fo/N6+37y1kE/X10aqzT4yyIyueV2wiVqCNAinQxQouJhlWa5TMw3J/0cDEFPB1tgKdmXUgrhMAtb5y3QGFfbSlfpDT67YAy25GllCngV9oPeBjZSmUaHi0nkVMuAIXUEXhVmdhCrWibq+1uyRIHgIxpTVCeTdOiWqI9yqByjccFILvNTJpJN8gqLduA9XGMugAg+41MaY2KrCohumg5zsXtFlcAvKD18bTKXK9LCoTm+5LC3F65xlwD8PxYZkC0LdexgH7vTPWK0wqWpADI/w4mB6/Ks4YxQOg0R0Hr+RJDT2DXJAF4BrsBs813hC5iRhVdolbZru776bQqEakEAM/xdgaCYGgPUUzem8AVvK7CJiqVBOAFosNJfVVOBdqb5wOg55x5pX5LNGqf8n9HrKVBfTJNuwAAAABJRU5ErkJggg=='

			var data = [{
					name: '实时疫情监控',
					value: 10000,
				},
				{
					name: '众志成城',
					value: 6181
				},
				{
					name: '疫情',
					value: 4386
				},
				{
					name: '防控',
					value: 4055
				},
				{
					name: '戴口罩',
					value: 2467
				},
				{
					name: '核酸检测',
					value: 2244
				},
				{
					name: '新冠肺炎',
					value: 1898
				},
				{
					name: '隔离',
					value: 1484
				},
				{
					name: '风险区域',
					value: 1112
				},
				{
					name: '打疫苗',
					value: 965
				},
				{
					name: '健康码',
					value: 847
				},
				{
					name: '行程码',
					value: 582
				},
				{
					name: '少聚集',
					value: 555
				},
				{
					name: '消毒',
					value: 550
				},
				{
					name: '通风',
					value: 462
				},
				{
					name: '勤洗手',
					value: 366
				},
				{
					name: '科学',
					value: 360
				},
				{
					name: '白衣天使',
					value: 282
				},
				{
					name: '逆行者',
					value: 273
				},
				{
					name: '依法',
					value: 265
				}
			]

			var option = {
				series: [{
					type: 'wordCloud',
					width: '100%',
					height: '80%',
					gridSize: 1,
					sizeRange: [12, 20],
					// rotationRange: [-90, 90],
					rotationRange: [-50, 50],
					maskImage: maskImage,
					textStyle: {
						color: function() {
							return 'rgb(' + [
								Math.round(Math.random() * 255),
								Math.round(Math.random() * 255),
								Math.round(Math.random() * 255)
							].join(',') + ')';
						}
					},
					emphasis: {
						focus: 'self',

						textStyle: {
							fontSize: 20,
							// color: '#fff',
							textShadowBlur: 2,
							textShadowColor: '#fff'
						}

					},
					data: data
				}]
			}

			myChart.setOption(option);
			window.onresize = function() {
				myChart.resize();
			}
			setInterval(function() {
				// var temp = data.map(function(item,i,arr) {
				// 	let index = Math.floor(Math.random()*(arr.length));
				// 	arr[i].name = arr[index].name
				// 	return item
				// })
				myChart.setOption({
					series: [{
						data: data
					}]
				})
			},2000)

		}
	}
</script>

<style scoped>
	#rtwContainer {
		width: 440px;
		height: 110px;
	}
</style>
