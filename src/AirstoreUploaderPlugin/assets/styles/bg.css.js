export default {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    paddingRight: 10,
    fontFamily: 'Roboto, sans-serif',

    item: {
      width: 'calc(100% / 6 - 10px)',
      margin: '10px 0 0 10px',
      cursor: 'pointer',
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
        active: {cursor: 'progress'},

        notActive: {opacity: 0.1}
      }
    }
  }
}