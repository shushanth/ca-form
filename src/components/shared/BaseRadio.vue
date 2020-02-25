<template>
  <div
    :class="{
      'radio_container': true, 
      'radio_container--start': (this.id === 1)  || false
    }"
  >
    <label>
      <input
        class="radio_element"
        type="radio"
        name="radio"
        :id="id"
        :value="value"
        :checked="getRadioCheckOption()"
        @change="onRadioUpdate"
      >
      <div>
        <span class="radio--value">{{value}}</span>
      </div>
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
        selectedId: this.id,
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
        font-size: 12px;
        top: 10px;
        left: 15px;
        z-index: 10000;
      }
    }
    &--start {
      margin-left: 0;
    }
  }
  &--value {
    position: absolute;
    font-size: 12px;
    top: 10px;
    left: 15px;
    z-index: 10000;
  }
}
input[type='radio'] {
  display: none;
}
input[type='radio'] + div {
  height: 38px;
  width: 38px;
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
  background: $styles-color-gray-dull;
  border: 1px solid $styles-color-gray-dull;
  border-radius: 100%;
}

input[type='radio'] + div:hover {
  border-color: $styles-color-cement-white;
}
input[type='radio']:checked + div {
  background: $styles-color-green--peach;
}
</style>
