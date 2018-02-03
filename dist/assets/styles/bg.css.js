export default {
  container: {
    display: 'flex',
    flexWrap: 'wrap',

    item: {
      width: '16.66%',
      padding: 1,
      cursor: 'pointer',

      loading: {
        active: { cursor: 'progress' },

        notActive: { opacity: 0.1 }
      }
    }
  }
};