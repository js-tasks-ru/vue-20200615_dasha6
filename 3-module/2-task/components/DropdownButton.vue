<template>
  <div class="dropdown show">
    <button
      type="button"
      class="button dropdown__toggle"
      :class="{ dropdown__toggle_icon: haveIcon }"
      @click="fClose = !fClose"
    >
      <app-icon v-if="haveIcon" :icon="currentIcon" />
      {{ currentTitle }}
    </button>

    <div class="dropdown__menu" :class="{ show: !fClose }">
      <button
        v-for="item in options"
        :key="item.value"
        type="button"
        class="dropdown__item"
        :class="{ dropdown__item_icon: item.icon }"
        @click="onButtonClick(item)"
      >
        <app-icon v-if="item.icon" :icon="item.icon" />
        {{ item.text }}
      </button>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'DropdownButton',

  components: { AppIcon },

  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
    },
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  data: function () {
    return {
      fClose: true,
      currentIcon: 'key',
      currentValueText: '',
    };
  },

  computed: {
    haveIcon() {
      return this.options.some((item) => item.icon);
    },

    currentTitle() {
      let currentText = '';
      if (this.value) {
        currentText = this.options.find(
          (item) => item.value === this.value,
          this,
        );
        return `${this.title} - ${currentText.text}`;
      } else {
        return this.title;
      }
    },
  },

  methods: {
    onButtonClick(item) {
      this.$emit('change', item.value);
      this.fClose = true;
      this.currentIcon = item.icon;
    },
  },
};
</script>

<style src="../../../public/assets/styles/_button.css" scoped></style>
<style src="../../../public/assets/styles/_dropdown.css" scoped></style>
