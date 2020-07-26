<template>
  <base-button
    class="button_primary"
    v-on="$listeners"
    :block="block"
    :tag="tag"
  >
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'PrimaryButton',
  components: { BaseButton },
  props: {
    block: {
      type: Boolean,
    },
    tag: {
      type: String,
      default: 'button',
      validator: function (value) {
        // Значение должно соответствовать одной из этих строк
        return ['button', 'a', 'router-link'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style scoped>
.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}
</style>
