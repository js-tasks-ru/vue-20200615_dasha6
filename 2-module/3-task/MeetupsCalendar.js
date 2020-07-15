/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */
function monthDays(currDate) {
  const d = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
  return d.getDate();
}

function strMonth(currDate, ratio) {
  console.log('currDate', currDate);
  const d = new Date(currDate.getFullYear(), currDate.getMonth() + ratio, 1);
  console.log('d', d);
  return d.toLocaleString('ru', { month: 'long' });
}

// function strPrevMonth(currDate) {
//   const d = new Date(currDate.getFullYear(), currDate.getMonth() - 1, 0);
//   return d.toLocaleString('ru', { month: 'long' });
// }

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="previousMonth"></button>
          <div>{{strCurMonthAndYear}}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div class="rangepicker__cell rangepicker__cell_inactive">28</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">29</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">30</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">31</div>
        <div class="rangepicker__cell">
          1
          <a class="rangepicker__event">Митап</a>
          <a class="rangepicker__event">Митап</a>
        </div>
        <div class="rangepicker__cell">2</div>
        <div class="rangepicker__cell">3</div>
      </div>
    </div>
  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data: function () {
    return {
      currentDate: new Date(),
      strCurMonthAndYear: '',
    };
  },

  mounted() {
    this.strCurMonthAndYear = this.currentMonthAndYear();
    this.daysArr();
  },

  computed: {
    // currentMonthAndYear() {
    //   const month = this.currentDate.toLocaleString('ru', { month: 'long' });
    //   return `${month} ${this.currentDate.getFullYear()}`;
    // },
    // currentYear() {
    //   return this.currentDate.getFullYear();
    // },
  },

  methods: {
    daysArr() {
      let firstDayCalendar = new Date(this.currentDate.setDate(1));
      console.log('firstDayCalendar', firstDayCalendar);
      let numberWeekday = firstDayCalendar.getDay();

      const prevMonth = strMonth(this.currentDate, -1);
      let resultArr = [];
      console.log('numberWeekday', numberWeekday);
      while (numberWeekday !== 0) {
        const currDay = firstDayCalendar.getDate();
        resultArr.unshift({ day: currDay, month: prevMonth });
        firstDayCalendar.setDate(currDay - 1);
        numberWeekday = firstDayCalendar.getDay();
      }
      console.log('resultArr', resultArr);
      const numMonthDays = monthDays(this.currentDate);
      console.log('numMonthDays', numMonthDays);

      const currMonth = this.currentDate.toLocaleString('ru', {
        month: 'long',
      });
      for (let i = 2; i < numMonthDays; i++) {
        resultArr.push({ day: i, month: currMonth });
      }

      const nextMonth = strMonth(this.currentDate, 1);
      let currDayCalendar = new Date(this.currentDate.setDate(numMonthDays));
      while (resultArr.length !== 35) {
        const currDay = currDayCalendar.getDate();
        resultArr.push({ day: currDay, month: nextMonth });
        currDayCalendar.setDate(currDay + 1);
      }
      console.log('resultArr', resultArr);
    },

    previousMonth() {
      console.log('previousMonth');
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      console.log(
        'previousMonth',
        this.currentDate.toLocaleString('ru', { month: 'long' }),
      );
      this.strCurMonthAndYear = this.currentMonthAndYear();
    },
    nextMonth() {
      console.log('nextMonth');
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.strCurMonthAndYear = this.currentMonthAndYear();
    },
    currentMonthAndYear() {
      // console.log('currentMonthAndYear', this.currentDate.getMonth());
      const month = this.currentDate.toLocaleString('ru', { month: 'long' });
      return `${month} ${this.currentDate.getFullYear()}`;
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  // Методы понадобятся для переключения между месяцами
};
