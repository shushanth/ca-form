<template>
  <base-card type="fullPage" shape="roundedTop" mode="default">
    <div class="question-form">
      <base-header type="primary" level="medium" label="Customer Alliance Form"/>
      <!-- The below component can be form builder component which can be moved 
        to different component alltogther, also moving into seprate component
        with the recursive sub form components can be handled based on form model
      -->
      <component
        v-for="(field, index) in formModel"
        :key="index"
        :id="field.id"
        :is="getFormElements(field.type)"
        @on-update="onFormUpdate"
        v-bind="getPropsToPass(field, index)"
        :errors="errors[field.type]"
      >
        <template v-if="showSubQForm(field)">
          <SubQuestionForm
            :selectedValue="selectedFormValue.rating"
            :formModel="field.sub_questions"
          />
        </template>
      </component>
      <base-submit
        label="Submit"
        type="primary"
        size="default"
        align="end"
        shape="rounded"
        @onClick="onFormSubmit"
      />
    </div>
    <base-modal
      v-if="showResultModal"
      mode="modal"
      type="default"
      size="small"
      align="rightTopCorner"
    >
      <base-label subLabelSize="small" subLabel="How do you feel today ?"/>
      <base-label subLabelSize="small" :subLabel="selectedFormValue.rating"/>
      <p class="date">DATE OF EXPERIENCE</p>
    </base-modal>
  </base-card>
</template>
<script>
import BaseCard from '@/components/shared/BaseCard';
import BaseInput from '@/components/shared/BaseInput';
import BaseHeader from '@/components/shared/BaseHeader';
import BaseButton from '@/components/shared/BaseButton';
import BaseRadioGroup from '@/components/shared/BaseRadioGroup';
import BaseLabel from '@/components/shared/BaseLabel';
import BaseModal from '@/components/shared/BaseModal';
import SubQuestionForm from '@/components/SubQuestionForm';
import {
  testRegx,
  isArrayEmpty,
  getCurrentDate,
} from '@/utils/utilities';
export default {
  name: 'QuestionForm',
  props: {
    formModel: { status: Array, required: true },
  },
  components: {
    'base-header': BaseHeader,
    'base-card': BaseCard,
    'base-submit': BaseButton,
    'base-label': BaseLabel,
    'base-modal': BaseModal,
    SubQuestionForm,
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
      /**
       * The below code can be made to debounce so to listen after some
       * inputs and get the value, not using debounce as of now.
       * or the BaseInput component can be made lazy to listen input lazily.
       */
      if (type === 'password' || type === 'email') {
        //clearing errors when input value is empty
        if (!value) {
          this.clearErrors(type);
          return;
        }
        this.checkForValidation(type, value);
      }
    },
    clearErrors(type) {
      let latesErrors = this.errors;
      const errorKeys = Object.keys(latesErrors);
      errorKeys.map(errorKey => {
        latesErrors[errorKey].value = false;
      });
      this.errors = latesErrors;
    },
    checkForValidation(type, value) {
      const isTypeValidEnough = testRegx(type, value);
      this.errors[type].value = !isTypeValidEnough;
    },
    showSubQForm(subFields) {
      return !isArrayEmpty(subFields.sub_questions);
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
        rating: false,
      },
      showResultModal: false,
      formData: {},
      errors: {
        password: {
          value: false,
          text:
            'Password must contain at least 1 lowercase letter and a number',
        },
        email: {
          value: false,
          text: 'Email is not valid',
        },
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
.date {
  font-size: 11px;
  font-weight: bold;
  color: $styles-color-blue--cloud;
  padding: 10px 0;
}
</style>
