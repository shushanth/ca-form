<template>
  <div
    :class="{
      'card_wrapper': true, 
      'card_wrapper_mode--default': this.mode === 'default' || false,
      'card_wrapper_type--page': (this.type === 'fullPage') || false,
      'card_wrapper_shape-round--corners-top': (this.shape === 'roundedTop') || false,
    }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BaseCard',
  props: {
    type: String,
    shape: String,
    mode: String,
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';
.card {
  &_wrapper {
    @include styles-flex(column);
    &_type--page {
      padding: 40px;
    }
    &_shape-round--corners-top {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
    &_mode--default {
      @extend .app_color--white;
    }
  }
}
</style>