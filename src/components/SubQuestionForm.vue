<template>
  <div>
    <component
      v-for="(subField, subIndex) in formModel"
      :key="subIndex"
      :id="subField.id"
      :is="getSubFormElements(subField)"
      @onUpdate="onSubFormUpdate"
      v-bind="getSubFormPropsToPass(subField)"
    />
  </div>
</template>
<script>
import BaseTextField from './shared/BaseTextField.vue';
export default {
  name: 'SubQuestionForm',
  props: {
    formModel: { status: Array, required: true },
    selectedValue: { status: String, required: true },
  },
  methods: {
    getSubFormElements(subFields) {
      const selectedSubQ = this.getSubQuestionFieldOnSelectedVal(subFields);
      let selectedCompType = null;
      if(selectedSubQ) {
        selectedCompType = selectedSubQ.type;
      }
      const subComponents = {
        comment: BaseTextField,
      };
      return subComponents[selectedCompType];
    },
    getSubFormPropsToPass(subFields) {
      const selectedSubQ = this.getSubQuestionFieldOnSelectedVal(subFields);
      const subCompPropsToPass = {
        value: selectedSubQ ? selectedSubQ.label : '',
        size: 'small',
        shape: 'round',
      };
      return subCompPropsToPass;
    },
    getSubQuestionFieldOnSelectedVal({values, questions}) {
      const selectedValueInSubFields = values.find((val) => val === this.selectedValue);
      const index = 0;
      if(selectedValueInSubFields) {
        return questions[index]
      }
    },
    onSubFormUpdate() {
      //handle cases on subform updates, which is not required as of now.
    },
  },
};
</script>
<style lang='scss'>
@import 'styles/base.scss';
</style>