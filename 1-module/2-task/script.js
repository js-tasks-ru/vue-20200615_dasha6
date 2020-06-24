import Vue from '/vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
// function getMeetupCoverLink(meetup) {
//   return `${API_URL}/images/${meetup.imageId}`;
// }

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetup: null,
  },

  mounted() {
    // получаем данные митапа с API
    this.getData();
  },

  computed: {
    imgUrl() {
      return this.meetup
        ? `${API_URL}/images/${this.meetup.imageId}`
        : undefined;
    },
    localDate() {
      var date = this.meetup ? new Date(this.meetup.date) : undefined;
      return date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    processingAgenda() {
      return this.meetup.agenda.map((item) => {
        if (item.type === 'talk') {
          item.typeTitle = item.title;
        } else {
          item.typeTitle = agendaItemTitles[item.type];
        }
        item.icon = agendaItemIcons[item.type];
        return item;
      });
    },
  },

  methods: {
    async getData() {
      let response = await fetch(API_URL + '/meetups/' + MEETUP_ID);
      if (response.ok) {
        this.meetup = await response.json();
      } else {
        console.log('getData Ошибка HTTP: ' + response.status);
      }
    },
  },
});
