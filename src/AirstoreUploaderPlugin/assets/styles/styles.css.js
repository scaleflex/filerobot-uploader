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


  // TABS styles ->
  tabs: {
    fontFamily: 'Roboto, sans-serif',

    // HEADER
    header: {
      // "position": "absolute",
      "whiteSpace": "nowrap",
      // "top": "0",
      "lineHeight": "40px",
      "width": "100%",
      "height": "40px",
      "zIndex": "2",
      "fontSize": "16px",
      "fontWeight": "600",

      container: {
        // "position": "absolute",
        // "top": "3px",
        "lineHeight": "1",
        "height": "100%",
        "display": "flex",

        item: {
          fontFamily: 'Roboto, sans-serif',
          "color": "#c0c1c1",
          "textDecoration": "none",
          "fontSize": "12px",
          lineHeight: '16px',
          "padding": "11px 12px 13px",
          "cursor": "pointer",
          "borderRadius": "3px 3px 0 0",
          "borderLeft": "2px solid transparent",
          "borderRight": "2px solid transparent",
          "borderTop": "2px solid transparent",
          "borderBottomWidth": "0",
          "textTransform": "uppercase",
          "fontWeight": "400",
          "display": "inline-block",
          verticalAlign: 'top',

          ":first-child": {
            marginLeft: "5px"
          },

          selected: {
            "color": "#fff",
            "backgroundColor": "rgb(64, 84, 91)"
          },

          ':hover': {
            "color": "#fff"
          },

          //':focus': {
          //  outline: 'none',
          //  border: '2px solid #4D90FE',
          //  boxShadow: '0px 0px 5px  #4D90FE'
          //},

          i: {
            fontSize: 16,
            marginRight: 5,
            display: 'inline-block',
            verticalAlign: 'top'
          },

          text: {
            '@media screen and (max-width: 600px)': {
              display: 'none'
            }
          }
        }
      }
    },

    // CONTENT
    content: {
      // "position": "absolute",
      "zIndex": "1",
      // "bottom": "0",
      // "right": "0",
      // "left": "0",
      // "top": "50px",
      "border": "1px solid #ddd", // "borderTop": "1px solid #ddd",
      "background": "rgb(245, 245, 245)",
      "overflow": "auto",
      "WebkitTransition": "all .3s cubic-bezier(.25,.46,.45,.94)",
      "transition": "all .3s cubic-bezier(.25,.46,.45,.94)",
      "display": "flex",
      "height": "100%"
    }
  },
  // <- TABS styles


  field: {
    "height": "34px",
    "padding": "6px 12px",
    "fontSize": "14px",
    "lineHeight": "1.42857",
    "color": "rgb(85, 85, 85)",
    "background": "rgb(255, 255, 255)",
    "borderRadius": "4px",
    "boxShadow": "rgba(0, 0, 0, 0.075) 0px 1px 1px inset",
    "transition": "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    "border": "1px solid rgb(204, 204, 204)",
    "marginRight": "10px",
    "outline": "0px",

    ':focus': {
      border: '1px solid #5D636B',
      outlineColor: 'rgb(77, 144, 254)',
      outlineOffset: -2,
      outlineStyle: 'auto',
      outlineWidth: 5
    }
  },

  button: {
    fontFamily: 'Roboto, sans-serif',
    "height": "34px",
    "padding": "6px 12px",
    "lineHeight": "1.42857",
    "textTransform": 'uppercase',
    "color": "#5D636B",
    "backgroundColor": "transparent",
    "backgroundRepeat": "repeat-x",
    "textShadow": "rgb(255, 255, 255) 0px 1px",
    "border": "1px solid #5D636B",
    "borderRadius": "5px",
    "cursor": "pointer",
    "fontWeight": "500",
    "outline": "0",
    "fontSize": 12,

    ':hover': {
      "backgroundColor": '#6D737B',
      "color": "#fff"
    },

    ':focus': {
      outlineColor: 'rgb(77, 144, 254)',
      outlineOffset: -2,
      outlineStyle: 'auto',
      outlineWidth: 5
    }
  }
}