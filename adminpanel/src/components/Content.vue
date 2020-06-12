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
            var data = testapi.getFlights();
            console.log("get flights");
            console.log(data);
        })
    }
}
</script>