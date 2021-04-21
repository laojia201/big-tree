<template>
  <div class="main">
    <vueBigTree ref="bigTree" :tree="tree" :defaultExpand="false" :option="option">
      <template slot-scope="{data}">
        <div>
          <span>[1]</span>
          <span>{{data.label}}</span>
        </div>
      </template>
    </vueBigTree>
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
        height: 600,
        itemHeight: 26,
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