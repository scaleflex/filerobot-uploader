export default {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    //justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '1% 0 1% 1%',

    item: {
      width: 'calc(15.3%)',
      marginBottom: '1%',
      marginRight: '1%',
      padding: 1,
      cursor: 'pointer',
      //flex: '1 15%',
      background: '#e7e9ee',

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