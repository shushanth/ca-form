<template>
  <BaseCard type="fullPage" shape="roundedTop" mode="default">
    <div class="question-form">
      <BaseHeader type="primary" level="medium" label="Customer Alliance Form"/>
      <QuestionParentForm :formSchema="formModel"/>
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
import QuestionParentForm from '@/components/QuestionParentForm';
// import SubQuestionForm from '@/components/SubQuestionForm';
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
    QuestionParentForm
    // SubQuestionForm,
  }
};
</script>
<style lang="scss">
</style>
