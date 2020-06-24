export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{meetup.organizer}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{meetup.place}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time datetime="2020-01-01">{{localDate}}</time>
      </li>
    </ul>`,

  // Пропсы
  props: {
    meetup: {
      type: Object,
      required: true,
      default: null,
    },
  },

  // computed
  computed: {
    localDate() {
      var date = this.meetup ? new Date(this.meetup.date) : undefined;
      return date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
