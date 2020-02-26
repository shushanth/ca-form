<template>
  <div class="button_wrapper">
    <button
      :class="{
      'button': true,
      'button--disabled': this.disabled,
      'button_color--primary': (this.type === 'primary') || false,
      'button_size--default': (this.size === 'default') || false,
      'button--rounded': (this.shape === 'rounded') || false,
      'button_align--end': (this.align === 'end') || false,
      }"
      @click="btnClick()"
    >{{this.label || 'button'}}</button>
  </div>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    label: String,
    type: String,
    align: String,
    size: String,
    shape: String,
    onClick: Function,
    disabled: Boolean
  },
  methods: {
    btnClick() {
      this.$emit('onClick');
    },
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.button_wrapper {
  @include styles-flex(column);
  margin: 5px 0;
  .button {
    outline: 0;
    padding: 20px;
    cursor: pointer;
    &_color {
      &--primary {
        background: $styles-color-green--peach;
      }
    }
    &--disabled {
      pointer-events: none !important;
      background-color: $styles-color-green--low;
    }
    &_size {
      &--default {
        font-size: 22px;
        padding: 8px;
        width: 150px;
        color: $styles-color-white;
      }
    }
    &_align {
      &--end {
        align-self: flex-end;
      }
    }
    &--rounded {
      border-radius: 5px;
    }
  }
}
</style>


