<template>
  <div class="header_wrapper">
    <h1
      :class="{
      'header_color--primary': this.level === 'primary' ? true: false,
    }"
    >{{label}}</h1>
  </div>
</template>
<script>
export default {
  name: 'BaseHeader',
  props: {
    label: String,
    level: String,
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';
.header_wrapper {
  display: flex;
}
.header_color--primary {
  color: $styles-color-blue--cloud;
}
</style>