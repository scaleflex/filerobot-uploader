(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{691:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i=r(14),a=r(714),c=r(715),l=r(706),s=r(699),u=r(78),f=r.n(u),p=r(42),g=r(702),d="https://www.openpix.net/v3/",h="".concat(Object(p.e)("jolipage-public-assets"),"list?dir=/Backgrounds/v1"),m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"json";return new Promise((function(i,a){f()({url:e,method:t,data:r,responseType:o,headers:n,timeout:3e4}).then((function(r){var n=r.data,o=void 0===n?{}:n,c=o.status;"success"===(void 0===c?"error":c)?(i(o),"get"===t.toLowerCase()&&sessionStorage.setItem(e,JSON.stringify(o))):a(r)}),(function(e){var t=e.data;a(void 0===t?{}:t)}))}))},_=function(){return Object(p.j)("".concat(h)).then((function(e){var t=e.files;return(void 0===t?[]:t).map((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{src:Object(g.c)(e)||Object(g.b)(e),id:e.uuid,name:e.name,alt:""}}))}))},v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=e.colorFiltersQuery,n=e.limit,o=e.offset,i=e.openpixKey,a=e.value.trim().split(" "),c=e.value?"&q[]=".concat(a.map((function(e){return e.trim()})).join("&q[]=")):"",l=t.map((function(e){return"&q[]=".concat(e)})).join(""),s="&limit=".concat(n),u="&offset=".concat(o),f="&key=".concat(i);return m("".concat(d,"search?").concat(c).concat(l).concat(r).concat(s).concat(u).concat(f)).then((function(e){var t=e.related_tags,r=void 0===t?[]:t,n=e.related_top_colors,o=void 0===n?[]:n,i=e.images,a=void 0===i?[]:i,c=e.count;return{images:a,count:void 0===c?0:c,related_tags:r,related_top_colors:o}}))},y=function(){return m("".concat(d,"pictures/tags")).then((function(e){return e.tags}))},b=("undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(d,"api_endpoint","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(h,"backgroundsAPI","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(m,"_send","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(_,"getBackgrounds","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(v,"searchImages","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imagesApi.service.js"),__REACT_HOT_LOADER__.register(y,"getImagesTags","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imagesApi.service.js")),r(18)),C=r(710),O=r(3),T=function(e){var t=e.activePresetTag,r=e.activeColorFilters,n=e.tags,a=(e.backgrounds,e.onChangeColorFilter),c=e.onRemoveColorFilter,l=e.addColorFilter,s=e.onActivatePresetTag;return o.a.createElement(i.hb,null,o.a.createElement(i.gb,null,o.a.createElement(i.S,{fs:"16px",color:"black"},O.I18n.t("images.color_filter")),o.a.createElement("div",{style:{margin:"0 10px"}},r.map((function(e,t){return o.a.createElement(i.l,{index:t,key:"colorFilter-".concat(t),color:e.value,onChangeColorFilter:a,onRemoveColorFilter:c})}))),o.a.createElement("div",{style:{padding:"5px 10px 12px"}},o.a.createElement(i.c,{onClick:l,onKeyDown:function(e){13===e.keyCode&&l()},tabIndex:0,role:"button"},"+ ",O.I18n.t("images.add_color"))),o.a.createElement(i.S,{fs:"16px",color:"black"},O.I18n.t("upload.categories")),n.length&&o.a.createElement(i.n,{key:"category-background",active:"backgrounds"===t,onClick:function(){s("backgrounds",25)},tabIndex:0,role:"button"},o.a.createElement(i.o,null,O.I18n.t("images.backgrounds")," "),o.a.createElement(i.w,null,"(25+)")),n.slice(0,20).map((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.tag,n=e.label,a=e.count;return o.a.createElement(i.n,{key:"category-".concat(r),active:r===t,onClick:function(){s(r,a)},onKeyDown:function(e){13===e.keyCode&&s(r)},tabIndex:0,role:"button"},o.a.createElement(i.o,{title:n||r.replace(/_/g," ").trim()},n||r.replace(/_/g," ").trim()),o.a.createElement(i.w,null,"(",a,")"))})),n.length?null:o.a.createElement(b.a,{black:!0,show:!0,style:{fontSize:8,top:10,opacity:.4}})))},E=T,R=("undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(T,"default","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/ImagesTab/ImagesSidebar.js"),r(728)),j=function(e){var t=e.colorFilter,r=e.handleClose,n=e.handleChange;return o.a.createElement(i.jb,null,o.a.createElement(i.ib,{onClick:r}),o.a.createElement(R.SketchPicker,{color:t.value,onChange:n}),o.a.createElement(i.f,{sm:!0,themeColor:!0,onClick:r,style:{zIndex:5555,position:"relative"}},O.I18n.t("upload.apply")))},S=j;"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(j,"default","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/ImagesTab/ImagesColorPicker.js");function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach((function(t){w(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var I=function(e){var t=e.props,r=t.style,n=t.columnWidth,a=t.item,c=t.index,l=e.upload,u=e.onKeyDown,f=e.cloudimageToken;return o.a.createElement(i.N,{style:P(P({},r),{},{width:Math.floor(n)}),onClick:function(){l(a)},tabIndex:c,onKeyDown:function(e){u(e,a)}},o.a.createElement(i.P,{height:Math.floor(n/(a.ratio||1.6)),src:s.c(a.src,n,Math.floor(n/(a.ratio||1.6)),f)}))},x=I;"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(I,"default","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/ImagesTab/ImageBox.js");function k(e){return(k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function L(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?L(Object(r),!0).forEach((function(t){J(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(n=(a=c.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}(e,t)||M(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e){return function(e){if(Array.isArray(e))return G(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||M(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function M(e,t){if(e){if("string"==typeof e)return G(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?G(e,t):void 0}}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function U(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function z(e,t){return(z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function B(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=q(e);if(t){var o=q(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return K(this,r)}}function K(e,t){return!t||"object"!==k(t)&&"function"!=typeof t?N(e):t}function N(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function q(e){return(q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function J(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var V=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&z(e,t)}(g,e);var t,r,n,u=B(g);function g(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,g),J(N(e=u.call(this)),"onChangeColorFilter",(function(t){e.setState({displayColorPicker:!0,activeColorFilterIndex:t})})),J(N(e),"onRemoveColorFilter",(function(t){var r=e.state.activeColorFilters;e.setState({activeColorFilters:[].concat(W(r.slice(0,t)),W(r.slice(t+1)))}),setTimeout((function(){var t=e.state,r=t.activeColorFilters,n=t.searchPhrase,o=t.activePresetTag,i=n||o||"";e.search({value:i,colorFilters:r},!1)}))})),J(N(e),"addColorFilter",(function(){var t=e.state.activeColorFilters;t.push({value:e.state.defaultColor}),e.setState({displayColorPicker:!e.state.displayColorPicker,activeColorFilters:t,activeColorFilterIndex:t.length-1,presetImagesCount:null})})),J(N(e),"handleClose",(function(){e.setState({displayColorPicker:!1,activeColorFilterIndex:null}),setTimeout((function(){var t=e.state,r=t.activeColorFilters,n=t.searchPhrase,o=t.activePresetTag,i=n||o||"";e.search({value:i,colorFilters:r},!1)}))})),J(N(e),"handleChange",(function(t){var r=e.state,n=r.activeColorFilters;n[r.activeColorFilterIndex].value=t.hex,e.setState({activeColorFilters:n})})),J(N(e),"getImageGridWrapperWidth",(function(){return Math.floor(e.imageGridWrapperRef.getBoundingClientRect().width-20)})),J(N(e),"getImageGridWrapperHeight",(function(){return e.imageGridWrapperRef.getBoundingClientRect().height})),J(N(e),"updateImageGridColumnWidth",(function(){var t=e.state.imageGrid,r=t.minColumnWidth,n=t.gutterSize,o=e.getImageGridWrapperWidth(),i=e.getImageGridWrapperHeight();t.columnWidth=s.a(o,r,n),e.setState({imageGridWrapperWidth:o,imageGrid:t,imageContainerHeight:i})})),J(N(e),"uploadStart",(function(){return e.setState({isLoading:!0})})),J(N(e),"uploadStop",(function(){return e.setState({isLoading:!1})})),J(N(e),"upload",(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.state.isLoading){e.setState({isLoading:!0}),e.uploadStart();var r=e.props;p.l({files:[t.src],config:e.props.appState.config,data_type:"application/json",showAlert:e.props.showAlert}).then((function(t){var n=H(t,3),o=n[0],i=n[1],a=n[2];if(e.uploadStop(),(a||i)&&e.props.showAlert("",O.I18n.t("upload.file_already_exists"),"info"),e.props.appState.config.tagging.active)return e.props.saveUploadedFiles(o),void e.props.setPostUpload(!0,"TAGGING","IMAGES_GALLERY");r.appState.config.uploadHandler(o,{stage:"upload"}),r.closeModal()})).catch((function(){e.uploadStop()}))}})),J(N(e),"onChangeSearchPhrase",(function(t){var r=t.target;e.setState({searchPhrase:r.value})})),J(N(e),"search",(function(t,r,n){var o=t.value,i=void 0===o?"":o,a=t.colorFilters,c=t.offset,l=void 0===c?0:c,s=e.state.related_tags,u=r?{}:e.state.activeTags,f=e.getRelevantActiveTags(u,s),p={value:i,colorFilters:a,offset:l},g=e.props.appState.config,d=g.openpixKey,h=g.limit,m=l>0;if((i||a.length)&&(e.setState({isSearching:!0,activeTags:u,relevantActiveTags:f,isLoading:!p.offset,isShowMoreImages:p.offset,searchParams:p}),p.limit=h,p.colorFiltersQuery=p.colorFilters.map((function(e){return"&colors[]=".concat(e.value,":1")})).join("").replace(/#/g,""),p.value||p.colorFilters.length))return v(F(F({},p),{},{openpixKey:d}),f).then((function(t){var r=t.images,o=void 0===r?[]:r,i=t.count,a=void 0===i?0:i,c=t.related_tags,l=void 0===c?[]:c,s=t.related_top_colors,u=void 0===s?[]:s;o.length||e.props.showAlert(O.I18n.t("images.zero_images_was_found"),"","warning"),e.setState({isSearching:!1,images:m?[].concat(W(e.state.images),W(o)):o,count:a,related_tags:l,related_top_colors:u,isLoading:!1,isShowMoreImages:!1},(function(){"function"==typeof n&&n()}))})).catch((function(){e.setState({isLoading:!1,isShowMoreImages:!1})}))})),J(N(e),"onShowMoreImages",(function(t){if(!e.state.isShowMoreImages){var r=e.state,n=r.searchParams;return r.count>n.offset+100?(n.offset=n.offset+100,e.onSearch(n.offset,t)):void 0}})),J(N(e),"onSearch",(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0,o=e.state.searchPhrase||n;if(o||e.state.activePresetTag)return e.setState({activePresetTag:o?null:e.state.activePresetTag,presetImagesCount:null}),e.search({value:(o||e.state.activePresetTag||"").toLowerCase(),colorFilters:e.state.activeColorFilters,offset:t},!0,r)})),J(N(e),"toggleTag",(function(t){var r=e.state,n=r.activeTags,o=r.activeColorFilters,i=e.state,a=i.activePresetTag,c=i.searchPhrase;"backgrounds"===a&&(a="",c="backgrounds");var l=(c||a||"").toLowerCase();n[t]=!n[t],e.setState({activeTags:n,searchPhrase:c,activePresetTag:a}),setTimeout((function(){e.search({value:l,colorFilters:o})}))})),J(N(e),"getRelevantActiveTags",(function(e,t){var r=[],n=function(n){e[n]&&t.find((function(e){return e.tag===n}))&&e.hasOwnProperty(n)&&r.push(n)};for(var o in e)n(o);return r})),J(N(e),"onActivatePresetTag",(function(t,r){var n=e.state.activeColorFilters;e.setState({activePresetTag:t,searchPhrase:"",presetImagesCount:n.length?null:r}),e.search({value:t,colorFilters:n},!0)})),J(N(e),"onKeyDown",(function(t,r){13===t.keyCode&&(t.preventDefault(),t.stopPropagation(),e.upload(r))})),e.state={isLoading:!1,imageGridWrapperWidth:0,imageContainerHeight:0,imageGrid:{columnWidth:0,gutterSize:10,minColumnWidth:200},isSearching:!1,searchPhrase:"",activePresetTag:"",activeTags:{},isBackground:!0,activeColorFilters:[],defaultColor:"#00ff00",displayColorPicker:!1,activeColorFilterIndex:null,isShowMoreImages:!1,presetImagesCount:null,tags:[],backgrounds:[],images:[],related_tags:[],related_top_colors:[]},e}return t=g,(r=[{key:"componentDidMount",value:function(){var e=this,t=this.props.appState.config.searchPhrase;f.a.all([y(),_()]).then((function(r){var n=H(r,2),o=n[0],i=n[1];e.setState({tags:o,backgrounds:i,searchPhrase:t},(function(){t||e.updateImageGridColumnWidth()}))})),t&&this.onSearch(0,!0,t)}},{key:"componentDidUpdate",value:function(e,t){this.imageGridWrapperRef&&this.getImageGridWrapperWidth()!==t.imageGridWrapperWidth&&this.updateImageGridColumnWidth()}},{key:"render",value:function(){var e=this,t=this.state,r=t.isLoading,n=t.displayColorPicker,s=t.activeColorFilters,u=t.activeColorFilterIndex,f=t.tags,p=t.imageGrid,g=t.imageContainerHeight,d=t.isSearching,h=t.searchPhrase,m=t.activeTags,_=t.activePresetTag,v=t.imageGridWrapperWidth,y=t.isShowMoreImages,T=t.backgrounds,R=t.related_tags,j=t.images,A=t.count,P=t.presetImagesCount,w=this.props.appState.config.cloudimageToken,I=s[u]||{},k=p.columnWidth,L=p.gutterSize,F="backgrounds"===_?[].concat(W(T),W(j)):j;return o.a.createElement(i.lb,null,o.a.createElement(E,D({activePresetTag:_,activeColorFilters:s,tags:f,backgrounds:T},{onChangeColorFilter:this.onChangeColorFilter,onRemoveColorFilter:this.onRemoveColorFilter,addColorFilter:this.addColorFilter,onActivatePresetTag:this.onActivatePresetTag})),o.a.createElement(i.K,null,o.a.createElement(a.a,D({isLoading:r,isSearching:d,searchPhrase:h,count:A,presetImagesCount:P},{items:j,title:O.I18n.t("images.you_can_search_images_here"),onSearch:this.onSearch,onChangeSearchPhrase:this.onChangeSearchPhrase})),o.a.createElement(c.a,D({searchPhrase:h,activeTags:m},{tagsList:R,toggleTag:this.toggleTag})),o.a.createElement(i.O,{ref:function(t){return e.imageGridWrapperRef=t}},F.length&&g&&k&&!r?o.a.createElement(C.a,null,o.a.createElement(l.a,D({imageGridWrapperWidth:v,imageContainerHeight:g,columnWidth:k,gutterSize:L,isShowMoreImages:y},{count:F.length,list:F,upload:this.upload,onShowMoreImages:this.onShowMoreImages,cellContent:function(t){return o.a.createElement(x,{props:t,upload:e.upload,onKeyDown:e.onKeyDown,cloudimageToken:w})}})),o.a.createElement(i.fb,{show:y})):null)),n&&o.a.createElement(S,D({colorFilter:I},{handleClose:this.handleClose,handleChange:this.handleChange})),o.a.createElement(b.a,{overlay:!0,show:r}))}}])&&U(t.prototype,r),n&&U(t,n),g}(n.Component),Q=V;t.default=Q,"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(V,"ImagesTab","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/ImagesTab/ImagesTab.js"),__REACT_HOT_LOADER__.register(Q,"default","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/ImagesTab/ImagesTab.js"))},699:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return i})),r.d(t,"d",(function(){return l})),r.d(t,"c",(function(){return s}));var n=function(e,t,r){return Math.floor((e+r)/(t+r))},o=function(e,t,r){return(e-(t-1)*r)/t},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,i=n(e,t,r);return o(e,i,r)},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"demo";return"https://".concat(r,".cloudimg.io/v7/").concat(u(e),"w=").concat(Math.round(t))},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"demo";return"https://".concat(n,".cloudimg.io/v7/").concat(u(e),"func=fit&bg_color=ffffff&w=").concat(Math.round(t),"&h=").concat(Math.round(r))},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return"".concat(u(e),"func=fit&bg_color=ffffff&w=").concat(Math.round(t),"&h=").concat(Math.round(r))},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"demo";return"https://".concat(n,".cloudimg.io/v7/").concat(u(e),"func=crop&w=").concat(Math.round(t),"&h=").concat(Math.round(r))},u=function(e){return e.includes("?")?"".concat(e,"&"):"".concat(e,"?")};"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(n,"getColumnCount","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(o,"getColumnWidth","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(i,"getActualColumnWidth","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(a,"getResizeImageUrl","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(c,"getFitResizeImageUrlWithCIcdn","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(l,"getFitResizeImageUrl","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(s,"getCropImageUrl","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(u,"processUrl","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/services/imageGrid.service.js"))},702:function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return i}));var n=function(e){return e.url&&e.url.permalink?e.url.permalink:e.url_permalink?e.url_permalink:""},o=function(e){return e.url&&e.url.public?e.url.public:e.url_public?e.url_public:""},i=function(e){return e.url&&e.url.cdn?e.url.cdn:""};"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(n,"getPermalink","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/utils/adjustAPI.utils.js"),__REACT_HOT_LOADER__.register(o,"getPubliclink","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/utils/adjustAPI.utils.js"),__REACT_HOT_LOADER__.register(i,"getCDNlink","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/utils/adjustAPI.utils.js"))},706:function(e,t,r){"use strict";var n=r(0),o=r(721),i=r(705),a=r(699);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=g(e);if(t){var o=g(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return f(this,r)}}function f(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?p(e):t}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(g,e);var t,r,c,f=u(g);function g(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,g),d(p(t=f.call(this,e)),"_calculateColumnCount",(function(){var e=t.state,r=e.columnWidth,n=e.gutterSize;t._columnCount=a.b(t._width,r,n)})),d(p(t),"_cellRenderer",(function(e){var r=e.index,i=e.key,a=e.parent,c=e.style,l=t.props,s=l.list,u=l.cellContent,f=t.state.columnWidth,p=s[r];return n.createElement(o.b,{cache:t._cache,index:r,key:i,parent:a},u({style:c,columnWidth:f,item:p,index:r,key:i}))})),d(p(t),"_initCellPositioner",(function(){if(void 0===t._cellPositioner){var e=t.state,r=e.columnWidth,n=e.gutterSize;t._cellPositioner=Object(i.b)({cellMeasurerCache:t._cache,columnCount:t._columnCount,columnWidth:r,spacer:n})}})),d(p(t),"_onResize",(function(e){var r=e.width;r&&(t._width=r),t._calculateColumnCount(),t._resetCellPositioner(),t._setMasonryRef.recomputeCellPositions()})),d(p(t),"_renderAutoSizer",(function(e){var r=e.height,i=e.scrollTop;t._height=r,t._scrollTop=i;var a=t.state.overscanByPixels;return n.createElement(o.a,{ref:function(e){return t.child=e},disableHeight:!0,height:r,onResize:t._onResize,overscanByPixels:a,scrollTop:t._scrollTop},t._renderMasonry)})),d(p(t),"onScroll",(function(e){var r=e.clientHeight,n=e.scrollHeight,o=e.scrollTop,i=p(t),a=t.props,c=a.isShowMoreImages,l=a.onShowMoreImages,s=a.getImageGridWrapperPosition;s&&s(),l&&r+o+600>=n&&!c&&t.props.onShowMoreImages((function(){var e=document.querySelector("div.resize-triggers").parentNode;"9px"===e.style.paddingLeft?e.style.paddingLeft="10px":e.style.paddingLeft="9px","9px"===e.style.paddingRight?e.style.paddingRight="10px":e.style.paddingRight="9px",i.child._onResize()}))})),d(p(t),"getCoordinates",(function(e){var r=t.props,n=r.imageGridWrapperWidth,o=r.ratio,i=r.additionalImageHeight,a=void 0===i?0:i,c=t.state,l=c.columnWidth,s=c.gutterSize,u=t._columnCount||Math.floor(n/l),f=Math.floor(e/u),p=e%u;return{top:Math.floor(l/o+s+a)*f,left:(l+s)*p}})),d(p(t),"_renderMasonry",(function(e){var r=e.width;t._width=r,t._calculateColumnCount(),t._initCellPositioner();var i=t.props,a=i.count,c=i.customPositionHandler,l=t.state,s=l.height,u=l.overscanByPixels,f=l.windowScrollerEnabled;return n.createElement(o.d,{id:"image-grid-wrapper",autoHeight:f,cellCount:a,cellMeasurerCache:t._cache,cellPositioner:c?t.getCoordinates:t._cellPositioner,cellRenderer:t._cellRenderer,height:f?t._height:s,overscanByPixels:u,ref:function(e){return t._setMasonryRef=e},scrollTop:t._scrollTop,width:r,onScroll:t.onScroll,tabIndex:-1,onCellsRendered:t.props.getImageGridWrapperPosition})})),d(p(t),"_resetCellPositioner",(function(){var e=t.state,r=e.columnWidth,n=e.gutterSize;t._cellPositioner.reset({columnCount:t._columnCount,columnWidth:r,spacer:n})})),d(p(t),"_setMasonryRef",(function(e){t._masonry=e})),t._columnWidth=e.columnWidth||200,t._gutterSize=e.gutterSize||10,t._columnCount=0,t._cache=new o.c({defaultHeight:Math.floor(e.imageContainerHeight)||300,defaultWidth:Math.floor(t._columnWidth),fixedWidth:!1}),t.state={columnWidth:Math.floor(t._columnWidth),height:Math.floor(e.imageContainerHeight)||300,gutterSize:t._gutterSize,overscanByPixels:0,windowScrollerEnabled:!1},t}return t=g,(r=[{key:"render",value:function(){var e=this.state,t=e.overscanByPixels,r=e.windowScrollerEnabled,i=e.height;return r?n.createElement(o.e,{overscanByPixels:t},this._renderAutoSizer):this._renderAutoSizer({height:i})}}])&&l(t.prototype,r),c&&l(t,c),g}(n.PureComponent),m=h;t.a=m;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(h,"ReactVirtualizedImagesGrid","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/VirtualizedImagesGrid.js"),__REACT_HOT_LOADER__.register(m,"default","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/VirtualizedImagesGrid.js"))},710:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var n=function(e){return e.children};"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(n,"Aux","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/hoc.js")},714:function(e,t,r){"use strict";var n=r(0),o=r.n(n),i=r(44),a=r(14),c=r(3);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=d(e);if(t){var o=d(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return g(this,r)}}function g(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(g,e);var t,r,n,l=p(g);function g(){return s(this,g),l.apply(this,arguments)}return t=g,(r=[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.searchField&&e.searchField.focus&&e.searchField.focus()}))}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){!e.isLoading&&e.isLoading!==this.props.isLoading&&this.searchField&&this.searchField.focus&&this.searchField.focus()}},{key:"render",value:function(){var e=this,t=this.props,r=t.items,n=t.isSearching,l=t.searchPhrase,s=t.onSearch,u=t.onChangeSearchPhrase,f=t.title,p=t.count,g=void 0===p?0:p,d=t.presetImagesCount,h=void 0===d?0:d,m=!r||!r.length;return o.a.createElement(a.bb,{empty:m&&!n},o.a.createElement(a.ab,{show:m&&!n},f),o.a.createElement(a.Z,null,o.a.createElement(a.R,{type:"search",ref:function(t){return e.searchField=t},autoFocus:!0,value:l,onChange:u,onKeyDown:function(e){Object(i.b)(e)&&s()}}),o.a.createElement(a.h,{className:"ae-btn",onClick:function(){s()}},c.I18n.t("upload.search"))),o.a.createElement(a.e,{empty:m},c.I18n.t("upload.found"),": ",h||g?h||g:""))}}])&&u(t.prototype,r),n&&u(t,n),g}(n.Component),m=h;t.a=m;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(h,"SearchBar","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/IconsTab/SearchBar.js"),__REACT_HOT_LOADER__.register(m,"default","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/IconsTab/SearchBar.js"))},715:function(e,t,r){"use strict";var n=r(0),o=r.n(n),i=r(14),a=function(e){var t=e.tagsList,r=e.searchPhrase,n=e.activeTags,a=e.toggleTag;return t.length>0?o.a.createElement(i.nb,null,t.filter((function(e){return e.tag&&!e.tag.includes("sf-")})).map((function(e){return o.a.createElement(i.mb,{hide:r.includes(e.tag),key:e.tag,active:n[e.tag],onClick:function(){a(e.tag)}},e.tag,o.a.createElement(i.k,{active:n[e.tag]}))}))):null},c=a;t.a=c;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(a,"IconTags","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/IconsTab/IconTags.js"),__REACT_HOT_LOADER__.register(c,"default","/Users/dmitry/scaleflex/plugins/filerobot-uploader/projects/react-plugin/components/IconsTab/IconTags.js"))}}]);