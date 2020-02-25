<template>
  <form-card type="fullPage" shape="roundedTop" mode="default">
    <div class="question-form">
      <form-header type="primary" level="medium" label="Customer Alliance Form"/>
      <!-- The below component can be form builder component which can be moved 
        to different component alltogther, keeping it as itself here as of now 
      -->
      <component
        v-for="(field, index) in formModel"
        :key="index"
        :id="field.id"
        :is="getFormElements(field.type)"
        @on-update="onFormUpdate"
        v-bind="getPropsToPass(field, index)"
      >
        <template v-if="doesSubFieldRequired(field)">
          <SubQuestionForm
            :selectedValue="selectedFormValue.rating"
            :formModel="field.sub_questions"
          />
        </template>
      </component>
      <form-submit
        label="Submit"
        type="primary"
        size="default"
        align="end"
        shape="rounded"
        @onClick="onFormSubmit"
      />
    </div>
  </form-card>
</template>
<script>
import BaseCard from '@/components/shared/BaseCard';
import BaseInput from '@/components/shared/BaseInput';
import BaseHeader from '@/components/shared/BaseHeader';
import BaseButton from '@/components/shared/BaseButton';
import BaseRadioGroup from '@/components/shared/BaseRadioGroup';
import SubQuestionForm from '@/components/SubQuestionForm';
export default {
  name: 'QuestionForm',
  props: {
    formModel: { status: Array, required: true },
  },
  components: {
    'form-header': BaseHeader,
    'form-card': BaseCard,
    'form-submit': BaseButton,
    SubQuestionForm,
  },
  data() {
    return {
      formData: {},
      compProps: {},
    };
  },
  methods: {
    onFormSubmit() {
      console.log('sumbit');
    },
    onFormUpdate({ type, value }) {
      const updatedFormValues = Object.assign(
        {},
        this.selectedFormValue,
        { [type]: value }
      );
      this.selectedFormValue = updatedFormValues;
    },
    doesSubFieldRequired(subFields) {
      return subFields.sub_questions.length;
    },
    getFormElements(value) {
      const formComponentNameSpace = {
        rating: BaseRadioGroup,
        age: BaseRadioGroup,
        email: BaseInput,
        password: BaseInput,
      };
      return formComponentNameSpace[value];
    },
    getPropsToPass(field, id) {
      const { type, label, ...restFields } = field;
      const formDefaultProps = {
        label: `${id + 1}`,
        formType: type,
        subLabel: label,
        ...restFields,
      };
      const compPropsToPass = {
        rating: {
          elementType: 'radio',
          shape: 'round',
          radioItems: this.ratings,
          isRadioSelected: false,
          ...formDefaultProps,
        },
        age: {
          elementType: 'buttons',
          radioButtonsItems: this.ages,
          size: 'default',
          isRadioButtonSelected: false,
          ...formDefaultProps,
        },
        password: {
          elementType: 'password',
          shape: 'rounded',
          ...formDefaultProps,
        },
        email: {
          elementType: 'email',
          shape: 'rounded',
          ...formDefaultProps,
        },
      };
      return compPropsToPass[type];
    },
  },
  data() {
    return {
      selectedFormValue: {
        rating: '0',
      },
      ratings: {
        options: [
          { value: '1', id: 1 },
          {
            value: '2',
            id: 2,
          },
          {
            value: '3',
            id: 3,
          },
          {
            value: '4',
            id: 4,
          },
          {
            value: '5',
            id: 5,
          },
        ],
      },
      ages: {
        options: [
          { value: '<20', id: 1 },
          { value: '20-29', id: 2 },
          { value: '30-39', id: 3 },
          { value: '40-49', id: 4 },
          { value: '50-59', id: 5 },
          { value: '60-69', id: 6 },
          { value: '70-79', id: 7 },
          { value: '80+', id: 8 },
        ],
      },
    };
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.question-form {
  @include styles-flex(column);
  width: 80%;
}
</style>
