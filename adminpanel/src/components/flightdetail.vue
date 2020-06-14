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
                <div class="priceChart">

                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
    import echarts from 'echarts'
    import ctripapi from '../api/ctrip.js'

    export default {
        name: 'flightdetail',
        data() {
            return {
                priceData: [],
                flightNumber: "",
                departureDate: "",
                yAxisData: [],
                xAxisData: []
            }
        },
        mounted: function () {
            if (this.$route.params.flightnumber != null && this.$route.params.departuredate != null) {
                this.flightNumber = this.$route.params.flightnumber;
                this.departureDate = this.$route.params.departuredate;
                this.query();
            }
        },
        methods: {
            getLineData: function () {
                console.log(this.flightNumber);
                console.log(this.departureDate);
                ctripapi.getFlightPriceData(this.flightNumber, this.departureDate, data => {
                    if (data != null && data.isSuccess) {
                        this.priceData = data.data;
                        console.log(data.data);
                    } else {
                        this.priceData = [];
                    }
                })
            },
            initChart: function () {
                let priceChart = echarts.init(document.getElementById('priceChart'));
                priceChart.setOptions({
                    title: {
                        text: '价格折线图'
                    },
                    color: ['#6284d3'],
                    grid: {
                        show: true,
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true,
                        backgroundColor: '#E7F1F5'
                    },
                    xAxis: [{
                        type: 'category',
                        name: '出发时间',
                        data: this.xAxisData,
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
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LineGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#E7F1F5'
                                    },
                                    {
                                        offset: 1,
                                        color: '#E7F1F5'
                                    }
                                ])
                            }
                        },
                        data: this.yAxisData
                    }]
                });
                setTimeout(() => {
                    window.addEventListener('resize', () => {
                        priceChart.resize();
                    })
                }, 500);
            },
            query: function () {
                this.getLineData();
                console.log(this.priceData);
                this.xAxisData = [];
                this.yAxisData = [];
                // if (this.priceData.length > 0) {
                //     for (var index in this.priceData) {
                //         this.xAxisData.push(this.priceData[index].CreateTime);
                //         this.yAxisData.push(this.priceData[index].LowestPrice);
                //     }
                // }
                this.initChart();
            }
        }
    }
</script>