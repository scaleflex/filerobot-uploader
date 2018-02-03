export default {
  container: {
    display: 'flex',
    height: '100%',

    // Sidebar
    sidebarWrap: {
      width: 160,
      borderRight: '1px solid rgb(221, 221, 221)',
      position: 'relative',

      sidebar: {
        overflow: 'auto',
        height: '100%',
        top: 0,
        position: 'absolute',
        width: '100%',

        categoryItem: {
          padding: '10px 15px',
          fontSize: 12,
          color: 'rgb(85, 85, 85)',
          background: '#fff',
          borderBottom: '1px solid rgb(221, 221, 221)',
          textTransform: 'capitalize',
          display: 'flex',
          cursor: 'pointer',

          active: {
            background: 'rgb(51, 122, 183)',
            color: 'rgb(255, 255, 255)'
          },

          name: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          },

          count: {
            flex: 1,
            marginLeft: 5,
            fontSize: 10
          }
        }
      }
    },

    // Content
    content: {
      flex: 1,
      overflow: 'auto',

      loading: {
        textAlign: 'center',
        padding: 20,
        width: '100%',
        textTransform: 'uppercase'
      },

      results: {
        display: 'flex',
        flexWrap: 'wrap',

        icon: {
          width: '16.66%',
          height: 'auto',
          margin: 0,
          padding: 2,

          loading: {
            active: { cursor: 'progress' },
            notActive: { opacity: 0.1 }
          },

          imageWrap: {
            padding: 5,
            width: '100%',
            height: '100%',
            background: 'rgb(248, 248, 248)',
            cursor: 'pointer'
          }
        }
      }
    }
  },

  search: {
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