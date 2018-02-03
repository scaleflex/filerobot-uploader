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

  container: {
    fontFamily: "'Roboto', sans-serif",
    "minHeight": "200px",
    "width": "100%",
    "height": "100%",
    "position": "relative",
    "fontWeight": "300",
    "margin": "0 auto",
    "padding": 3,

    uploadBlock: {
      "textAlign": "center",
      "border": "2px dashed #d8d8d8",
      "background": "#f5f5f5",
      // "position": "absolute",
      // "top": "5px",
      // "left": "5px",
      // "right": "5px",
      // "bottom": "5px",
      // "display": "flex",
      // "alignItems": "center",
      // "justifyContent": "center",
      "height": "100%",
      "alignItems": "center",
      "justifyContent": "center",
      "display": "flex",

      inputBox: {
        // "width": "100%",
        // "display": "block",
        // "display": "flex",
        // "flex-direction": "column",


        file: {
          "width": ".1px",
          "height": ".1px",
          "opacity": "0",
          "overflow": "hidden",
          "position": "absolute",
          "zIndex": "-1"
        },

        label: {
          // "maxWidth": "80%",
          // "minWidth": "50%",
          // "textOverflow": "ellipsis",
          // "whiteSpace": "nowrap",
          // "display": "inline-block",
          // "overflow": "hidden",
          // "marginBottom": "5px",
          // "fontWeight": "700",
          "display": "flex",
          "flexDirection": "column",

          dragDropText: {
            "display": "inline-block",
            "fontSize": "25px",
            "color": "#878787",
            "fontWeight": "300"
          },

          orText: {
            "color": "#bababa",
            "padding": "15px",
            "fontWeight": "200",
            "fontSize": 12
          },

          uploadBtn: {
            "display": "inline-block",
            "zoom": "1",
            "color": "#444",
            "backgroundColor": "#ddd",
            "backgroundRepeat": "repeat-x",
            "backgroundImage": "linear-gradient(to bottom,#f4f4f4,#ddd)",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#f4f4f4', endColorstr='#dddddd', GradientType=0)",
            "textShadow": "0 1px #fff",
            "border": "1px solid #ccc",
            "borderRadius": "5px",
            //"padding": "5px 10px",
            "cursor": "pointer",
            "fontWeight": "300",
            "padding": "3px 8px",
            "textDecoration": "none",
            outline: 0
          }
        },

        submitBtn: {
          "color": "#e5edf1",
          "backgroundColor": "#39bfd3",
          "display": "none",
          "padding": "8px 16px",
          "margin": "40px auto 0"
        }
      },

      uploadingBox: {},

      errorBox: {
        "position": "absolute",
        "bottom": "5%",
        "width": "100%",
        //"display": "none",

        errorMsg: {
          "background": "#fdc",
          "borderRadius": "3px",
          "maxWidth": "50%",
          "display": "inline-block",
          "zoom": "1",
          "color": "#806f66",
          "padding": "6px 10px"
        }
      }
    }
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
    //"border": "1px solid #ccc",
    "borderRadius": "4px",
    "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
    "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
    "WebkitTransition": "border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s",
    "OTransition": "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
    "transition": "border-color ease-in-out .15s,box-shadow ease-in-out .15s"
  }
};