import Vue from '/vendor/vue.esm.browser.js';

const app = new Vue({
  el: '#app',
  data: {
    count: 0,
  },
  methods: {
    onButtonClick() {
      this.count++;
    },
  },
});
