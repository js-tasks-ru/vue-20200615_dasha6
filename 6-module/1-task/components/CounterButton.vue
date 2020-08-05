<template>
  <button @click="onClick">{{ this.localCount }}</button>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(value) {
      this.localCount = value;
    },
  },

  methods: {
    onClick() {
      this.localCount++;
      this.$emit('increment', this.localCount);
    },
  },
};
</script>

<style></style>
