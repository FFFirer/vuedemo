<template>
    <div id="content" v-bind:class="{active: isActive}">
        <nav class="navbar navbar0-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button type="button" id="sidebarCollapse" class="btn btn-info" v-on:click="sidebarCollapse()">
                    <i class="fa fa-align-left" aria-hidden="true"></i>
                </button>
            </div>
        </nav>
        <div class="content-view">
            <table class="table">
                <thead>
                    <tr>
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
                    <tr v-for="flight in flightdata" :key="flight.Id">
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
</template>

<style scoped>
    @import url('../static/css/main.css');
</style>

<script>
import testapi from '@/api/ctrip'

export default {
    name: 'Content',
    data() {
        return {
            flightdata: []
        }
    },
    computed : {
        isActive: function () {
            return this.$store.state.sidebarIsActive;
        }
    },
    methods: {
        sidebarCollapse: function(){
            console.log(this.$store.state.sidebarIsActive)
            this.$store.commit('sidebarToggleActive');
            console.log(this.$store.state.sidebarIsActive)
            
        },
        btnClick: function(){
            alert(123)
        }
    },
    mounted: function() {
        this.$nextTick(function(){
            testapi.getFlights('abc', data => {
                console.log(data);
                if(data != null && data.isSuccess == true){
                    this.flightdata = data.data
                }
                else{
                    this.flightdata = []
                }
            });
        })
    }
}
</script>