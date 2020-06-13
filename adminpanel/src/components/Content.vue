<template>
    <div id="content" v-bind:class="{active: isActive}">
        <nav class="navbar navbar0-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button type="button" id="sidebarCollapse" class="btn btn-info" v-on:click="sidebarCollapse()">
                    <i class="fa fa-align-left" aria-hidden="true"></i>
                </button>
            </div>
            <!-- <router-link to="/flightsummary">航班信息</router-link> -->
        </nav>
        
        <div class="content-view">
            <router-view>
                
            </router-view>
        </div>
    </div>
</template>

<style scoped>
    @import url('../static/css/main.css');
</style>

<script>
// import testapi from '@/api/ctrip'

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
            this.$store.commit('sidebarToggleActive');
        },
        btnClick: function(){
            alert(123)
        }
    },
    mounted: function() {
        // this.$router.push('/');
        // this.$nextTick(function(){
        //     testapi.getFlights('abc', data => {
        //         console.log(data);
        //         if(data != null && data.isSuccess == true){
        //             this.flightdata = data.data
        //         }
        //         else{
        //             this.flightdata = []
        //         }
        //     });
        // })
    }
}
</script>