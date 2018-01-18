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

    // HEADER
    header: {
      "position": "absolute",
      "whiteSpace": "nowrap",
      "top": "0",
      "lineHeight": "50px",
      "width": "100%",
      "height": "50px",
      "zIndex": "2",
      "fontSize": "16px",
      "fontWeight": "600",
      "padding": "0 15px",

      container: {
        "position": "absolute",
        "top": "3px",
        "lineHeight": "1",
        "height": "100%",

        item: {
          "color": "#636972",
          "textDecoration": "none",
          "fontSize": "14px",
          "padding": "10px 20px 13px",
          "cursor": "pointer",
          "margin": "10px 1px 0",
          "borderRadius": "3px 3px 0 0",
          "border": "1px solid transparent",
          //"borderBottomWidth": "0",
          "textTransform": "uppercase",
          "fontWeight": "700",
          "display": "inline-block",

          ":first-child": {
            marginLeft: "5px"
          },

          selected: {
            "background": "#fff",
            "border": "1px solid #ddd",
            //"borderBottomWidth": "0",
            "color": "#4b5056"
          },

          i: {
            marginRight: 5
          }
        }
      }
    },

    // CONTENT
    content: {
      "position": "absolute",
      "zIndex": "2",
      "bottom": "0",
      "right": "0",
      "left": "0",
      "top": "50px",
      "border": "1px solid #ddd", // "borderTop": "1px solid #ddd",
      "background": "#fff",
      "overflow": "auto",
      "WebkitTransition": "all .3s cubic-bezier(.25,.46,.45,.94)",
      "transition": "all .3s cubic-bezier(.25,.46,.45,.94)",
      "display": "flex"
    }
  }
  // <- TABS styles
}