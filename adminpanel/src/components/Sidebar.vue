<template>
    <div id="sidebar" v-bind:class="{active: isActive}">
        <div class="sidebar-header">
            <h3>NetSpider Panel</h3>
            <span>user name</span>
            <a href="#" style="color:white"><i class="fa fa-sign-out"></i></a>
        </div>

        <ul class="list-unstyled components">
            <li>
                <a href="#dropdownmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">测试ceshic</a>
                <ul class="collapse list-unstyled" id="dropdownmenu">
                    <li>
                        <a href="#">测试1</a>
                    </li>
                    <li>
                        <a href="#">测试1</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Test 1</a>
            </li>
            <li>
                <a href="#">Test 2</a>
            </li>
            <li>
                <a href="#">Test 3</a>
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