<template>
  <div class="label_wrapper">
    <p
      :class="{
        'label_item': true,
        'label_color--primary': (this.labelLevel === 'primary') || false
      }"
    >{{label}}</p>
    <p
      :class="{
        'label_subitem': true, 'label_error': (this.labelLevel === 'error') || false,
        'label_subitem_size--small': this.subLabelSize === 'small' || false,
      }"
    >{{subLabel}}</p>
  </div>
</template>
<script>
export default {
  name: 'BaseLabel',
  props: {
    label: String,
    subLabel: String,
    labelLevel: String,
    subLabelSize: String,
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';
.label {
  &_wrapper {
    @include styles-flex(column);
  }
  &_item {
    color: $styles-color-blue--cloud;
    font-size: 20px;
    font-weight: bold;
  }
  &_subitem {
    font-size: 16px;
    color: $styles-color-green--sharp;

    &_size {
      &--small {
        font-size: 12px;
      }
    }
  }
  &_error {
    color: $styles-color-red-safron;
  }
  &_color {
    &--primary {
      color: $styles-color-blue--cloud;
    }
  }
}
</style>