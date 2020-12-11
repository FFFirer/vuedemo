<template>
  <div class="home">
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
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Tabs from "@/components/Tabs.vue";
import TabPanel from "@/components/TabPanel.vue";

export default defineComponent({
  name: "TabsDemo",
  components: {
    Tabs,
    TabPanel,
  },
});
</script>
