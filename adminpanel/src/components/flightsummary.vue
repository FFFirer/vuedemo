<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xl-3 col-md-6 col-sm-12 custom-form-group">
                <label for="departData">出发时间</label>
                <input type="date" name="departData" id="departDate" v-model='departDate' class="form-control" />
            </div>
            <div class="col-xl-3 col-md-6 col-sm-12 custom-form-group">
                <label for="dcity">出发地</label>
                <input type="text" name="dcity" id="dcity" v-model='dcity' class="form-control">
            </div>
            <div class="col-xl-3 col-md-6 col-sm-12 custom-form-group">
                <label for="acity">目的地</label>
                <input type="text" name="acity" id="acity" v-model='acity' class="form-control">
            </div>
            <div class="col-xl-3 col-md-6 col-sm-12 custom-form-group">
                <button type="button" class="btn btn-primary" @click="query()">
                    <i class="fa fa-search"></i>搜索
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3>
                    所有航班
                </h3>
            </div>
            <div class="col-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                No.
                            </th>
                            <th>
                                航空公司
                            </th>
                            <th>
                                航班
                            </th>
                            <th>
                                出发时间
                            </th>
                            <th>
                                出发地
                            </th>
                            <th>
                                目的地
                            </th>
                            <th>
                                机型
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(flight, index) in flightdata" :key="flight.Id">
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ flight.AirlineName }}
                            </td>
                            <td>
                                {{ flight.FlightNumber }}
                            </td>
                            <td>
                                {{ flight.departureDate }}
                            </td>
                            <td>
                                {{ flight.departureCityName }} - {{ flight.departureAirportName }}
                            </td>
                            <td>
                                {{ flight.arrivalCityName }} - {{ flight.arrivalAirportName }}
                            </td>
                            <td>
                                {{ flight.CraftTypeName }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="row">
            <div class="col-12">
                <h3>
                    价格趋势
                </h3>
            </div>
            <div class="col-12">
                <div id="priceChart">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>

<script>
    import testapi from '@/api/ctrip'
    import echarts from 'echarts'

    export default {
        name: "flightsummary",
        data() {
            return {
                flightdata: [],
                departDate: "",
                dcity: "",
                acity: "",
                show: true,
                priceChart: {}
            }
        },
        methods: {
            query: function () {
                let errorMsg = this.validateQueryParams();

                if(errorMsg == ""){
                    testapi.getFlights(this.departDate, this.dcity, this.acity, data => {
                        console.log(data);
                        if (data != null && data.isSuccess == true) {
                            this.flightdata = data.data
                        } else {
                            this.flightdata = []
                        }

                        if(this.flightdata.length <= 0) {
                            alert("没有查询到数据! ");
                        }
                    });
                }
                else{
                    alert(errorMsg);
                }
            },
            search: function () {
                this.$router.go({path: '/ctrip/flightsummary/', query: {departDate: this.departDate, dcity: this.dcity, acity: this.acity}});
            },
            validateQueryParams: function () {
                let errorMsg = "";
                if(this.departDate == "" || this.departDate == undefined) {
                    errorMsg += '请填写出发日期!\n';
                }
                if(this.dcity == "" || this.dcity == undefined) {
                    errorMsg += '请填写出发地!\n';
                }
                if(this.acity == "" || this.acity == undefined) {
                    errorMsg += '请填写目的地!\n';
                }

                return errorMsg;
            },
            checkout: function () {
                this.show = !this.show
            },
            showChart: function () {
                this.show = false;
                this.initPriceChart();
            },
            initPriceChart: function () {
                this.priceChart = echarts.init(document.getElementById('priceChart'));
                this.priceChart.setOption({
                    color: ['#6284d3'],
                    tooltip: {
                        trigger: 'axis'
                    },
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
                        name: '日期',
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
            }
        },
        mounted: function() {
            this.initPriceChart();

            // console.log(this.$route.query.departDate)
            // if(this.$route.query.departDate != undefined) {
            //     this.departDate = this.$route.query.departDate;
            //     console.log(this.departDate)
            // }

            // if(this.$route.query.dcity != undefined) {
            //     this.dcity = this.$route.query.dcity;
            // }

            // if(this.$route.query.acity != undefined) {
            //     this.acity = this.$route.query.acity;
            // }

            // this.query();
        }
    }
</script>