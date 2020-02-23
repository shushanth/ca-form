<template>
  <div class="app">
    <QuestionForm />
  </div>
</template>
<script>
import QuestionForm from "./components/QuestionForm";
export default {
  name: "App",
  components: {
    QuestionForm
  }
};
</script>
<style lang="scss">
@import "styles/base.scss";
.app {
  margin: 15px;
  background-color: $styles-color--green-sharp;
  @include styles-flex(column);
}
</style>