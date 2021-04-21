<template>
  <div class="main">
    <vueBigTree ref="bigTree" :tree="tree" :defaultExpand="false" :option="option"></vueBigTree>
  </div>
</template>

<script>
import vueBigTree from "../components/vueBigTree.vue";
import treeTools from "../mixins/treeTools";

export default {
  mixins: [treeTools],
  data() {
    return {
      option: {
        height: 600, //滚动容器的高度
        itemHeight: 26, // 单个item的高度
        offsetLeft: 140
      }
    };
  },
  components: {
    vueBigTree
  },
  methods: {}
};
</script>
<style scoped>
.btn-group {
  margin-top: 20px;
}
</style>