<template>
  <div
    class="b-tree"
    ref="scroller"
    :style="{ height: option.height + 'px' }"
    @scroll="handleScroll"
  >
    <div class="b-tree__phantom" :style="{ height: contentHeight }"></div>
    <div class="b-tree__content" :style="{ transform: `translateY(${offset}px)` }">
      <el-tree :data="visibleData" :props="defaultProps" :default-expand-all="true">
        <div slot-scope="{data,node}">
          <slot :data="data"></slot>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
let lastTime = 0;
export default {
  name: "vueBigTree",
  props: {
    tree: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    option: {
      // 配置对象
      type: Object,
      required: true,
      default() {
        return {
          height: 500, //滚动容器的高度
          itemHeight: 25 // 单个item的高度
        };
      }
    }
  },
  data() {
    return {
      offset: 0, // translateY偏移量
      contentHeight: "0px",
      visibleData: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    flattenTree() {
      const flatten = function(
        list,
        childKey = "children",
        defaultExpand = true
      ) {
        let arr = [];
        list.forEach(item => {
          if (item.visible === undefined) {
            item.visible = true;
          }
          arr.push(item);
          if (item[childKey]) {
            arr.push(...flatten(item[childKey], childKey));
          }
        });
        return arr;
      };
      return flatten(this.tree, "children"); // 扁平化数据
    },
    visibleCount() {
      return Math.floor(this.option.height / this.option.itemHeight);
    }
  },
  mounted() {
    this.updateView();
  },
  methods: {
    updateView() {
      this.getContentHeight();
      this.handleScroll();
    },
    handleScroll(e) {
      let currentTime = +new Date();
      if (currentTime - lastTime > 0) {
        if (!e) {
          this.updateVisibleData(this.$refs.scroller.scrollTop);
          lastTime = currentTime;
        } else {
          if (e.target.scrollHeight - e.target.scrollTop > this.option.height) {
            this.updateVisibleData(this.$refs.scroller.scrollTop);
            lastTime = currentTime;
          }
        }
      }
    },
    updateVisibleData(scrollTop = 0) {
      let start =
        Math.floor(scrollTop / this.option.itemHeight) -
        Math.floor(this.visibleCount / 2);
      let showSize = this.visibleCount * 2;
      let totalSize = this.flattenTree.length;
      if (start < 0) {
        start = 0;
      } else {
        start = start <= totalSize - showSize ? start : totalSize - showSize;
      }
      let end = start + this.visibleCount * 2;
      end = end > totalSize ? totalSize : end;
      const allVisibleData = (this.flattenTree || []).filter(
        item => item.visible
      );
      this.visibleData = allVisibleData.slice(start, end);
      this.offset = start * this.option.itemHeight;
    },

    getContentHeight() {
      this.contentHeight =
        (this.flattenTree || []).filter(item => item.visible).length *
          this.option.itemHeight +
        "px";
    },

    //递归节点
    recursionVisible(children, status) {
      children.forEach(node => {
        node.visible = status;
        if (node.children) {
          this.recursionVisible(node.children, status);
        }
      });
    }
  }
};
</script>
<style scoped>
.b-tree {
  position: relative;
  overflow-y: auto;
}
.b-tree__phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.b-tree__content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100px;
}
.b-tree__list-view {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.b-tree__content__item {
  padding: 5px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  cursor: pointer;
}
.b-tree__content__item:hover,
.b-tree__content__item__selected {
  background-color: #d7d7d7;
}
.b-tree__content__item__icon {
  position: absolute;
  left: 0;
  color: #c0c4cc;
  z-index: 10;
}
.b-tree__close {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: transparent transparent transparent #c0c4cc;
  border-style: dashed dashed dashed solid;
}
.b-tree__expand {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: #c0c4cc transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}
</style>