<template>
  <div class="question-form">
    <base-header level="primary" label="Customer Alliance Form"></base-header>
    <base-input label="1." subLabel="How do you feel today?"></base-input>
  </div>
</template>
<script>
import BaseInput from "@/components/shared/BaseInput";
import BaseHeader from "@/components/shared/BaseHeader";
export default {
  name: "QuestionForm",
  props: {
    formModel: { status: Array, required: true }
  },
  components: {
    BaseHeader,
    BaseInput
  },
  methods: {}
};
</script>
<style lang="scss">
@import "styles/base.scss";
.question-form {
  @include styles-flex(column);
}
</style>