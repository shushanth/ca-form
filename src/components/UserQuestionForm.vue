<template>
  <BaseCard type="fullPage" shape="roundedTop" mode="default">
    <div class="question-form">
      <BaseHeader type="primary" level="medium" label="Customer Alliance Form"/>
      <UserQuestionParentForm
        :formSchema="formModel"
        @resultFormSelect="(updatedVal) => resultFormWidgetUpdate(updatedVal)"
      />
      <BaseModal
        class="resultWidget"
        v-if="showResultWidget"
        mode="modal"
        type="default"
        size="small"
        align="rightTopCorner"
      >
        <BaseLabel subLabelSize="small" :subLabel="resultWidgetData.type"/>
        <BaseLabel subLabelSize="small" :subLabel="resultWidgetData.value"/>
        <div class="date_wrapper">
          <span class="app-hz-line"></span>
          <p class="date_wrapper--display">
            DATE OF EXPERIENCE:
            {{getDate()}}
          </p>
        </div>
      </BaseModal>
    </div>
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
import UserQuestionParentForm from '@/components/UserQuestionParentForm';
export default {
  name: 'UserQuestionForm',
  props: {
    formModel: { status: Array, required: true },
  },
  components: {
    BaseHeader,
    BaseCard,
    BaseButton,
    BaseLabel,
    BaseModal,
    UserQuestionParentForm,
  },
  data() {
    return {
      showResultWidget: false,
      resultWidgetData: {},
    };
  },
  methods: {
    resultFormWidgetUpdate(formSelectConfig) {
      const { display } = formSelectConfig;
      this.showResultWidget = display;
      this.resultWidgetData = formSelectConfig;
    },
    getDate() {
      const currentYear = new Date(Date.now());
      return `${currentYear.getFullYear()}/${currentYear.getDate()}/${currentYear.getMonth() + 1}`;
    },
  } 
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
