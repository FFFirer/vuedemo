<template>
  <b-4-dropdown
    :data="demoDropdownList"
    btnClass="btn-outline-primary btn-lg"
    label="下拉菜单"
  >
  </b-4-dropdown>
</template>

<script>
export default {
  name: "DropdownDemo",
  data: function() {
    return {
      demoDropdownList: [
        {
          label: "test A",
          value: 1,
          href: "#"
        },
        {
          label: "test B",
          value: 2,
          href: "#"
        }
      ]
    };
  }
};
</script>

<style></style>
