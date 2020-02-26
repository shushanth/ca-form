<template>
  <div>
    <component
      v-for="(fieldSchema, index) in formSchema"
      :key="index"
      :id="fieldSchema.id"
      @onUpdate="onFormUpdate"
      :is="getQuestionParentComponents(fieldSchema.type)"
      v-bind="getQuestionComponentProps(fieldSchema, index)"
    >
      <QuestionChildrenForm
        v-if="doesParentSelectedTypeMatchSelect(fieldSchema)"
        :childrenFormSchema="childrenFormConfigs"
      />
    </component>
  </div>
</template>
<script>
import BaseInput from '@/components/shared/BaseInput';
import BaseHeader from '@/components/shared/BaseHeader';
import BaseButton from '@/components/shared/BaseButton';
import BaseRadioGroup from '@/components/shared/BaseRadioGroup';
import QuestionChildrenForm from '@/components/QuestionChildrenForm';
import {
  validateExpression,
  isArrayEmpty,
  getCurrentDate,
  RATINGS_OPTIONS,
  AGE_OPTIONS,
  ERROR_TEXTS,
} from '@/utils/utilities';
import BaseTextField from './shared/BaseTextField.vue';
export default {
  name: 'QuestionParentForm',
  props: {
    formSchema: {
      status: Array,
      required: true,
    },
  },
  components: {
    BaseInput,
    BaseHeader,
    BaseButton,
    BaseRadioGroup,
    BaseTextField,
    QuestionChildrenForm,
  },
  data() {
    return {
      questionParentForm: {
        rating: {
          value: '',
          sub_questions_occur: this.getFormQuestionSchema('rating'),
          currentSelected: false,
        },
        age: {
          value: '',
          sub_questions_occur: this.getFormQuestionSchema('age'),
          currentSelected: false,
        },
        password: {
          value: '',
          sub_questions_occur: this.getFormQuestionSchema('password'),
          currentSelected: false,
        },
        email: {
          value: '',
          sub_questions_occur: this.getFormQuestionSchema('email'),
          currentSelected: false,
        },
      },
      questionFormChildrens: [],
      childrenFormConfigs: [],
      ratingOptions: RATINGS_OPTIONS,
      ageOptions: AGE_OPTIONS,
    };
  },
  watch: {
    questionParentForm(newValues) {
      const parentFormKeys = Object.keys(newValues);
      const parentFormValues = parentFormKeys
        .map(
          parentKey =>
            newValues[parentKey].value && {
              type: newValues[parentKey].type,
              value: newValues[parentKey].value,
              sub_questions: newValues[parentKey].sub_questions,
            }
        )
        .filter(val => val);
      this.questionFormChildrens = parentFormValues.filter(
        formVal => !isArrayEmpty(formVal.sub_questions)
      );
    },
    questionFormChildrens(newValues) {
      const childConfiguration = newValues.map(
        ({ sub_questions, ...restFields }) => {
          const subQuestionValuesMatches = this.doesValueMatchSubValues(
            restFields,
            sub_questions
          );
          const { type } = subQuestionValuesMatches;
          if (!isArrayEmpty(sub_questions) && type) {
            this.childrenFormConfigs = [subQuestionValuesMatches];
          }
        }
      );
    },
  },
  methods: {
    onFormUpdate(updatedValues) {
      const { type, value } = updatedValues;
      const updatedFormType = {
        [type]: {
          value,
          currentSelected: true,
          ...this.formSchema.find(val => val.type === type),
        },
      };
      this.questionParentForm = Object.assign(
        {},
        this.questionParentForm,
        updatedFormType
      );
    },
    getFormQuestionSchema(type) {
      const formValueOftype = this.formSchema.find(
        schema => schema.type === type
      );
      return !isArrayEmpty(formValueOftype.sub_questions);
    },
    doesParentSelectedTypeMatchSelect(fieldSchema) {
      if(isArrayEmpty(this.childrenFormConfigs)) {
        return false;
      }
      return fieldSchema.type === this.childrenFormConfigs[0].parentType;
    },
    doesValueMatchSubValues({ type, value }, selectedChildQuestions) {
      const matchedSubQValues = selectedChildQuestions
        .map(({ values, questions }) =>
          values.includes(value) ? questions : []
        )
        .flat(Infinity);
      const matchSubValues = Object.assign({}, ...matchedSubQValues, {
        parentType: type,
      });
      return matchSubValues;
    },
    getDefaultQuestionProps({
      index,
      id,
      type,
      label,
      validation: { required },
      sub_questions_occur,
    }) {
      return {
        formType: type,
        id,
        label: `${index + 1}`,
        subLabel: label,
        sub_questions_occur,
        errors: {
          required,
          value: '',
          text: '',
        },
      };
    },
    getQuestionParentComponents(questionFormType) {
      const questionFormCompMapper = {
        rating: BaseRadioGroup,
        age: BaseRadioGroup,
        password: BaseInput,
        email: BaseInput,
      };
      return questionFormCompMapper[questionFormType];
    },
    getQuestionComponentProps(questionFormSchema, index) {
      const { type, label, ...restFields } = questionFormSchema;
      const questionComponentProps = {
        rating: {
          componentMapper: 'BaseRadioGroup',
          componentName: 'rating',
          elementType: 'radio',
          shape: 'round',
          radioItems: this.ratingOptions,
          isRadioSelected: false,
          ...this.getDefaultQuestionProps({
            index,
            ...questionFormSchema,
          }),
        },
        age: {
          componentMapper: 'BaseRadioGroup',
          componentName: 'age',
          elementType: 'buttons',
          shape: 'default',
          radioButtonsItems: this.ageOptions,
          isRadioSelected: false,
          ...this.getDefaultQuestionProps({
            index,
            ...questionFormSchema,
          }),
        },
        password: {
          componentMapper: 'BaseInput',
          componentName: 'password',
          elementType: 'password',
          shape: 'rounded',
          ...this.getDefaultQuestionProps({
            index,
            ...questionFormSchema,
          }),
        },
        email: {
          componentMapper: 'BaseInput',
          componentName: 'email',
          elementType: 'email',
          shape: 'rounded',
          ...this.getDefaultQuestionProps({
            index,
            ...questionFormSchema,
          }),
        },
      };
      return questionComponentProps[type];
    },
  },
};
</script>

