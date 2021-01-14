<template>
  <div class="home" style="text-align: left">
    <Tabs>
      <tab-panel label="标签一" name="tab1">
        <table>
          <thead>
            <tr>
              <th>Header</th>
              <th>Body</th>
              <th>Foot</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>头</td>
              <td>身</td>
              <td>脚</td>
            </tr>
          </tbody>
        </table>
      </tab-panel>
      <tab-panel label="标签二" name="tab2">
        <p>Paragraph One</p>
        <p>Paragraph Two</p>
      </tab-panel>
    </Tabs>
    <!-- Tabs demo 2 -->
    <tabs class="tab-header-red">
      <tab-panel label="Demo2 - 1"> Demo2 Tab 1</tab-panel>
      <tab-panel label="Demo2 - 2">Demo2 Tab 2</tab-panel>
    </tabs>

    <!-- Tabs demo 3 侧边栏 -->
    <tabs class="tab-bar-vertical tab-header-gray">
      <tab-panel label="Demo3 - 1">Sidebar Tabs 1</tab-panel>
      <tab-panel label="Demo3 - 2" style="background-color: #eee">
        <div style="height: 200px">Tab Content 2</div>
      </tab-panel>
    </tabs>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Tabs from "@/components/Tabs.vue";
import TabPanel from "@/components/TabPanel.vue";
export default defineComponent({
  name: "TabsDemo",
  components: { Tabs, TabPanel }
});
</script>

<style scoped>
/* 使用>>> 修改子组件的样式 style scoped */
.tab-header-red >>> .tab-header-active {
  background-color: red;
}

/* 排除带有.tab-header-active的元素 */
.tab-header-red >>> .tab-header:not(.tab-header-active):hover {
  background-color: orange;
}

/* 使用>>> 修改子组件的样式 style scoped */
.tab-header-gray >>> .tab-header-active {
  background-color: brown;
}

/* 排除带有.tab-header-active的元素 */
.tab-header-gray >>> .tab-header:not(.tab-header-active):hover {
  background-color: gray;
}

/* 侧边栏标签页 */
.tab-bar-vertical >>> {
  display: flex;
}

.tab-bar-vertical >>> .tab-bar {
  display: inline;
  width: 150px;
  border-bottom: none;
  border-right: 1px solid cadetblue;
}

.tab-bar-vertical >>> .tab-bar .tab-header {
  display: inline-block;
  width: calc(100% - 20px);
}

/* 竖标签页，右边边框颜色 */
.tab-bar-vertical.tab-header-red
  >>> .tab-bar
  .tab-header:not(.tab-header-active) {
  border-right: 1px solid orange;
}

.tab-bar-vertical.tab-header-red >>> .tab-bar .tab-header {
  border-right: 1px solid red;
}

.tab-bar-vertical.tab-header-gray
  >>> .tab-bar
  .tab-header:not(.tab-header-active) {
  border-right: 1px solid gray;
}

.tab-bar-vertical.tab-header-grey >>> .tab-bar .tab-header {
  border-right: 1px solid brown;
}

.tab-bar-vertical > div:not(.tab-bar) {
  display: inline;
  padding: 5px;
  width: 100%;
}
</style>
