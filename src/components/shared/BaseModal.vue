<template>
  <div
    :id="id"
    :class="{
      'modal_wrapper': true, 'modal_wrapper--default': this.type ==='default'|| false, 
      'modal_align--right-top': this.align === 'rightTopCorner' || false ,
      'modal_size--small': this.size === 'small' || false,
    }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BaseModal',
  props: {
    size: String,
    align: String,
    shape: String,
    type: String,
    id: String
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';
.modal {
  &_wrapper {
    @include styles-flex(column);
    @include styles-box-shadow();
    &--default {
      background: $styles-color-gray-medium;
      position: absolute;
      border-radius: 10px;
    }
  }
  &_size {
    &--small {
      width: 12rem;
      height: 5.5rem;
    }
  }
  &_align {
    &--right-top {
      top: 120px;
      right: -50px;
      padding: 10px 20px;
    }
  }
}
</style>