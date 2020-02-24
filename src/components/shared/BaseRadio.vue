<template>
  <div
    :class="{
      'radio_container': true, 
      'radio_container--start': (this.id === 1)  || false
    }"
  >
    <input
      class="radio_element"
      type="radio"
      name="radio"
      :id="id"
      :value="value"
      :checked="getRadioCheckOption()"
      @change="onRadioUpdate"
    >
    <label :for="id">
      <span class="radio_element--item">{{value}}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'BaseRadio',
  props: {
    shape: String,
    id: Number,
    value: String,
    selectedRadio: Number,
  },
  methods: {
    getRadioCheckOption() {
      return this.selectedRadio === this.id;
    },
    onRadioUpdate() {
      this.$emit('onRadioUpdate', {
        value: this.value,
        seleced: this.id,
      });
    },
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.radio {
  &_container {
    display: flex;
    height: 40px;
    width: auto;
    margin: 0 10px;
    &_element {
      &--item {
        position: absolute;
        font-size: 15px;
        top: 10px;
        left: 15px;
        z-index: 10000;
      }
    }
    &--start {
      margin-left: 0;
    }

    [type='radio']:checked,
    [type='radio']:not(:checked) {
      position: absolute;
      left: -9999px;
    }
    [type='radio']:checked + label,
    [type='radio']:not(:checked) + label {
      position: relative;
      padding-left: 28px;
      cursor: pointer;
      line-height: 20px;
      display: inline-block;
    }
    [type='radio']:checked + label:before,
    [type='radio']:not(:checked) + label:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 38px;
      height: 38px;
      border: 1px solid $styles-color-cement-white;
      border-radius: 100%;
      background-color: $styles-color-gray-dull;
    }
    [type='radio']:checked + label:after,
    [type='radio']:not(:checked) + label:after {
      content: '';
      width: 40px;
      height: 40px;
      background: $styles-color-green--peach;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 100%;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
    }
    [type='radio']:not(:checked) + label:after {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    [type='radio']:checked + label:after {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
}
</style>
