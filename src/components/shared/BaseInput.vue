<template>
  <div class="input">
    <label class="input_label">{{label}}</label>
    <span class="input_sublabel" v-if="this.subLabel">{{subLabel}}</span>
    <input
      :class="
      {'input_element': true, 'input_element--rounded': this.shape === 'rounded' ? true : false }"
      @input="onInputChange"
      @change="onInputChange"
      :type="type"
    >
  </div>
</template>
<script>
export default {
  name: 'BaseInput',
  props: {
    label: String,
    subLabel: String,
    value: String,
    shape: String,
    type: String,
    onUpdate: Function,
  },
  methods: {
    onInputChange({ target }) {
      const { value } = target;
      const updatedValues = { type: this.type, value };
      this.$emit('on-update', updatedValues);
    },
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.input {
  @include styles-flex(column);
  width: 100%;
  margin: 10px 0;

  &_label {
    color: $styles-color-blue--cloud;
    font-size: 15px;
  }

  &_sublabel {
    font-size: 12px;
    color: $styles-color-green--sharp;
  }
  &_element {
    padding: 10px;
    margin: 10px 0;
    outline: 0;
    &--rounded {
      border: 1px solid $styles-color-black--light;
      border-radius: 5px;
    }
  }
}
</style>


