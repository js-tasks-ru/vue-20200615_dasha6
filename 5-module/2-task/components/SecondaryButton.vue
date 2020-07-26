<template>
  <base-button
    class="button_secondary"
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
  name: 'SecondaryButton',
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
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>
