<template>
  <div class="question-form">
    <form-header level="primary" label="Customer Alliance Form"></form-header>
    <form-ratings label="1." subLabel="How do you feel today?" shape="round" :radioItems="ratings"></form-ratings>
    <form-password label="3." subLabel="Your password" shape="rounded"></form-password>
    <form-email label="4." subLabel="Your email address" shape="rounded"></form-email>
    <form-submit label="submit" type="primary" size="default" align="end" shape="rounded" @onClick="onFormSubmit"></form-submit>
  </div>
</template>
<script>
import BaseInput from '@/components/shared/BaseInput';
import BaseHeader from '@/components/shared/BaseHeader';
import BaseButton from '@/components/shared/BaseButton';
import BaseRadioGroup from '@/components/shared/BaseRadioGroup';
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
    'form-ratings': BaseRadioGroup,
  },
  methods: {
    onFormSubmit() {
      console.log('sumbit');
    },
  },
  data() {
    return {
      ratings: {
        selected: '1',
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
    };
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.question-form {
  @include styles-flex(column);
}
</style>
