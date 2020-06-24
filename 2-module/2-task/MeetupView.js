import { MeetupCover } from './MeetupCover.js';
import { API_URL } from './data.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <meetup-cover :title="meetup.title" :link="coverLink"></meetup-cover>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="meetup.description"></meetup-description>

            <h3>Программа</h3>
            <meetup-agenda v-if="meetup.agenda" :agenda="meetup.agenda"></meetup-agenda>
          </div>
          <div class="meetup__aside">
            <meetup-info :meetup="meetup"></meetup-info>
          </div>
        </div>
      </div>
    </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupInfo,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
      default: null,
    },
  },

  computed: {
    coverLink() {
      return this.meetup.imageId
        ? `${API_URL}/images/${this.meetup.imageId}`
        : undefined;
    },
  },
};
