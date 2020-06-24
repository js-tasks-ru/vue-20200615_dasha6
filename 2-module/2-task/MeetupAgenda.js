import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <div class="meetup-agenda__item"  v-for="item in agenda" :key="item.id">
        <meetup-agenda-item :agendaItem="item"></meetup-agenda-item>
      </div>
    </div>`,

  // Components
  components: {
    MeetupAgendaItem,
  },

  // Props
  props: {
    agenda: {
      type: Array,
      required: true,
      default: null,
    },
  },
};
