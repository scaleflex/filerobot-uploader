(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{564:function(e,r,t){"use strict";t.r(r);var o=t(1),n=t.n(o),i=t(711),a=t.n(i);function l(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=[],o=!0,n=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(o=(a=l.next()).done)&&(t.push(a.value),!r||t.length!==r);o=!0);}catch(e){n=!0,i=e}finally{try{o||null==l.return||l.return()}finally{if(n)throw i}}return t}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(r){u(e,r,t[r])})}return e}function u(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var s=function(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3?arguments[3]:void 0;t.closeOnEdit?o():"TAGGING"===e?r(!0,"TAGGING","MY_GALLERY"):r(!1)},p=function(e,r,t,o,n){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},a=arguments.length>6?arguments[6]:void 0;i.closeOnEdit?a():"TAGGING"===e?(o([c({},t,{public_link:t.url_permalink})]),n(!0,"TAGGING")):n(!1)},d=function(e){var r=e.appState,t=e.files,o=l(t=void 0===t?{}:t,1)[0],i=void 0===o?{}:o,u=e.path,d=e.saveUploadedFiles,f=e.setPostUpload,m=e.options,g=e.closeModal,_=r.prevTab,y=r.config,v=y.uploadKey,E=y.container,b=y.uploadParams,O={filerobotUploadKey:v,filerobotContainer:E,processWithCloudimage:"gif"===i.url_permalink.slice(-3).toLowerCase(),uploadWithCloudimageLink:!0,cloudimageToken:"demo",uploadParams:c({},b,{dir:u||b.dir})};return n.a.createElement(a.a,{show:!0,config:O,closeOnLoad:!1,src:i.url_permalink,onComplete:function(e,r){p(_,e,r,d,f,m,g)},onClose:function(){s(_,f,m,g)},showGoBackBtn:!0,showInModal:!1})};r.default=d;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(s,"goBack","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/imageEditor/ImageEditorWrapper.js"),__REACT_HOT_LOADER__.register(p,"onComplete","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/imageEditor/ImageEditorWrapper.js"),__REACT_HOT_LOADER__.register(d,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/imageEditor/ImageEditorWrapper.js"))}}]);