<template>
  <div class="header_wrapper">
    <h2 v-if="this.level ==='medium'"
      :class="{
        'header_color--primary': (this.type === 'primary') || false,
      }"
    >{{label}}</h2>
  </div>
</template>
<script>
export default {
  name: 'BaseHeader',
  props: {
    label: String,
    level: String,
    type: String,
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';
.header {
  &_wrapper {
    @include styles-flex(row);
    margin: 10px 0 20px;
    padding: 10px 0;
  }
  &_color {
    &--primary {
      color: $styles-color-blue--cloud;
    }
  }
}
</style>