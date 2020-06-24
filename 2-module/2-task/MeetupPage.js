import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div><meetup-view :meetup="meetup" ></meetup-view></div>`,

  // Components
  components: {
    'meetup-view': MeetupView,
  },

  // Data
  data: function () {
    return {
      meetup: {},
    };
  },

  // Mounted
  mounted() {
    // получаем данные митапа с API
    this.getData();
  },

  // Methods
  methods: {
    async getData() {
      this.meetup = await fetchMeetup(MEETUP_ID);
    },
  },
};
