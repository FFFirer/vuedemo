<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-3 col-md-6 col-sm-12 custom-form-group">
                <label for="departureDate">出发时间</label>
                <input type="date" name="departureDate" id="departureDate" v-model='departureDate' class="form-control">
            </div>
            <div class="col-xl-3 col-md-6 col-sm-12 custom-form-group">
                <label for="flightNumber">航班</label>
                <input type="text" name="flightNumber" id="flightNumber" v-model='flightNumber' class="form-control">
            </div>
            <div class="col-xl-3 col-md-6 col-sm-12 custom-form-group">
                <button type="button" class="btn btn-primary" @click="query()">
                    <i class="fa fa-search"></i>搜索
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div id="priceChart">

                </div>
            </div>
        </div>
    </div>
</template>

<style>
#priceChart {
    width: 100%;    
    height: 60vh;
    /* background: #02eef7; */
}
</style>

<script>
    import echarts from 'echarts'
    import ctripapi from '../api/ctrip.js'

    // var priceChart = echarts.init(document.getElementById('priceChart'));

    export default {
        name: 'flightdetail',
        data() {
            return {
                priceData: [],
                flightNumber: "",
                departureDate: "",
                yAxisData: [],
                xAxisData: [],
                priceChart: {}
            }
        },
        mounted: function () {
            this.priceChart = echarts.init(document.getElementById('priceChart'));
            this.initChart();
            console.log('init chart');
            if (this.$route.params.flightnumber != null && this.$route.params.departuredate != null) {
                this.flightNumber = this.$route.params.flightnumber;
                this.departureDate = this.$route.params.departuredate;
                this.setChartData();
            }
        },
        methods: {
            getLineData: function () {
                return ctripapi.getFlightPriceData(this.flightNumber, this.departureDate)
                .then(data => {
                    this.priceData = data.data;
                });
            },
            setChartData: function () {
                this.priceChart.setOption({
                    xAxis : {
                        data: this.xAxisData
                    },
                    series: [
                        {
                            data: this.yAxisData
                        }
                    ]
                })
                console.log('set data');
            },
            initChart: function () {
                this.priceChart.setOption({
                    color: ['#6284d3'],
                    grid: {
                        show: true,
                        left: '10%',
                        right: '10%',
                        bottom: '5%',
                        containLabel: true,
                        backgroundColor: '#E7F1F5'
                    },
                    xAxis: [{
                        type: 'category',
                        name: '出发时间',
                        axisTick: {
                            alignWithLabel: true
                        },
                        nameGap: 2
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '最低价格'
                    }],
                    series: [{
                        name: '最低价格',
                        type: 'line',
                        lineStyle: {
                            normal: {
                                width: 3,
                                shadowColor: 'rgba(0,0,0,0.1)',
                                shadowBlur: 10,
                                shadowOffsetY: 10
                            }
                        }
                    }]
                });
                
                setTimeout(() => {
                    window.addEventListener('resize', () => {
                        this.priceChart.resize();
                    })
                }, 500);
            },
            query: async function () {
                this.priceChart.showLoading();

                this.getLineData().then(() => {
                this.xAxisData = [];
                this.yAxisData = [];
                console.log('priceData: '+ this.priceData)
                if (this.priceData.length > 0) {
                    for (var index in this.priceData) {
                        this.xAxisData.push(this.priceData[index].CreateTime);
                        this.yAxisData.push(this.priceData[index].LowestPrice);
                    }
                }
                });

                
                this.priceChart.hideLoading();
                this.setChartData();
            }
        }
    }
</script>