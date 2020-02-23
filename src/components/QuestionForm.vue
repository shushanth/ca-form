<template>
  <div class="question-form">{{returnString()}}</div>
</template>
<script>
export default {
  name: "QuestionForm",
  props: {
    formModel: { status: Array, required: true }
  },
  methods: {
    returnString() {
      return JSON.stringify(this.formModel);
    }
  }
};
</script>
<style lang="scss">
@import "styles/base.scss";
.question-form {
  @include styles-flex(column);
}
</style>