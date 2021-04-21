<template>
  <div class="main">
    <vueBigTree
      ref="bigTree"
      :tree="tree"
      :defaultExpand="false"
      :option="option"
      @setJumpRowData="setJumpRowData"
    >
      <template v-slot:pre="{ item, index }">
        <span style="position:absolute;left:0;top:5;">
          <span>[101010]</span>
          <span>[10]</span>
          <span>[√]</span>
          <span>[×]</span>
        </span>
      </template>
      <template v-slot:label="{ item, index }">
        <span @click="jumpMapRow(item, 1000)">{{ item.label }}</span>
      </template>
    </vueBigTree>
    <div class="btn-group">
      <el-button @click="expandAll" class="btn" type="primary">展开所有</el-button>
      <el-button @click="collapseAll" class="btn" type="primary">折叠所有</el-button>
    </div>
  </div>
</template>
<style>
.btn-group {
  margin-top: 20px;
}
</style>
<script>
import vueBigTree from "../components/vueBigTree.vue";
import treeTools from "../mixins/treeTools";

export default {
  mixins: [treeTools],
  data() {
    return {
      option: {
        height: 500, //滚动容器的高度
        itemHeight: 25, // 单个item的高度
        // offsetLeft: 100,
        jumpRowData: null,
        offsetLeft: 140
      }
    };
  },
  components: {
    vueBigTree
  },
  methods: {
    collapseAll() {
      this.$refs.bigTree.collapseAll();
    },
    expandAll() {
      this.$refs.bigTree.expandAll();
    },
    jumpMapRow(row) {
      this.option.jumpRowData = row;
    },
    setJumpRowData(val) {
      this.option.jumpRowData = val;
    }
  }
};
</script>
