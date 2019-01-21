export default {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    paddingRight: 10,
    fontFamily: 'Roboto, sans-serif',
    // height: 1,
    flex: '1 1 0%',
    overflow: 'auto',

    item: {
      position: 'relative',
      display: 'inline-block',
      margin: '10px 0 0 10px',
      cursor: 'pointer',
      background: '#e7e9ee',

      alignmentBlock: {
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%'
      },

      img: {
        //display: 'inline-block',
        //verticalAlign: 'middle'
      },

      loading: {
        active: {cursor: 'progress'},

        notActive: {opacity: 0.1}
      },

      ':focus': {
        outlineColor: 'rgb(77, 144, 254)',
        outlineOffset: -2,
        outlineStyle: 'auto',
        outlineWidth: 5
      }
    }
  }
}