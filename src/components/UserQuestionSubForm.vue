<template>
  <div>
    <component
      v-for="(fieldSchema, index) in childrenFormSchema"
      :key="index"
      :id="fieldSchema.id"
      :is="getQuestionChildComponents(fieldSchema.type)"
      v-bind="getComponentProps(fieldSchema)"
      @onUpdate="onSubFormUpdate"
    />
  </div>
</template>
<script>
import BaseTextField from './shared/BaseTextField.vue';
export default {
  name: 'UserQuestionSubForm',
  components: {
    BaseTextField,
  },
  props: {
    childrenFormSchema: Array,
    currentSelected: Array,
  },
  methods: {
    getQuestionChildComponents(type) {
      const questionChildFormCompMapper = {
        comment: BaseTextField,
      };
      return questionChildFormCompMapper[type];
    },
    getComponentProps(fieldSchema) {
      const { label, validation } = fieldSchema;
      const formCompPropsMapper = {
        value: label,
        size: 'small',
        shape: 'round',
        validation,
      };
      return formCompPropsMapper;
    },
    onSubFormUpdate() {
    },
  },
};
</script>


