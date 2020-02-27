<template>
  <div class="app">
    <QuestionForm :formModel="questionsModel"></QuestionForm>
  </div>
</template>
<script>
import QuestionForm from '@/components/QuestionForm';
/*
 FORM_MODEL would be an API response and the model can be used to manage state using any of 
 state management system, here the whole response is extracted directly from formMode.js file
 and using this response and feeding the same to the app. not using any state or API entities.
*/
import { FORM_MODEL } from './formModel.js';
const { questions } = FORM_MODEL;
export default {
  name: 'App',
  components: {
    QuestionForm,
  },

  data() {
    return {
      questionsModel: questions,
    };
  },
};
</script>
<style lang="scss">
@import 'styles/base.scss';
.app {
  @include styles-flex(column);
  padding: 50px 180px 0;
  background-color: $styles-color-gray-medium;

  @include styles-devices-mobile() {
    padding: 0;
  }
}
</style>