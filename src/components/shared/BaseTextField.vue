<template>
  <div class="textfield_element">
    <textarea
      :placeholder="value"
      :class="{
        'textfield_size--small': this.size === 'small' || false,
        'textfield_shape--rounded': this.shape === 'round' || false,
      }"
    />
  </div>
</template>
<script>
export default {
  name: 'BaseTextField',
  props: {
    label: String,
    size: String,
    shape: String,
    value: String,
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';

.textfield {
  &_element {
    @include styles-flex(row);
    textarea {
      border: 1px solid $styles-color-black--light;
    }
  }
  &_size {
    &--small {
      padding: 7px 10px 0;
      font-size: 14px;
      color:$styles-color-cement-gray;;
      width: 250px;
    }
  }
  &_shape {
    &--rounded {
      border-radius: 5px;
    }
  }
}
</style>