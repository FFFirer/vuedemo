<template>
  <div>
    <div style="border: 1px soild red" class="tab-bar">
      <div
        v-for="(tab, index) in tabList"
        :key="index"
        @click="changeTab(name)"
        :class="getClass(name)"
      >
        {{ tab.label }}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tab-header-active {
  background-color: cadetblue;
  color: white;
}

.tab-header {
  display: inline-block;
  padding: 10px 10px;
}

.tab-bar {
  border-bottom: 1px solid cadetblue;
  cursor: pointer;
}
</style>

<script lang="ts">
import {
  ComponentInternalInstance,
  ComputedRef,
  defineComponent,
  provide,
  Ref,
  ref,
  watch,
} from "vue";

export interface TabPanelProps {
  label: string;
  name: string;
}

export interface TabPanel {
  uid: string;
  props: TabPanelProps;
  instance: ComponentInternalInstance;
  panelName: ComputedRef<string>;
  index: ComputedRef<string>;
}

export interface TabsProps {
  activeTabName: string;
  modelValue: string;
}

export interface RootTabs {
  props: TabsProps;
  currentName: Ref<string>;
}

export type UpdatePanelStatesCallback = (panel: TabPanel) => void;

export default defineComponent({
  name: "Tabs",
  props: {
    activeTabName: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  methods: {
    getClass: function(name: string) {
      return {
        "tab-header": true,
        "tab-header-active": this.currentName === name,
      };
    },
  },
  setup(props: TabsProps, context) {
    const currentName = ref(props.modelValue || props.activeTabName || "0");
    const panels = ref([]);
    // const instance = getCurrentInstance();
    const tabList = [];

    provide<RootTabs>("RootTabs", {
      props,
      currentName,
    });

    provide<UpdatePanelStatesCallback>(
      "updatePanelStates",
      (panel: TabPanel) => {
        tabList.push(panel.props);
      }
    );

    // const getPanelInstanceFromSlot = (
    //   vnode: VNode,
    //   panelInstanceList: ComponentInternalInstance[] = []
    // ) => {
    //   Array.from((vnode.children || []) as ArrayLike<VNode>).forEach((node) => {
    //     let type = node.type;
    //     type = (type as Component).name || type;
    //     if (type === "TabPanel" && node.component) {
    //       panelInstanceList.push(node.component);
    //     } else if (type === Fragment || type === "template") {
    //       getPanelInstanceFromSlot(node, panelInstanceList);
    //     }
    //   });
    //   return panelInstanceList;
    // };

    const changeTab = (name: string) => {
      currentName.value = name;
      context.emit("update:modelValue", name);
    };

    watch(
      () => props.activeTabName,
      // eslint-disable-next-line prettier/prettier
      (modelValue) => {
        changeTab(modelValue);
      }
    );

    watch(
      () => props.modelValue,
      // eslint-disable-next-line prettier/prettier
      (modelValue) => {
        changeTab(modelValue);
      }
    );

    // 设置panels，确定tab-panels有哪些
    // const setPanelInstance = () => {
    //   if (context.slots.default) {
    //     const children = instance?.subTree.children;
    //     const content = Array.from(children as ArrayLike<VNode>).find(
    //       ({ props }) => {
    //         return props?.class === "tab-panel";
    //       }
    //     );
    //     if (!content) return;

    //     const panelInstanceList: TabPanel[] = getPanelInstanceFromSlot(
    //       content
    //     ).map((panelComponent: any) => {
    //       return panelStatesMap[panelComponent.uid];
    //     });

    //     const panesChanged = !(
    //       panelInstanceList.length === panels.value.length &&
    //       panelInstanceList.every(
    //         (panel, index) => panel.uid === panels.value[index].uid
    //       )
    //     );

    //     if (panesChanged) {
    //       (panels.value as TabPanel[]) = panelInstanceList;
    //     }
    //   } else if (panels.value.length !== 0) {
    //     panels.value = [];
    //   }
    // };

    // onUpdated(() => {
    //   setPanelInstance();
    // });

    // onMounted(() => {
    //   setPanelInstance();
    // });

    return {
      currentName,
      panels,
      changeTab,
    };
  },
});
</script>
