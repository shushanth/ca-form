<template>
  <div class="input">
    <label class="input-label">{{label}}</label>
    <span class="input-sublabel" v-if="this.subLabel">{{subLabel}}</span>
    <input @input="onInputChange" @change="onInputChange" class="input" :type="type" />
  </div>
</template>
<script>
export default {
  name: "BaseInput",
  props: {
    label: String,
    subLabel: String,
    value: String,
    type: String,
    onUpdate: Function
  },
  methods: {
    onInputChange({ target }) {
      const { value } = target;
      const updatedValues = { type: this.type, value };
      this.$emit("on-update", updatedValues);
    }
  }
};
</script>
<style lang="scss">
@import "styles/base.scss";
.input {
  @include styles-flex(column);
  width: 100%;
  margin: 10px 0;

  &-label {
    color: $styles-color-blue--cloud;
    font-size: 15px;
  }

  &-sublabel {
    font-size: 12px;
    color: $styles-color-green--sharp;
  }
}
</style>


