<template>
  <button @click="onButtonClick">{{ count }}</button>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
      required: false,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  methods: {
    onButtonClick() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>
