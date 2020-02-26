<template>
  <BaseCard type="fullPage" shape="roundedTop" mode="default">
    <div class="question-form">
      <BaseHeader type="primary" level="medium" label="Customer Alliance Form"/>
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
      <BaseButton
        label="Submit"
        type="primary"
        size="default"
        align="end"
        shape="rounded"
        @onClick="onFormSubmit"
      />
    </div>
    <BaseModal
      class="resultWidget"
      v-if="showResultWidget"
      mode="modal"
      type="default"
      size="small"
      align="rightTopCorner"
    >
      <BaseLabel subLabelSize="small" subLabel="How do you feel today ?"/>
      <BaseLabel subLabelSize="small" :subLabel="selectedFormValue.rating"/>
      <div class="date_wrapper">
        <span class="app-hz-line"></span>
        <p class="date_wrapper--display">
          DATE OF EXPERIENCE:
          {{getDate()}}
        </p>
      </div>
    </BaseModal>
  </BaseCard>
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
  validateExpression,
  isArrayEmpty,
  getCurrentDate,
  RATINGS_OPTIONS,
  AGE_OPTIONS,
  ERROR_TEXTS,
  uuid,
} from '@/utils/utilities';
export default {
  name: 'QuestionForm',
  props: {
    formModel: { status: Array, required: true },
  },
  components: {
    BaseHeader,
    BaseCard,
    BaseButton,
    BaseLabel,
    BaseModal,
    SubQuestionForm,
  },
  data() {
    return {
      formData: {},
      selectedFormValue: {
        rating: '',
      },
      showResultWidget: false,
      errors: {
        password: {
          value: false,
          text: ERROR_TEXTS['password'],
        },
        email: {
          value: false,
          text: ERROR_TEXTS['email'],
        },
      },
      subFormModelActive: this.getActiveValues(),
      ratings: RATINGS_OPTIONS,
      ages: AGE_OPTIONS,
    };
  },
  updated() {
    const { rating } = this.selectedFormValue;
    if (this.subFormModelActive[0].includes(rating)) {
      this.showResultWidget = true;
    } else {
      this.showResultWidget = false;
    }
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
    getActiveValues() {
      const activeValues = this.formModel.map(model => {
        const values = model.sub_questions.filter(
          sQuestions => sQuestions.values
        );
        return values.map(val => val.values).flat(Infinity);
      });
      return activeValues;
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
      const isTypeValidEnough = validateExpression(type, value);
      this.errors[type].value = !isTypeValidEnough;
    },
    showSubQForm(subFields) {
      const areSubFieldsNotEmpty = !isArrayEmpty(
        subFields.sub_questions
      );
      return areSubFieldsNotEmpty;
    },
    getDate() {
      const currentDate = new Date();
      return `${currentDate.getFullYear()}/${currentDate.getDay()}/${currentDate.getMonth()}`;
    }
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
.resultWidget {
  @include styles-devices-mobile() {
    display: none;
  }
}
</style>
