<template>
  <div>
    <div style="border: 1px soild red" class="tab-bar">
      <div
        v-for="(tab, index) in tabList"
        :key="index"
        @click="changeTab(tab.name)"
        :class="getClass(tab.name)"
      >
        {{ tab.label }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style>
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
  onMounted,
  provide,
  Ref,
  ref,
  watch
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
  index: Ref<string>;
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
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  methods: {
    getClass: function(name: string) {
      console.log("getClass: " + name + " currentName:" + this.currentName);
      return {
        "tab-header": true,
        "tab-header-active": this.currentName === name
      };
    }
  },
  setup(props: TabsProps, context) {
    const currentName = ref(props.modelValue || props.activeTabName || "0");
    const panels = ref([]);
    // const instance = getCurrentInstance();
    const tabList = ref<TabPanelProps[]>([]);

    provide<RootTabs>("RootTabs", {
      props,
      currentName
    });

    provide<UpdatePanelStatesCallback>(
      "updatePanelStates",
      (panel: TabPanel) => {
        console.log(
          "updatePanel, props: " +
            JSON.stringify(panel.props) +
            "index: " +
            panel.index.value
        );
        // 加入list的时候判断index并赋值
        panel.index.value = (tabList.value.length + 1).toString();
        // 重新赋值TabPanelProps
        tabList.value.push({
          label: panel.props.label,
          name: panel.panelName.value
        } as TabPanelProps);
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
      console.log("changeTab to " + name);
      context.emit("update:modelValue", name);
    };

    watch(
      () => props.activeTabName,
      // eslint-disable-next-line prettier/prettier
      (modelValue) => {
        changeTab(modelValue);
        console.log("activeTabName changed: (new) " + props.activeTabName);
      }
    );

    watch(
      () => props.modelValue,
      // eslint-disable-next-line prettier/prettier
      (modelValue) => {
        changeTab(modelValue);
        console.log("modelValue changed: (new) " + props.modelValue);
      }
    );

    onMounted(() => {
      currentName.value = tabList.value[0].name;
    });
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
      tabList
    };
  }
});
</script>
