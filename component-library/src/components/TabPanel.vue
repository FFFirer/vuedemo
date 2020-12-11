<template>
  <div v-show="show" :id="`tab-panel-${index}`">
    <slot></slot>
  </div>
</template>
<style scoped></style>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  ref,
} from "vue";
import {
  TabPanelProps,
  UpdatePanelStatesCallback,
  TabPanel,
  RootTabs,
} from "@/components/Tabs.vue";

export default defineComponent({
  name: "TabPanel",
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props: TabPanelProps) {
    console.log(JSON.stringify(props));

    // eslint-disable-next-line prettier/prettier
    const index = ref<string>();
    const RootTabs = inject<RootTabs>("RootTabs");
    const updatePanelStates = inject<UpdatePanelStatesCallback>(
      "updatePanelStates"
    );
    const instance = getCurrentInstance();
    console.log(index.value);
    const panelName = computed((): string => {
      return props.name || (index.value as string);
    });

    if (!RootTabs || !updatePanelStates) {
      throw new Error("空引用");
    }

    updatePanelStates({
      uid: instance?.uid.toString() as string,
      props,
      instance,
      panelName,
      index,
    } as TabPanel);

    const show = computed(() => {
      const active = RootTabs?.currentName.value == (props.name || index.value);
      return active;
    });

    return {
      index,
      panelName,
      show,
    };
  },
});
</script>
