"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  container: {
    "position": "fixed",
    "top": "0",
    "bottom": "0",
    "left": "0",
    "right": "0",
    "overflowY": "auto",
    "backgroundColor": "rgba(0,0,0,.6)",
    "zIndex": "3001",

    '@media (min-width: 768px)': {
      "padding": "10px"
    },

    modal: {
      "position": "relative",
      "margin": "0",
      "backgroundColor": "#fff",
      "width": "100%",
      "height": "100%",
      "overflowY": "auto",

      '@media (min-width: 768px)': {
        "minHeight": "300px",
        "maxHeight": "550px",
        "left": "50%",
        "transform": "translate(-50%,0)",
        "borderRadius": "4px",
        "width": "700px",
        "height": "auto",
        "display": "table",
        "boxShadow": "0 3px 8px rgba(0,0,0,.5)",
        "position": "relative"
      },

      '@media (min-width: 1200px)': {
        width: 930
      },

      content: {
        "fontSize": "16px",
        "color": "#636972",
        "zIndex": "2100",
        "position": "relative",
        "overflow": "hidden",
        "margin": "0 auto",
        "borderRadius": "4px",
        "boxShadow": "0 1px 8px rgba(0,0,0,.7)",
        "opacity": "1",
        "WebkitTransition": "all .3s",
        "transition": "all .3s",
        "transform": "translate3d(0,0,0)",
        "WebkitTransform": "initial",
        "width": "100%",
        "height": "100%",
        "background": "#f5f5f5"
      },

      removeBtn: {
        "zIndex": "3",
        "position": "absolute",
        "right": "12px",
        "top": "9px",
        "fontSize": "20px",
        "cursor": "pointer"
      }
    }
  }
};