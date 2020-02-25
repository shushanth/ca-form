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
  &--subfields {
    
  }
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
  color: #666;
}
[type='radio']:checked + label:before,
[type='radio']:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 38px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #eee;
}
[type='radio']:checked + label:after,
[type='radio']:not(:checked) + label:after {
  content: '';
  width: 40px;
  height: 40px;
  background: $styles-color-gray-light;
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
</style>
