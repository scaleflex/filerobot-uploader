(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{566:function(e,t,r){"use strict";r.r(t);var o=r(1),n=r.n(o),a=r(18),i=r(585),c=r(586),s=r(578),l=r(574),u=r(122),d=r.n(u),p=r(119),g="https://www.openpix.net/v3/",f="https://jolipage-public-assets.api.airstore.io/v1/list?dir=/Backgrounds/v1",h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"json";return new Promise(function(a,i){d()({url:e,method:t,data:r,responseType:n,headers:o,timeout:3e4}).then(function(r){var o=r.data,n=void 0===o?{}:o,c=n.status;"success"===(void 0===c?"error":c)?(a(n),"get"===t.toLowerCase()&&sessionStorage.setItem(e,JSON.stringify(n))):i(r)},function(e){var t=e.data;i(void 0===t?{}:t)})})},_=function(){return Object(p.e)("".concat(f)).then(function(e){e.status;var t=e.files;return(void 0===t?[]:t).map(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{src:e.url_public||e.url_permalink,id:e.uuid,name:e.name,alt:""}})})},m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=e.colorFiltersQuery,o=e.limit,n=e.offset,a=e.openpixKey,i=e.value.trim().split(" "),c=e.value?"&q[]=".concat(i.map(function(e){return e.trim()}).join("&q[]=")):"",s=t.map(function(e){return"&q[]=".concat(e)}).join(""),l="&limit=".concat(o),u="&offset=".concat(n),d="&key=".concat(a);return h("".concat(g,"search?").concat(c).concat(s).concat(r).concat(l).concat(u).concat(d)).then(function(e){var t=e.related_tags,r=void 0===t?[]:t,o=e.related_top_colors,n=void 0===o?[]:o,a=e.images,i=void 0===a?[]:a,c=e.count;return{images:i,count:void 0===c?0:c,related_tags:r,related_top_colors:n}})},v=function(){return h("".concat(g,"pictures/tags")).then(function(e){return e.tags})},y=("undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(g,"api_endpoint","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(f,"backgroundsAPI","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(h,"_send","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(_,"getBackgrounds","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(m,"searchImages","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(v,"getImagesTags","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imagesApi.service.js")),r(15)),b=r(582),C=r(4),T=function(e){var t=e.activePresetTag,r=e.activeColorFilters,o=e.tags,i=e.backgrounds,c=e.onChangeColorFilter,s=e.onRemoveColorFilter,l=e.addColorFilter,u=e.onActivatePresetTag;return n.a.createElement(a.ab,null,n.a.createElement(a.Z,null,n.a.createElement(a.L,{fs:"16px",color:"black"},C.I18n.t("images.color_filter")),n.a.createElement("div",{style:{margin:"0 10px"}},r.map(function(e,t){return n.a.createElement(a.i,{index:t,key:"colorFilter-".concat(t),color:e.value,onChangeColorFilter:c,onRemoveColorFilter:s})})),n.a.createElement("div",{style:{padding:"5px 10px 12px"}},n.a.createElement(a.b,{onClick:l,onKeyDown:function(e){13===e.keyCode&&l()},tabIndex:0,role:"button"},"+ ",C.I18n.t("images.add_color"))),n.a.createElement(a.L,{fs:"16px",color:"black"},C.I18n.t("upload.categories")),o.length&&n.a.createElement(a.k,{key:"category-background",active:"backgrounds"===t,onClick:function(){u("backgrounds")},tabIndex:0,role:"button"},n.a.createElement(a.l,null,C.I18n.t("images.backgrounds")," "),n.a.createElement(a.p,null,"(",i.length,")")),o.slice(0,20).map(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.tag,o=e.label,i=e.count;arguments.length>1&&arguments[1];return n.a.createElement(a.k,{key:"category-".concat(r),active:r===t,onClick:function(){u(r)},onKeyDown:function(e){13===e.keyCode&&u(r)},tabIndex:0,role:"button"},n.a.createElement(a.l,null,o||r.replace(/_/g," ").trim()),n.a.createElement(a.p,null,"(",i,")"))}),o.length?null:n.a.createElement(y.a,{black:!0,show:!0,style:{fontSize:8,top:10,opacity:.4}})))},E=T,O=("undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(T,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/ImagesTab/ImagesSidebar.js"),r(598)),S=function(e){var t=e.colorFilter,r=e.handleClose,o=e.handleChange;return n.a.createElement(a.cb,null,n.a.createElement(a.bb,{onClick:r}),n.a.createElement(O.SketchPicker,{color:t.value,onChange:o}),n.a.createElement(a.e,{sm:!0,themeColor:!0,onClick:r,style:{zIndex:5555,position:"relative"}},C.I18n.t("upload.apply")))},R=S;"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(S,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/ImagesTab/ImagesColorPicker.js");function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),o.forEach(function(t){A(e,t,r[t])})}return e}function A(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var P=function(e){var t=e.props,r=t.style,o=t.columnWidth,i=t.item,c=t.index,s=e.upload,u=e.onKeyDown;return n.a.createElement(a.G,{style:w({},r,{width:Math.floor(o)}),onClick:function(){s(i)},tabIndex:c,onKeyDown:function(e){u(e,i)}},n.a.createElement(a.I,{height:Math.floor(o/(i.ratio||1.6)),src:l.c(i.src,o,Math.floor(o/(i.ratio||1.6)))}))},j=P;"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(P,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/ImagesTab/ImageBox.js");function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e}).apply(this,arguments)}function F(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],o=!0,n=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(o=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);o=!0);}catch(e){n=!0,a=e}finally{try{o||null==c.return||c.return()}finally{if(n)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function L(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function x(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function W(e){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function H(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function D(e,t){return(D=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function M(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var G=function(e){function t(){var e,r,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,o=W(t).call(this),e=!o||"object"!==I(o)&&"function"!=typeof o?H(r):o,M(H(e),"onChangeColorFilter",function(t){e.setState({displayColorPicker:!0,activeColorFilterIndex:t})}),M(H(e),"onRemoveColorFilter",function(t){var r=e.state.activeColorFilters;e.setState({activeColorFilters:[].concat(L(r.slice(0,t)),L(r.slice(t+1)))}),setTimeout(function(){var t=e.state,r=t.activeColorFilters,o=t.searchPhrase,n=t.activePresetTag,a=o||n||"";e.search({value:a,colorFilters:r},!1)})}),M(H(e),"addColorFilter",function(){var t=e.state.activeColorFilters;t.push({value:e.state.defaultColor}),e.setState({displayColorPicker:!e.state.displayColorPicker,activeColorFilters:t,activeColorFilterIndex:t.length-1})}),M(H(e),"handleClose",function(){e.setState({displayColorPicker:!1,activeColorFilterIndex:null}),setTimeout(function(){var t=e.state,r=t.activeColorFilters,o=t.searchPhrase,n=t.activePresetTag,a=o||n||"";e.search({value:a,colorFilters:r},!1)})}),M(H(e),"handleChange",function(t){var r=e.state,o=r.activeColorFilters;o[r.activeColorFilterIndex].value=t.hex,e.setState({activeColorFilters:o})}),M(H(e),"getImageGridWrapperWidth",function(){return Math.floor(e.imageGridWrapperRef.getBoundingClientRect().width-20)}),M(H(e),"getImageGridWrapperHeight",function(){return e.imageGridWrapperRef.getBoundingClientRect().height}),M(H(e),"updateImageGridColumnWidth",function(){var t=e.state.imageGrid,r=t.minColumnWidth,o=t.gutterSize,n=e.getImageGridWrapperWidth(),a=e.getImageGridWrapperHeight();t.columnWidth=l.a(n,r,o),e.setState({imageGridWrapperWidth:n,imageGrid:t,imageContainerHeight:a})}),M(H(e),"uploadStart",function(){return e.setState({isLoading:!0})}),M(H(e),"uploadStop",function(){return e.setState({isLoading:!1})}),M(H(e),"upload",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.state.isLoading){e.setState({isLoading:!0}),e.uploadStart();var r=e.props;p.f([t.src],e.props.appState.config,"application/json").then(function(t){var o=F(t,3),n=o[0],a=o[1],i=o[2];if(e.uploadStop(),(i||a)&&e.props.showAlert("",C.I18n.t("upload.file_already_exists"),"info"),e.props.appState.config.tagging.active)return e.props.saveUploadedFiles(n),void e.props.setPostUpload(!0,"TAGGING","IMAGES_GALLERY");r.appState.config.uploadHandler(n),r.closeModal()}).catch(function(){e.uploadStop()})}}),M(H(e),"onChangeSearchPhrase",function(t){var r=t.target;e.setState({searchPhrase:r.value})}),M(H(e),"search",function(t,r,o){var n=t.value,a=void 0===n?"":n,i=t.colorFilters,c=t.offset,s=void 0===c?0:c,l=e.state.related_tags,u=r?{}:e.state.activeTags,d=e.getRelevantActiveTags(u,l),p={value:a,colorFilters:i,offset:s},g=e.props.appState.config,f=g.openpixKey,h=g.limit,_=s>0;if((a||i.length)&&(e.setState({isSearching:!0,activeTags:u,relevantActiveTags:d,isLoading:!p.offset,isShowMoreImages:p.offset,searchParams:p}),p.limit=h,p.colorFiltersQuery=p.colorFilters.map(function(e){return"&colors[]=".concat(e.value,":1")}).join("").replace(/#/g,""),p.value||p.colorFilters.length))return m(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),o.forEach(function(t){M(e,t,r[t])})}return e}({},p,{openpixKey:f}),d).then(function(t){var r=t.images,n=void 0===r?[]:r,a=t.count,i=void 0===a?0:a,c=t.related_tags,s=void 0===c?[]:c,l=t.related_top_colors,u=void 0===l?[]:l;n.length||e.props.showAlert(C.I18n.t("images.zero_images_was_found"),"","warning"),e.setState({isSearching:!1,images:_?[].concat(L(e.state.images),L(n)):n,count:i,related_tags:s,related_top_colors:u,isLoading:!1,isShowMoreImages:!1},function(){"function"==typeof o&&o()})}).catch(function(){e.setState({isLoading:!1,isShowMoreImages:!1})})}),M(H(e),"onShowMoreImages",function(t){if(!e.state.isShowMoreImages){var r=e.state,o=r.searchParams;return r.count>o.offset+100?(o.offset=o.offset+100,e.onSearch(o.offset,t)):void 0}}),M(H(e),"onSearch",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1?arguments[1]:void 0;if(e.state.searchPhrase||e.state.activePresetTag)return e.setState({activePresetTag:e.state.searchPhrase?null:e.state.activePresetTag}),e.search({value:(e.state.searchPhrase||e.state.activePresetTag||"").toLowerCase(),colorFilters:e.state.activeColorFilters,offset:t},!0,r)}),M(H(e),"toggleTag",function(t){var r=e.state,o=r.activeTags,n=r.activeColorFilters,a=e.state,i=a.activePresetTag,c=a.searchPhrase;"backgrounds"===i&&(i="",c="backgrounds");var s=(c||i||"").toLowerCase();o[t]=!o[t],e.setState({activeTags:o,searchPhrase:c,activePresetTag:i}),setTimeout(function(){e.search({value:s,colorFilters:n})})}),M(H(e),"getRelevantActiveTags",function(e,t){var r=[],o=function(o){e[o]&&t.find(function(e){return e.tag===o})&&e.hasOwnProperty(o)&&r.push(o)};for(var n in e)o(n);return r}),M(H(e),"onActivatePresetTag",function(t){var r=e.state.activeColorFilters;e.setState({activePresetTag:t,searchPhrase:""}),e.search({value:t,colorFilters:r},!0)}),M(H(e),"onKeyDown",function(t,r){13===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e.upload(r))}),e.state={isLoading:!1,imageGridWrapperWidth:0,imageContainerHeight:0,imageGrid:{columnWidth:0,gutterSize:10,minColumnWidth:200},isSearching:!1,searchPhrase:"",activePresetTag:"",activeTags:{},isBackground:!0,activeColorFilters:[],defaultColor:"#00ff00",displayColorPicker:!1,activeColorFilterIndex:null,isShowMoreImages:!1,tags:[],backgrounds:[],images:[],related_tags:[],related_top_colors:[]},e}var r,u,g;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&D(e,t)}(t,o["Component"]),r=t,(u=[{key:"componentDidMount",value:function(){var e=this;d.a.all([v(),_()]).then(function(t){var r=F(t,2),o=r[0],n=r[1];e.setState({tags:o,backgrounds:n},e.updateImageGridColumnWidth)})}},{key:"componentDidUpdate",value:function(e,t){this.imageGridWrapperRef&&this.getImageGridWrapperWidth()!==t.imageGridWrapperWidth&&this.updateImageGridColumnWidth()}},{key:"render",value:function(){var e=this,t=this.state,r=t.isLoading,o=t.displayColorPicker,l=t.activeColorFilters,u=t.activeColorFilterIndex,d=t.tags,p=t.imageGrid,g=t.imageContainerHeight,f=t.isSearching,h=t.searchPhrase,_=t.activeTags,m=t.activePresetTag,v=t.imageGridWrapperWidth,T=t.isShowMoreImages,O=t.backgrounds,S=t.related_tags,w=t.images,A=t.count,P=l[u]||{},I=p.columnWidth,F=p.gutterSize,x="backgrounds"===m?[].concat(L(O),L(w)):w;return n.a.createElement(a.db,null,n.a.createElement(E,k({activePresetTag:m,activeColorFilters:l,tags:d,backgrounds:O},{onChangeColorFilter:this.onChangeColorFilter,onRemoveColorFilter:this.onRemoveColorFilter,addColorFilter:this.addColorFilter,onActivatePresetTag:this.onActivatePresetTag})),n.a.createElement(a.D,null,n.a.createElement(i.a,k({isLoading:r,isSearching:f,searchPhrase:h,count:A},{items:w,title:C.I18n.t("images.you_can_search_images_here"),onSearch:this.onSearch,onChangeSearchPhrase:this.onChangeSearchPhrase})),n.a.createElement(c.a,k({searchPhrase:h,activeTags:_},{tagsList:S,toggleTag:this.toggleTag})),n.a.createElement(a.H,{innerRef:function(t){return e.imageGridWrapperRef=t}},x.length&&g&&I&&!r?n.a.createElement(b.a,null,n.a.createElement(s.a,k({imageGridWrapperWidth:v,imageContainerHeight:g,columnWidth:I,gutterSize:F,isShowMoreImages:T},{count:x.length,list:x,upload:this.upload,onShowMoreImages:this.onShowMoreImages,cellContent:function(t){return n.a.createElement(j,{props:t,upload:e.upload,onKeyDown:e.onKeyDown})}})),n.a.createElement(a.Y,{show:T})):null)),o&&n.a.createElement(R,k({colorFilter:P},{handleClose:this.handleClose,handleChange:this.handleChange})),n.a.createElement(y.a,{overlay:!0,show:r}))}}])&&x(r.prototype,u),g&&x(r,g),t}(),U=G;t.default=U,"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(G,"ImagesTab","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/ImagesTab/ImagesTab.js"),__REACT_HOT_LOADER__.register(U,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/ImagesTab/ImagesTab.js"))},574:function(e,t,r){"use strict";r.d(t,"b",function(){return o}),r.d(t,"a",function(){return a}),r.d(t,"d",function(){return c}),r.d(t,"c",function(){return s});var o=function(e,t,r){return Math.floor((e+r)/(t+r))},n=function(e,t,r){return(e-(t-1)*r)/t},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,a=o(e,t,r);return n(e,a,r)},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return"https://scaleflex.cloudimg.io/width/".concat(Math.round(t),"/s/").concat(e)},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return"https://scaleflex.cloudimg.io/fit/".concat(Math.round(t),"x").concat(Math.round(r),"/ffffff/").concat(e)},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return"https://scaleflex.cloudimg.io/crop/".concat(Math.round(t),"x").concat(Math.round(r),"/s/").concat(e)};"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(o,"getColumnCount","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(n,"getColumnWidth","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(a,"getActualColumnWidth","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(i,"getResizeImageUrl","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(c,"getFitResizeImageUrl","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(s,"getCropImageUrl","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"))},578:function(e,t,r){"use strict";var o=r(1),n=r(591),a=r(577),i=r(574);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var g=function(e){function t(e){var r,s,d;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),s=this,d=l(t).call(this,e),r=!d||"object"!==c(d)&&"function"!=typeof d?u(s):d,p(u(r),"_calculateColumnCount",function(){var e=r.state,t=e.columnWidth,o=e.gutterSize;r._columnCount=i.b(r._width,t,o)}),p(u(r),"_cellRenderer",function(e){var t=e.index,a=e.key,i=e.parent,c=e.style,s=r.props,l=s.list,u=s.cellContent,d=r.state.columnWidth,p=l[t];return o.createElement(n.b,{cache:r._cache,index:t,key:a,parent:i},u({style:c,columnWidth:d,item:p,index:t,key:a}))}),p(u(r),"_initCellPositioner",function(){if(void 0===r._cellPositioner){var e=r.state,t=e.columnWidth,o=e.gutterSize;r._cellPositioner=Object(a.b)({cellMeasurerCache:r._cache,columnCount:r._columnCount,columnWidth:t,spacer:o})}}),p(u(r),"_onResize",function(e){var t=e.width;t&&(r._width=t),r._calculateColumnCount(),r._resetCellPositioner(),r._setMasonryRef.recomputeCellPositions()}),p(u(r),"_renderAutoSizer",function(e){var t=e.height,a=e.scrollTop;r._height=t,r._scrollTop=a;var i=r.state.overscanByPixels;return o.createElement(n.a,{ref:function(e){return r.child=e},disableHeight:!0,height:t,onResize:r._onResize,overscanByPixels:i,scrollTop:r._scrollTop},r._renderMasonry)}),p(u(r),"onScroll",function(e){var t=e.clientHeight,o=e.scrollHeight,n=e.scrollTop,a=u(r),i=r.props,c=i.isShowMoreImages;i.onShowMoreImages&&t+n+600>=o&&!c&&r.props.onShowMoreImages(function(){var e=document.querySelector("div.resize-triggers").parentNode;"9px"===e.style.paddingLeft?e.style.paddingLeft="10px":e.style.paddingLeft="9px","9px"===e.style.paddingRight?e.style.paddingRight="10px":e.style.paddingRight="9px",a.child._onResize()})}),p(u(r),"getCoordinates",function(e){var t=r.props,o=t.imageGridWrapperWidth,n=t.ratio,a=t.additionalImageHeight,i=void 0===a?0:a,c=r.state,s=c.columnWidth,l=c.gutterSize,u=r._columnCount||Math.floor(o/s),d=Math.floor(e/u),p=e%u;return{top:Math.floor(s/n+l+i)*d,left:(s+l)*p}}),p(u(r),"_renderMasonry",function(e){var t=e.width;r._width=t,r._calculateColumnCount(),r._initCellPositioner();var a=r.props,i=a.count,c=a.customPositionHandler,s=r.state,l=s.height,u=s.overscanByPixels,d=s.windowScrollerEnabled;return o.createElement(n.d,{autoHeight:d,cellCount:i,cellMeasurerCache:r._cache,cellPositioner:c?r.getCoordinates:r._cellPositioner,cellRenderer:r._cellRenderer,height:d?r._height:l,overscanByPixels:u,ref:function(e){return r._setMasonryRef=e},scrollTop:r._scrollTop,width:t,onScroll:r.onScroll,tabIndex:-1})}),p(u(r),"_resetCellPositioner",function(){var e=r.state,t=e.columnWidth,o=e.gutterSize;r._cellPositioner.reset({columnCount:r._columnCount,columnWidth:t,spacer:o})}),p(u(r),"_setMasonryRef",function(e){r._masonry=e}),r._columnWidth=e.columnWidth||200,r._gutterSize=e.gutterSize||10,r._columnCount=0,r._cache=new n.c({defaultHeight:Math.floor(e.imageContainerHeight)||300,defaultWidth:Math.floor(r._columnWidth),fixedWidth:!1}),r.state={columnWidth:Math.floor(r._columnWidth),height:Math.floor(e.imageContainerHeight)||300,gutterSize:r._gutterSize,overscanByPixels:0,windowScrollerEnabled:!1},r}var r,g,f;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,o["PureComponent"]),r=t,(g=[{key:"render",value:function(){var e=this.state,t=e.overscanByPixels,r=e.windowScrollerEnabled,a=e.height;return r?o.createElement(n.e,{overscanByPixels:t},this._renderAutoSizer):this._renderAutoSizer({height:a})}}])&&s(r.prototype,g),f&&s(r,f),t}(),f=g;t.a=f;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(g,"ReactVirtualizedImagesGrid","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/VirtualizedImagesGrid.js"),__REACT_HOT_LOADER__.register(f,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/VirtualizedImagesGrid.js"))},582:function(e,t,r){"use strict";r.d(t,"a",function(){return o});var o=function(e){return e.children};"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(o,"Aux","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/hoc.js")},585:function(e,t,r){"use strict";var o=r(1),n=r.n(o),a=r(121),i=r(18),c=r(4);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,d(t).apply(this,arguments))}var r,s,g;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,o["Component"]),r=t,(s=[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.searchField&&e.searchField.focus&&e.searchField.focus()})}},{key:"componentWillReceiveProps",value:function(e){!e.isLoading&&e.isLoading!==this.props.isLoading&&this.searchField&&this.searchField.focus&&this.searchField.focus()}},{key:"render",value:function(){var e=this,t=this.props,r=t.items,o=t.isSearching,s=t.searchPhrase,l=t.onSearch,u=t.onChangeSearchPhrase,d=t.title,p=t.count,g=void 0===p?0:p,f=!r||!r.length;return n.a.createElement(i.U,{empty:f&&!o},n.a.createElement(i.T,{show:f&&!o},d),n.a.createElement(i.S,null,n.a.createElement(i.K,{type:"search",innerRef:function(t){return e.searchField=t},autoFocus:!0,value:s,onChange:u,onKeyDown:function(e){Object(a.a)(e)&&l()}}),n.a.createElement(i.g,{className:"ae-btn",onClick:l},c.I18n.t("upload.search"))),n.a.createElement(i.d,{empty:f},c.I18n.t("upload.found"),": ",g))}}])&&l(r.prototype,s),g&&l(r,g),t}(),f=g;t.a=f;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(g,"SearchBar","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/IconsTab/SearchBar.js"),__REACT_HOT_LOADER__.register(f,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/IconsTab/SearchBar.js"))},586:function(e,t,r){"use strict";var o=r(1),n=r.n(o),a=r(18),i=function(e){var t=e.tagsList,r=e.searchPhrase,o=e.activeTags,i=e.toggleTag;return t.length>0?n.a.createElement(a.gb,null,t.filter(function(e){return e.tag&&!e.tag.includes("sf-")}).map(function(e){return n.a.createElement(a.eb,{hide:r.includes(e.tag),key:e.tag,active:o[e.tag],onClick:function(){i(e.tag)}},e.tag,n.a.createElement(a.h,{active:o[e.tag]}))})):null},c=i;t.a=c;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(i,"IconTags","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/IconsTab/IconTags.js"),__REACT_HOT_LOADER__.register(c,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/IconsTab/IconTags.js"))}}]);