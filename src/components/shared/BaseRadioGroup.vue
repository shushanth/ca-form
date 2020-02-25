<template>
  <div>
    <div class="radio_group">
      <base-label :label="label" labelLevel="primary" :subLabel="subLabel"/>
      <div class="radio_group--list">
        <template v-if="elementType === 'radio'">
          <template v-for="(item, index) in this.radioItems.options">
            <base-radio
              :key="index"
              :id="item.id"
              :value="item.value"
              :startItem="item.id === 1"
              :endItem="checkIfLastRadioItems(item.id)"
              :selectedRadio="selectedRadio"
              @onRadioUpdate="({value, selectedId}) => onUpdate(elementType, {value, selectedId})"
            ></base-radio>
          </template>
        </template>
        <template v-if="elementType === 'buttons'">
          <template v-for="(item, index) in this.radioButtonsItems.options">
            <base-radio-button
              :key="index"
              :id="item.id"
              :value="item.value"
              :size="size"
              :startItem="item.id === 1"
              :selectedRadioButton="selectedRadioButton"
              :endItem="checkIfLastButtonItem(item.id)"
              @onRadioButtonUpdate="({value, selectedId}) => onUpdate(elementType, {value, selectedId})"
            ></base-radio-button>
          </template>
        </template>
      </div>
    </div>
    <!--Sub fields if any as of now only this is enabled based on busineess logic -->
    <div class="radio_group--subfields">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BaseRadio from './BaseRadio';
import BaseRadioButton from './BaseRadioButton';
import BaseLabel from './BaseLabel';
export default {
  name: 'BaseRadioGroup',
  components: {
    'base-radio': BaseRadio,
    'base-radio-button': BaseRadioButton,
    'base-label': BaseLabel,
  },
  props: {
    label: String,
    subLabel: String,
    shape: String,
    radioItems: Object,
    radioButtonsItems: Object,
    align: String,
    elementType: String,
    formType: String,
    size: String,
    isRadioSelected: Boolean,
    isRadioButtonSelected: Boolean,
  },
  methods: {
    onUpdate(type, { value, selectedId }) {
      if (type === 'radio') {
        this.selectedRadio = selectedId;
      } else {
        this.selectedRadioButton = selectedId;
      }
      this.$emit('on-update', { type: this.formType, value });
    },
    checkIfLastButtonItem(id) {
      const { options } = this.radioButtonsItems;
      return id === options.length;
    },
    checkIfLastRadioItems(id) {
      const { options } = this.radioItems;
      return id === options.length;
    },
  },
  data() {
    return {
      selectedRadio: Number(this.isRadioSelected),
      selectedRadioButton: Number(this.isRadioButtonSelected),
    };
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.radio_group {
  @include styles-flex(column);
  margin: 10px 0;
  &--label {
    color: $styles-color-blue--cloud;
    font-size: 15px;
  }

  &--sublabel {
    font-size: 12px;
    color: $styles-color-green--sharp;
  }
  &--list {
    margin: 10px 0;
    @include styles-flex(row);
  }
}
</style>
