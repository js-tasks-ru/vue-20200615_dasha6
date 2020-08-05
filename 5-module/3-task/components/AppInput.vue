<template>
  <div
    class="input-group"
    :class="{
      'input-group_icon': hasLeftIcon || hasRightIcon,
      'input-group_icon-left': hasLeftIcon,
      'input-group_icon-right': hasRightIcon,
    }"
  >
    <slot name="left-icon" />
    <textarea
      v-if="multiline"
      v-model="localValue"
      v-bind="$attrs"
      v-on="inputListeners"
      class="form-control"
      :class="{
        'form-control_sm': small,
        'form-control_rounded': rounded,
      }"
    />
    <input
      v-else
      v-model="localValue"
      v-bind="$attrs"
      v-on="inputListeners"
      class="form-control"
      :class="{
        'form-control_sm': small,
        'form-control_rounded': rounded,
      }"
    />
    <slot name="right-icon" />
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  inheritAttrs: false,

  props: {
    small: Boolean,
    rounded: Boolean,
    multiline: Boolean,
    value: String,
  },

  data() {
    return {
      localValue: this.value,
    };
  },

  watch: {
    value(value) {
      this.localValue = value;
    },
  },

  computed: {
    inputListeners: function () {
      var vm = this;
      // `Object.assign` объединяет объекты вместе, чтобы получить новый объект
      return Object.assign({},
        // Мы добавляем все слушатели из родителя
        this.$listeners,
        // Затем мы можем добавить собственные слушатели или
        // перезаписать поведение некоторых существующих.
        {
          // Это обеспечит, что будет работать v-model на компоненте
          input: function (event) {
            vm.$emit('input', event.target.value);
          },
          change: function (event) {
            vm.$emit('change', event.target.value);
          },
        },
      );
    },

    hasLeftIcon() {
      return this.$slots.hasOwnProperty('left-icon');
    },

    hasRightIcon() {
      return this.$slots.hasOwnProperty('right-icon');
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
