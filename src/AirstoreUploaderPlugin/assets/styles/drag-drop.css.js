export default {
  fa: {
    display: 'inline-block',
    font: 'normal normal normal 14px/1 FontAwesome',
    textRendering: 'auto',
    width: 'auto',
    verticalAlign: 'middle'
  },

  faSpin: {
    display: 'inline-block',
    WebkitAnimation: "fa-spin 2s infinite linear",
    animation: "fa-spin 2s infinite linear"
  },

  faFw: {
    width: "1.28571429em",
    textAlign: "center"
  },

  container: {
    fontFamily: 'Roboto, sans-serif',
    "minHeight": "200px",
    "position": "relative",
    "fontWeight": "300",
    "margin": "0 auto",
    height: '100%',
    color: '#5D636B',
    "padding": 10,
    boxSizing: 'border-box',

    uploadBlock: {
      width: '100%',
      minHeight: 240,
      "textAlign": "center",
      "border": "2px dashed #d8d8d8",
      "background": "#f5f5f5",
      "height": "100%",
      "alignItems": "center",
      "justifyContent": "center",
      "display": "flex",
      color: '#5D636B',
      boxSizing: 'border-box',

      inputBox: {
        file: {
          "width": ".1px",
          "height": ".1px",
          "opacity": "0",
          "overflow": "hidden",
          "position": "absolute",
          "zIndex": "-1"
        },

        label: {
          "display": "flex",
          "flexDirection": "column",
          color: '#5D636B',

          dragDropText: {
            "display": "inline-block",
            "fontSize": "25px",
            "fontWeight": "300"
          },

          orText: {
            "padding": "10px",
            "fontWeight": "200",
            "fontSize": 12
          },

          uploadBtn: {
            "display": "inline-block",
            "zoom": "1",
            "color": "#fff",
            "backgroundColor": '#5D636B',
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
    "borderRadius": "4px",
    "WebkitBoxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
    "boxShadow": "inset 0 1px 1px rgba(0,0,0,.075)",
    "WebkitTransition": "border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s",
    "OTransition": "border-color ease-in-out .15s,box-shadow ease-in-out .15s",
    "transition": "border-color ease-in-out .15s,box-shadow ease-in-out .15s"
  }
}