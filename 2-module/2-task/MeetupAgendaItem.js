import { agendaItemIcons, agendaItemTitles } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="conformingIcon" />
      </div>
      <div class="meetup-agenda__item-col">{{agendaItem.startsAt}} - {{agendaItem.endsAt}}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{conformingTitle}}</h5>
        <p v-if="agendaItem.type === 'talk'">
          <span>Докладчик</span>
          <span class="meetup-agenda__dot">{{agendaItem.speaker}}</span>
          <span class="meetup-agenda__lang">{{agendaItem.language}}</span>
        </p>
        <p>{{agendaItem.description}}</p>
      </div>
    </div>`,

  // Пропсы
  props: {
    agendaItem: {
      type: Object,
      required: true,
      default: null,
    },
  },

  // Тут помогут computed
  computed: {
    conformingIcon() {
      const iconType = agendaItemIcons[this.agendaItem.type];
      return `/assets/icons/icon-${iconType}.svg`;
    },
    conformingTitle() {
      if (this.agendaItem.type === 'talk') {
        return this.agendaItem.title;
      } else {
        return agendaItemTitles[this.agendaItem.type];
      }
    },
  },
};
