<template>
  <div>
    <component
      v-for="(fieldSchema, index) in formSchema"
      :key="index"
      :id="fieldSchema.id"
      @onUpdate="onFormUpdate"
      :is="getQuestionParentComponents(fieldSchema.type)"
      v-bind="getQuestionParentComponentProps(fieldSchema, index)"
      :errors="questionParentForm[fieldSchema.type].error"
    >
      <template>
        <QuestionChildrenForm
          v-if="doesParentSelectedTypeMatch(fieldSchema)"
          :childrenFormSchema="childrenFormConfigs"
        />
      </template>
    </component>
    <BaseButton
      label="Submit"
      type="primary"
      size="default"
      align="end"
      shape="rounded"
      @onClick="onFormSubmit"
      :disabled="isFormInvalid()"
    />
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
      requiredTypes: [],
      questionParentForm: {
        rating: {
          value: '',
        },
        age: {
          value: '',
        },
        password: {
          value: '',
          error: {
            value: false,
            text: ERROR_TEXTS['password'],
          },
        },
        email: {
          value: '',
          error: {
            value: false,
            text: ERROR_TEXTS['email'],
          },
        },
      },
      requiredTypes: [],
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
              label: newValues[parentKey].label,
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
          } else {
            this.emptyChildForms();
          }
        }
      );
    },
    childrenFormConfigs(newValues) {
      if (!isArrayEmpty(newValues)) {
        const firstIndex = 0;
        const { parentType } = newValues[firstIndex];
        const currentChangedForm = this.questionFormChildrens.filter(
          ({ type }) => type === parentType
        )[firstIndex];
        const { value, label } = currentChangedForm;
        this.emitToResult({ type: label, value, display: true });
      } else {
        this.emitToResult({ display: false });
      }
    },
  },
  created() {
    const formTypesRequired = this.formSchema
      .filter(({ validation: { required } }) => required)
      .map(({ type }) => type);
    this.requiredTypes = formTypesRequired;
  },
  methods: {
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
    getQuestionParentComponentProps(questionFormSchema, index) {
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
          errors: this.getErrors('password'),
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
          errors: this.getErrors('email'),
          ...this.getDefaultQuestionProps({
            index,
            ...questionFormSchema,
          }),
        },
      };
      return questionComponentProps[type];
    },
    isFormInvalid() {
      const questionParentFormConfig = this.questionParentForm;
      const questionParentFormKeys = Object.keys(
        questionParentFormConfig
      );
      //check required case
      const requiredTypesValid =
        this.requiredTypes.filter(
          reqType => questionParentFormConfig[reqType].value
        ).length === this.requiredTypes.length;
      const errors = !isArrayEmpty(
        questionParentFormKeys.filter(questionPkey => {
          const errorVal =
            questionParentFormConfig[questionPkey].error;
          return errorVal && errorVal.value;
        })
      );
      return !requiredTypesValid || errors;
    },
    getErrors(type) {
      return (
        this.questionParentForm[type] &&
        this.questionParentForm[type].error
      );
    },
    onFormSubmit() {},
    onFormUpdate(updatedValues) {
      const { type, value } = updatedValues;
      const updatedFormType = {
        [type]: {
          value,
          ...this.formSchema.find(val => val.type === type),
        },
      };
      this.questionParentForm = Object.assign(
        {},
        this.questionParentForm,
        updatedFormType
      );
      this.checkForErrors(type, value);
    },
    clearErrors(type) {
      this.questionParentForm = Object.assign(
        {},
        {
          ...this.questionParentForm,
          ...{
            [type]: {
              value: '',
              error: {
                value: false,
                text: '',
              },
            },
          },
        }
      );
    },
    checkForErrors(formType, formTypeValue) {
      if (!formTypeValue) {
        this.clearErrors(formType);
        return;
      }
      if (formType === 'email' || formType === 'password') {
        const isTypeValidEnough = validateExpression(
          formType,
          formTypeValue
        );
        this.questionParentForm = {
          ...this.questionParentForm,
          ...{
            [formType]: {
              ...this.questionParentForm[formType],
              error: {
                value: !isTypeValidEnough,
                text: ERROR_TEXTS[formType],
              },
            },
          },
        };
      }
    },
    emitToResult({ type, value, display }) {
      this.$emit('resultFormSelect', {
        type,
        value,
        display,
      });
    },
    getFormQuestionSchema(type) {
      const formValueOftype = this.formSchema.find(
        schema => schema.type === type
      );
      return !isArrayEmpty(formValueOftype.sub_questions);
    },
    doesParentSelectedTypeMatch(fieldSchema) {
      if (isArrayEmpty(this.childrenFormConfigs)) {
        return false;
      }
      return (
        fieldSchema.type === this.childrenFormConfigs[0].parentType
      );
    },
    emptyChildForms() {
      this.childrenFormConfigs = [];
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
  },
};
</script>

