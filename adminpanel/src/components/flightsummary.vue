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
                            <th>
                                操作
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
                            <td>
                                <input type="button" class="btn btn-info" value="查看详情" name="gotoDetail" :data-flightnumber="flight.FlightNumber">
                                <router-link :to="{path: '/ctrip/flightdetail/', query: {flightnumber: flight.FlightNumber, departuredate: departDate}}">check</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script>
    import testapi from '@/api/ctrip'

    export default {
        name: "flightsummary",
        data() {
            return {
                flightdata: [],
                departDate: "",
                dcity: "",
                acity: ""
            }
        },
        methods: {
            query: function () {
                console.log(this.departDate);
                console.log(this.dcity);
                console.log(this.acity);
                testapi.getFlights(this.departDate, this.dcity, this.acity, data => {
                    console.log(data);
                    if (data != null && data.isSuccess == true) {
                        this.flightdata = data.data
                    } else {
                        this.flightdata = []
                    }
                });
            }
        }
    }
</script>