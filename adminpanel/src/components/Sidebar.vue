<template>
    <div id="sidebar" v-bind:class="{active: isActive}">
        <div class="sidebar-header">
            <h3>NetSpider Panel</h3>
            <span>user name&nbsp;</span>
            <a href="#" style="color:white"><i class="fa fa-sign-out"></i></a>
        </div>

        <ul class="list-unstyled components">
            <li>
                <router-link to="/ctrip">首页</router-link>
            </li>
            <li>
                <a href="#dropdownmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">携程 | Ctrip</a>
                <ul class="collapse list-unstyled" id="dropdownmenu">
                    <li>
                        <router-link to="/ctrip/flightsummary">航班信息</router-link>
                    </li>
                    <li>
                        <router-link to="/ctrip/flightdetail">航班详情</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    @import url('../static/css/main.css');
</style>

<script>
export default {
    name: 'Sidebar',
    computed : {
        isActive: function () {
            return this.$store.state.sidebarIsActive
        }
    }
    
}
</script>