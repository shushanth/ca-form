<template>
  <div class="radio_group">
    <label class="radio_group--label">{{label}}</label>
    <p class="radio_group--sublabel">{{subLabel}}</p>
    <div class="radio_group--list">
      <template v-if="type === 'radio'">
      <template v-for="(item, index) in this.radioItems.options">
        <base-radio 
          :key="index" 
          :id="item.id" 
          :value="item.value"
          :startItem="item.id === 1"
          :endItem="checkIfLastRadioItems(item.id)"
          :selectedRadio="selectedRadio" 
          @onRadioUpdate="onRadioUpdate(item.value)">
        </base-radio>
      </template>
      </template>
      <template v-if="type === 'buttons'">
      <template v-for="(item, index) in this.radioButtonsItems.options">
        <base-radio-button 
          :key="index" 
          :id="item.id" 
          :value="item.value"
          :size="size"
          :startItem="item.id === 1"
          :endItem="checkIfLastButtonItem(item.id)"
          @onRadioUpdate="onRadioUpdate(item.value)">
        </base-radio-button>
      </template>
      </template>
    </div>
  </div>
</template>
<script>
import BaseRadio from './BaseRadio';
import BaseRadioButton from './BaseRadioButton';
export default {
  name: 'BaseRadioGroup',
  components: {
    'base-radio': BaseRadio,
    'base-radio-button': BaseRadioButton,
  },
  props: {
    label: String,
    subLabel: String,
    shape: String,
    radioItems: Object,
    radioButtonsItems: Object,
    align: String,
    type: String,
    size: String,
  },
  methods: {
    onRadioUpdate(radioUpdated) {
      this.selectedRadio = radioUpdated;
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
      selectedRadio: '1',
    };
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.radio_group {
  @include styles-flex(column);
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
.form-rating-container {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 18px;
  color: $styles-color-green--sharp;
  margin: 10px 0;
}
.ratings {
  margin: 10px 0;
  display: flex;
}
.radio-item {
  position: absolute;
  font-size: 15px;
  top: 10px;
  left: 15px;
  z-index: 10000;
}

.radio-container {
  display: flex;
  height: 40px;
  width: auto;
  margin: 0 10px;
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
  background: #c9c9c9;
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
