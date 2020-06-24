// import { getMeetupCoverLink } from './data.js';

export const MeetupCover = {
  name: 'MeetupCover',

  template: `
    <div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{title}}</h1>
    </div>`,

  // Пропсы
  props: {
    link: {
      type: String,
      required: false,
      default: null,
    },

    title: {
      type: String,
      required: false,
      default: 'Meetup',
    },
  },

  // Возможно, тут потребуется computed
  computed: {
    coverStyle() {
      return this.link ? `--bg-url: url('${this.link}')` : undefined;
    },
  },
};
