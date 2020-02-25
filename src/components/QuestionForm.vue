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
    <base-modal id="resultWidget" mode="modal" type="default" size="small" align="rightTopCorner">
      <base-label subLabelSize="small" subLabel="How do you feel today ?"/>
      <base-label subLabelSize="small" :subLabel="selectedFormValue.rating"/>
      <div class="date_wrapper">
        <span class="app-hz-line"></span>
        <p class="date_wrapper--display">
          DATE OF EXPERIENCE:
          {{getDate()}}
        </p>
      </div>
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
  RATINGS_OPTIONS,
  AGE_OPTIONS,
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
  data() {
    return {
      selectedFormValue: {
        rating: false,
      },
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
      ratings: RATINGS_OPTIONS,
      ages: AGE_OPTIONS,
    };
  },
  methods: {
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
      const areSubFieldsEmpty = !isArrayEmpty(
        subFields.sub_questions
      );
      return areSubFieldsEmpty;
    },
    getDate() {
      const currentDate = new Date();
      return `${currentDate.getFullYear()}/${currentDate.getDay()}/${currentDate.getMonth()}`;
    },
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.question-form {
  @include styles-flex(column);
  width: 80%;
}
.date_wrapper {
  padding: 18px 0 10px 0;
  &--display {
    font-size: 11px;
    font-weight: bold;
    color: $styles-color-blue--cloud;
    padding: 10px 0;
  }
}
</style>
