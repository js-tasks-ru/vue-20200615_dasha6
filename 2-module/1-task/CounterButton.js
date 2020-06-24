export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: '<button type="button" @click="onButtonClick">{{count}}</button>',

  data: function () {
    return {
      _count: 0,
    };
  },

  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  mounted() {
    this._count = this.count;
  },

  methods: {
    onButtonClick() {
      this._count++;
      this.$emit('increment', this._count);
    },
  },

  // Компонент должен иметь пропс

  // Компонент должен иметь модель

  // Шаблон лучше иметь максимально простым, а логику выносить в методы
};
