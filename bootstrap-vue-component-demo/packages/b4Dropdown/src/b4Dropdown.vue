<template>
  <div class="dropdown" :id="id">
    <button
      type="button"
      :class="[`btn`, `dropdown-toggle`, btnClass]"
      data-toggle="dropdown"
    >
      {{ label }}
    </button>
    <div class="dropdown-menu">
      <b-4-dropdown-option
        v-for="(d, index) in data"
        :key="index"
        :label="d.label"
        :link="d.href"
        :value="d.value"
        :index="index"
      >
      </b-4-dropdown-option>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "b4Dropdown",
  props: ["label", "id", "data", "btnClass"],
  data: function() {
    return {};
  }
});
</script>

<style></style>
