<template>
  <a
    :href="link"
    :data-v="value"
    :data-id="`b4-select-option-${index}`"
    class="dropdown-item"
    >{{ label }}</a
  >
</template>

<script>
export default {
  name: "b4DropdownOption",
  props: ["link", "label", "value", "index"],
  methods: {}
};
</script>

<style lang="scss"></style>
