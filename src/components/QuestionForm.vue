<template>
  <div class="question-form">
    <form-header level="primary" label="Customer Alliance Form"></form-header>
    <form-password label="3." subLabel="Your password" shape="rounded"></form-password>
    <form-email label="4." subLabel="Your email address" shape="rounded"></form-email>
    <form-submit label="submit" type="primary" size="default" align="end" shape="rounded"></form-submit>
  </div>
</template>
<script>
import BaseInput from '@/components/shared/BaseInput';
import BaseHeader from '@/components/shared/BaseHeader';
import BaseButton from '@/components/shared/BaseButton';
export default {
  name: 'QuestionForm',
  props: {
    formModel: { status: Array, required: true },
  },
  components: {
    'form-header': BaseHeader,
    'form-email': BaseInput,
    'form-password': BaseInput,
    'form-submit': BaseButton,
  },
  methods: {},
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.question-form {
  @include styles-flex(column);
}
</style>