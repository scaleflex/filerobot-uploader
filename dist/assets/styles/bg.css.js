export default {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 10,

    item: {
      //width: '16.66%',
      height: 100,
      marginBottom: 10,
      padding: 1,
      cursor: 'pointer',
      //flex: '1 15%',
      background: '#34444c',

      alignmentBlock: {
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%'
      },

      img: {
        display: 'inline-block',
        verticalAlign: 'middle'
      },

      loading: {
        active: { cursor: 'progress' },

        notActive: { opacity: 0.1 }
      }
    }
  }
};