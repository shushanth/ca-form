<template>
  <form-card position="default" shape="rounded">
    <div class="question-form">
      <form-header level="primary" label="Customer Alliance Form"/>
      <form-ratings
        label="1."
        type="radio"
        subLabel="How do you feel today?"
        shape="round"
        :radioItems="ratings"
        :isRadioSelected="false"
      />
      <form-age
        label="2."
        type="buttons"
        subLabel="Your age"
        :radioButtonsItems="ages"
        size="default"
        :isRadioButtonSelected="false"
      />
      <form-password label="3." type="password" subLabel="Your password" shape="rounded"/>
      <form-email label="4." type="text" subLabel="Your email address" shape="rounded"/>
      <form-submit
        label="submit"
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
    'form-age': BaseRadioGroup,
    'form-card': BaseCard,
  },
  methods: {
    onFormSubmit() {
      console.log('sumbit');
    },
  },
  data() {
    return {
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
}
</style>
