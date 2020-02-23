<template>
  <div :class="{
      'radio_button_container': true, 
      'radio_container--start': this.startItem,
      'radio_container--end': this.endItem,
      'radio_container_size--default': this.size === 'default' ? true : false,
    }">
    <button 
      :class="{
        'radio_button': true,
        'radio_button--start': this.startItem,
        'radio_button--end': this.endItem,
        'radio_button-no--border': !this.endItem && !this.startItem
      }">
      <span class="">{{value}}</span>
    </button>
  </div>
</template>
<script>
export default {
  name: 'BaseRadioButton',
  props: {
    id: Number,
    startItem: Boolean,
    endItem: Boolean,
    value: String,
    size: String,
  },
  methods: {
    onRadioButtonUpdate() {
      this.$emit('onUpdate', this.value);
    },
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.radio {
  &_button {
    outline: 0;
    font-size: 12px;
    padding: 8px;
    cursor: pointer;
    border-color: $styles-color-black--light;
    width: 100%;
    &-no--border {
      border-left: 0;
    }
    &--start {
      border-width: 1px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &--end {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-left: 0;
    }
    &_container {
      display: flex;
      height: 40px;
      width: 100%;
      &_size {
        &--default {
          width: 70px;
        }
      }
      &--start {
        margin-left: 0;
      }
    }
  }
  &_element {
    &--item {
      position: absolute;
      font-size: 15px;
      top: 10px;
      left: 15px;
      z-index: 10000;
    }
  }
}
</style>
