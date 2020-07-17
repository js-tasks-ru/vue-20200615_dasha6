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
        <div
          v-for="day in daysArr"
          class="rangepicker__cell"
          :class="day.month !== strCurMonth ? 'rangepicker__cell_inactive' : ''"
        >{{day.day}}</div>
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
      strCurMonth: '',
    };
  },

  mounted() {
    this.strCurMonthAndYear = this.currentMonthAndYear();
    // this.daysArr();
  },

  computed: {
    // currentMonthAndYear() {
    //   const month = this.currentDate.toLocaleString('ru', { month: 'long' });
    //   return `${month} ${this.currentDate.getFullYear()}`;
    // },
    // currentYear() {
    //   return this.currentDate.getFullYear();
    // },
    strCurMonth() {
      return this.currentDate.toLocaleString('ru', {
        month: 'long',
      });
    },
    daysArr() {
      // задаоем 1ое число, чтобы узнать его день недели
      let firstDayCalendar = new Date(this.currentDate.setDate(1));
      console.log('firstDayCalendar', firstDayCalendar);
      let numberWeekday = firstDayCalendar.getDay();
      // получаем строку с предыдущем месяцем
      const prevMonth = strMonth(this.currentDate, -1);
      let resultArr = [];
      console.log('numberWeekday', numberWeekday);
      // добавляем дни из предыдущего месяца, пока не найдем пн
      while (numberWeekday !== 1) {
        firstDayCalendar.setDate(firstDayCalendar.getDate() - 1);
        resultArr.unshift({
          day: firstDayCalendar.getDate(),
          month: prevMonth,
        });
        numberWeekday = firstDayCalendar.getDay();
      }
      // узнаем число дней в текущем месяце
      const numMonthDays = monthDays(this.currentDate);
      // добавляем дни текущего месяца
      // const currMonth = this.currentDate.toLocaleString('ru', {
      //   month: 'long',
      // });
      for (let i = 1; i < numMonthDays; i++) {
        resultArr.push({ day: i, month: this.strCurMonth });
      }
      // добавляем дни следующего месяца
      const nextMonth = strMonth(this.currentDate, 1);
      let currDayCalendar = new Date(this.currentDate.setDate(numMonthDays));
      while (resultArr.length !== 35) {
        const currDay = currDayCalendar.getDate();
        resultArr.push({ day: currDay, month: nextMonth });
        currDayCalendar.setDate(currDay + 1);
      }
      console.log('resultArr', resultArr);
      return resultArr;
    },
  },

  methods: {
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
