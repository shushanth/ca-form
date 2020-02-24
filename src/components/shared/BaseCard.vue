<template>
  <div
    :class="{
      'card_wrapper': true, 
      'card_wrapper_align--default': this.position === 'default' ? true: false,
      'card_wrapper_shape--rounded': this.shape === 'rounded' ? true: false,
    }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BaseCard',
  props: {
    position: String,
    shape: String,
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';
.card {
  &_wrapper {
    @include styles-flex(column);
    @extend .app_color--white;
    &_align--default {
      margin: 50px 180px 0;
      padding: 40px;
      height: 100vh;
    }
    &_shape--rounded {
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }
}
</style>