<template>
  <div class="header-wrapper">
    <h1 :class="styleConfig">{{label}}</h1>
  </div>
</template>
<script>
export default {
  name: "BaseHeader",
  props: {
    label: String,
    level: String
  },
  data() {
    return {
      styleConfig: {
        ["header-color--primary"]: this.level === "primary" ? true : false
      }
    };
  }
};
</script>
<style lang='scss'>
@import "styles/base.scss";
.header-wrapper {
  display: flex;
}
.header-color--primary {
  color: $styles-color-blue--cloud;
}
</style>