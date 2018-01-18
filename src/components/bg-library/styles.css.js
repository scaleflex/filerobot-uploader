// Scaleflex grid and common styles
const helperStyles = {
  colCommons: {
    position: 'relative',
    width: '100%',
    minHeight: 1,
    padding: '0 15px'
  }
};

export default {
  fa: {
    display: 'inline-block',
    font: 'normal normal normal 14px/1 FontAwesome',
    textRendering: 'auto',
    width: 'auto',
    verticalAlign: 'middle'
  },

  faSpin: {
    "WebkitAnimation": "fa-spin 2s infinite linear",
    "animation": "fa-spin 2s infinite linear"
  },

  faFw: {
    "width": "1.28571429em",
    "textAlign": "center"
  },

  badge: {
    "display": "inline-block",
    "minWidth": "10px",
    "padding": "2px 4px 1px", // "3px 5px 2px",
    "fontSize": "10px",
    "fontWeight": "700",
    "lineHeight": "1",
    "color": "#fff",
    "textAlign": "center",
    "whiteSpace": "nowrap",
    "verticalAlign": "middle",
    "backgroundColor": "lightgrey", // "#777",
    "borderRadius": "10px",

    active: {
      "color": "rgb(51, 122, 183)",
      "backgroundColor": "#fff",
    }
  },

  btn: {
    display: 'inline-block',
    padding: '6px 12px',
    //margin-bottom: 0,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.42857143,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    //-ms-touch-action: manipulation,
    touchAction: 'manipulation',
    cursor: 'pointer',
    //-webkit-user-select: none,
    //-moz-user-select: none,
    //-ms-user-select: none,
    userSelect: 'none',
    //backgroundImage: 'none',
    border: '1px solid transparent',
    borderRadius: '4px'
  },
  btnDefault: {
    color: '#333',
    backgroundColor: '#fff',
    border: '1px solid #ccc'
  },
  btnSuccess: {
    color: '#fff',
    backgroundColor: '#5cb85c',
    border: '1px solid #4cae4c'
  },
  btnPrimary: {
    color: '#fff',
    backgroundColor: '#337ab7',
    border: '1px solid #2e6da4'
  },

  formControl: {
    "display": "block",
    "width": "100%",
    "height": "34px",
    "padding": "6px 12px",
    "fontSize": "14px",
    "lineHeight": "1.42857143",
    "color": "#555",
    "background": "#fff",
    //"backgroundImage": "none",
    "border": "1px solid #ccc",
    "borderRadius": "4px",
    "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
    "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
    "WebkitTransition": "border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s",
    "OTransition": "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
    "transition": "border-color ease-in-out .15s,box-shadow ease-in-out .15s"
  },

  col1: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 8.333333%",
    "flex": "0 0 8.333333%",
    "maxWidth": "8.333333%"
  },

  col2: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 16.666667%",
    "flex": "0 0 16.666667%",
    "maxWidth": "16.666667%"
  },

  col3: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 25%",
    "flex": "0 0 25%",
    "maxWidth": "25%"
  },

  col4: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 33.333333%",
    "flex": "0 0 33.333333%",
    "maxWidth": "33.333333%"
  },

  col5: {
    "MsFlex": "0 0 41.666667%",
    "flex": "0 0 41.666667%",
    "maxWidth": "41.666667%"
  },

  col6: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 50%",
    "flex": "0 0 50%",
    "maxWidth": "50%"
  },

  col7: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 58.333333%",
    "flex": "0 0 58.333333%",
    "maxWidth": "58.333333%"
  },

  col8: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 66.666667%",
    "flex": "0 0 66.666667%",
    "maxWidth": "66.666667%"
  },

  col9: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 75%",
    "flex": "0 0 75%",
    "maxWidth": "75%"
  },

  col10: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 83.333333%",
    "flex": "0 0 83.333333%",
    "maxWidth": "83.333333%"
  },

  col11: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 91.666667%",
    "flex": "0 0 91.666667%",
    "maxWidth": "91.666667%"
  },

  col12: {
    ...helperStyles.colCommons,
    "MsFlex": "0 0 100%",
    "flex": "0 0 100%",
    "maxWidth": "100%"
  },


  // ICON LIBRARY STYLES ->
  container: {
    "display":"flex",
    "width":"100%",
    "height":"100%",

    sidebar: {
      "padding": "0",
      "height": "100%",
      "overflowY": "auto",
      //"border": "1px solid #ddd", // "borderRight": "1px solid #ddd",

      list: {
        "fontSize": "12px",
        "marginBottom": "0",
        "paddingLeft": "0",
        "height": "100%",
        "borderRight": "1px solid #ddd",

        item: {
          "position": "relative",
          "display": "block",
          "padding": "10px 15px",
          //"marginBottom": "-1px",
          "backgroundColor": "#fff",
          "borderBottom": "1px solid #ddd",
          "color": "#555",
          "borderRadius": "0",
          //"borderWidth": "1px 0",
          "textTransform": "capitalize",
          "textDecoration": "none",

          active: {
            "zIndex": "2",
            "color": "#fff",
            "backgroundColor": "#337ab7",
            "borderBottom": "1px solid #337ab7"
          },

          notActive: {
            //":hover": {
            //  "backgroundColor": "lightgrey",
            //}
          }
        }
      }
    },

    content: {
      "padding": 0, // "10px",
      "overflowY": "auto",
      "width": "100%",
      "height": "100%",
      "textAlign": "center",

      container: {
        "textAlign": "center",
        "display": "inline-block",
        "position": "relative",
        "width": "100%",

        gridContainer: {
          "display": "inline-block",
          "width": "100%",
          "height": "100%",

          itemContainer: {
            "width": "25%",
            "display": "block",
            "border": "none",
            "float": "left",
            "padding": "2px",

            item: {
              "position": "relative",
              "overflow": "hidden",
              //"margin": "2px",
              "padding": "10px",
              "background": "#f8f8f8",
              "display": "flex",
              "alignItems": "center",
              "justifyContent": "center",
              "height": "100%",

              img: {
                "border": "0",
                "verticalAlign": "middle",
                "display": "block",
                "margin": "auto",
                "maxWidth": "100%"
              },

              button: {
                "display": "block",
                "position": "absolute",
                "top": "0",
                "right": "0",
                "bottom": "0",
                "left": "0",
                "width": "100%",
                "zIndex": "13",
                "border": "none",
                "outline": "0",
                "background": "0 0",
                "cursor": "pointer",

                ':hover': {
                  "position": "absolute",
                  "top": "0",
                  "bottom": "0",
                  "left": "0",
                  "right": "0",
                  "background": "rgba(0,0,0,.6)"
                },

                overlay: {
                  //"visibility": "hidden",
                  "color": "#fff",
                  "fontSize": "18px",
                  "fontWeight": "700",
                  "position": "absolute",
                  "top": "50%",
                  "left": "50%",
                  "transform": "translate(-50%,-50%)"
                }
              }
            }
          }
        },

        gridOverlay: {
          "position": "absolute",
          "top": "0",
          "bottom": "0",
          "left": "0",
          "right": "0",
          "background": "rgba(255,255,255,.8)",
          "zIndex": "1000",
          "cursor": "progress"
        },

        searchBlock: {
          "display": "inline-block",
          "width": "100%",

          container: {
            "display": "block",
            "verticalAlign": "middle",
            "textAlign": "center",
            "margin": "20px auto",
            "width": "60%",

            //container: {
              //"position": "relative",
              //"display": "table",
              //"borderCollapse": "separate",
              //"margin": "0 20%",
            //}

            fieldContainer: {
              position: 'relative',
              width: '100%',

              icon: {
                "position": "absolute",
                "top": "0px",
                "left": "0px",
                "width": "34px",
                "font": "normal normal normal 14px/34px FontAwesome",
                color: "lightgrey"
              },

              field: {
                padding: "6px 12px 6px 34px",
                borderRadius: 18,
                outline: "none",

                ":focus": {
                  border: '2px solid rgb(51, 122, 183)'
                }
              }
            },

            searchField: {
              //width: "calc(100% - 70px) !important"
            },

            searchButton: {
              //width: "calc(100% - 50px)"
            }
          }
        }
      }
    }
  }
}