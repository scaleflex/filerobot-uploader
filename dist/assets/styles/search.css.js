export default {
  container: {
    empty: {
      "height": "100%",
      "justifyContent": "center",
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "column"
    },

    title: {
      "textTransform": "uppercase",
      "fontWeight": "200",
      "marginTop": "-10%"
    },

    searchBlock: {
      display: 'flex',
      padding: '20px',
      justifyContent: 'center'
    },

    resultBlock: {
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
  }
};