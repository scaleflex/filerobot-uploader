export default {
  container: {
    fontFamily: 'Roboto, sans-serif',

    empty: {
      "height": "100%",
      "justifyContent": "center",
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "column"
    },

    title: {
      "fontWeight": "200",
      "marginTop": "-10%",
      fontSize: 25,
      color: '#5D636B'
    },

    searchBlock: {
      display: 'flex',
      padding: '20px',
      justifyContent: 'center'
    },

    resultBlock: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'stretch',
      paddingRight: 10,

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
}