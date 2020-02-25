<template>
  <div class="input">
    <base-label :label="label" labelLevel="primary" :subLabel="subLabel"/>
    <input
      :class="{
        'input_element': true, 
        'input_element--rounded': (this.shape === 'rounded') || false,
        'input_element--error': (this.errors.value) || false
      }"
      @input="onInputChange"
      @change="onInputChange"
      :type="elementType"
    >
    <template v-if="errors.value">
      <base-label :subLabel="errors.text" labelLevel="error"/>
    </template>
  </div>
</template>
<script>
import BaseLabel from './BaseLabel';
export default {
  name: 'BaseInput',
  props: {
    label: String,
    subLabel: String,
    value: String,
    shape: String,
    formType: String,
    elementType: String,
    onUpdate: Function,
    errors: Object,
  },
  components: {
    'base-label': BaseLabel,
  },
  methods: {
    onInputChange({ target }) {
      const { value } = target;
      const updatedValues = { type: this.formType, value };
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
    &--error {
      border: 1px solid $styles-color-red-safron;
    }
  }
}
</style>


