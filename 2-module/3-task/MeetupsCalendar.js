/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */
function monthDays(currDate) {
  const d = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0);
  return d.getDate();
}

function strMonth(currDate, ratio) {
  const d = new Date(currDate.getFullYear(), currDate.getMonth() + ratio, 1);
  return d.toLocaleString('ru', { month: 'long' });
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="previousMonth"></button>
          <div>{{currentMonthAndYear}}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          v-for="day in daysArr"
          class="rangepicker__cell"
          :class="day.month !== strCurMonth ? 'rangepicker__cell_inactive' : ''"
        >
          {{day.day}}
          <a 
            v-for="meetup in day.meetups"
            class="rangepicker__event"
          >{{meetup.title}}
          </a>
        </div>
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
    };
  },

  computed: {
    currentMonthAndYear() {
      const month = this.currentDate.toLocaleString('ru', { month: 'long' });
      return `${month} ${this.currentDate.getFullYear()}`;
    },

    mapMeetups() {
      const result = {};
      this.meetups.forEach((meetup) => {
        const dateString = new Date(meetup.date).toDateString();
        if (!result[dateString]) {
          result[dateString] = [meetup];
        } else {
          result[dateString].push(meetup);
        }
      });
      return result;
    },

    strCurMonth() {
      return this.currentDate.toLocaleString('ru', {
        month: 'long',
      });
    },

    daysArr() {
      const startDate = new Date(this.currentDate);
      // задаоем 1ое число, чтобы узнать его день недели
      let firstDayCalendar = new Date(startDate.setDate(1));
      let numberWeekday = firstDayCalendar.getDay();
      // получаем строку с предыдущем месяцем
      const prevMonth = strMonth(startDate, -1);
      let resultArr = [];
      // добавляем дни из предыдущего месяца, пока не найдем пн
      while (numberWeekday !== 1) {
        firstDayCalendar.setDate(firstDayCalendar.getDate() - 1);
        resultArr.unshift({
          day: firstDayCalendar.getDate(),
          month: prevMonth,
          meetups: this.mapMeetups[firstDayCalendar.toDateString()],
        });
        numberWeekday = firstDayCalendar.getDay();
      }
      // узнаем число дней в текущем месяце
      const numMonthDays = monthDays(startDate);
      // добавляем дни текущего месяца
      for (let i = 1; i <= numMonthDays; i++) {
        resultArr.push({
          day: i,
          month: this.strCurMonth,
          meetups: this.mapMeetups[
            new Date(startDate.setDate(i)).toDateString()
          ],
        });
      }
      // добавляем дни следующего месяца
      const nextMonth = strMonth(startDate, 1);
      let currDayCalendar = new Date(startDate.setDate(numMonthDays + 1));
      while (resultArr.length < 42) {
        const currDay = currDayCalendar.getDate();
        resultArr.push({
          day: currDay,
          month: nextMonth,
          meetups: this.mapMeetups[currDayCalendar.toDateString()],
        });
        currDayCalendar.setDate(currDay + 1);
      }
      return resultArr;
    },
  },

  methods: {
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.setMonth(this.currentDate.getMonth() - 1),
      );
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.setMonth(this.currentDate.getMonth() + 1),
      );
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц
  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  // Методы понадобятся для переключения между месяцами
};
