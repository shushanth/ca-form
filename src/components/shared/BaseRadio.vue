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
      <div :class="getBackgroundProperties(id)">
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
    isSelectedColorRequired: Boolean,
  },
  methods: {
    getRadioCheckOption() {
      return this.selectedRadio === this.id;
    },
    getRadioBackground(id) {
      const { value, color } = this.selectedColor;
      if (id > value) {
        return null;
      }
      return color;
    },
    onRadioUpdate() {
      this.$emit('onRadioUpdate', {
        value: this.value,
        selectedId: this.id,
      });
    },
    getBackgroundProperties(id) {
      if (id > this.selectedRadio) {
        return null;
      }
      return {
        radio_container_label: true,
        'radio_container_label--poor':
          this.selectedRadio <= 2 || false,
        'radio_container_label--warn':
          (this.selectedRadio > 2 && this.selectedRadio <= 3) ||
          false,
        'radio_container_label--success':
          (this.selectedRadio > 3 && this.selectedRadio <= 5) ||
          false,
      };
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
    &_label {
      background: $styles-color-gray-dull;
      &--poor {
        background-color: $styles-color-red-safron;
      }
      &--warn {
        background-color: $styles-color-yellow--warn;
      }
      &--success {
        background-color: $styles-color-green--peach;
      }
    }
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
  border: 1px solid $styles-color-gray-dull;
  border-radius: 100%;
}

input[type='radio'] + div:hover {
  border-color: $styles-color-cement-white;
}
</style>
