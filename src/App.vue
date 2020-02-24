<template>
  <div class="app">
    <QuestionForm :formModel="questionsModel"></QuestionForm>
  </div>
</template>
<script>
import QuestionForm from '@/components/QuestionForm';
/*
 FORM_MODEL an API response and can use to manage state of question form component  
*/
import { FORM_MODEL } from './formModel.js';
export default {
  name: 'App',
  components: {
    QuestionForm,
  },

  data() {
    return {
      questionsModel: FORM_MODEL.questions,
    };
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.app {
  @include styles-flex(column);
  background-color: $styles-color-gray-medium;
}
</style>