(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{567:function(e,t,r){"use strict";r.r(t);var n=r(1),o=r.n(n),a=r(18),i=r(119),l=r(15),s=r(578),c=r(574),u=r(132),p=r(4);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(t){b(e,t,r[t])})}return e}function m(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var v=function(e){function t(){var e,r,n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=h(t).call(this),e=!n||"object"!==d(n)&&"function"!=typeof n?_(r):n,b(_(e),"getImageGridWrapperWidth",function(){return Math.floor(e.imageGridWrapperRef.current.getBoundingClientRect().width)}),b(_(e),"getImageGridWrapperHeight",function(){return e.imageGridWrapperRef.current.getBoundingClientRect().height}),b(_(e),"updateImageGridColumnWidth",function(){var t=e.state.imageGrid,r=t.minColumnWidth,n=t.gutterSize,o=e.getImageGridWrapperWidth(),a=e.getImageGridWrapperHeight();t.columnWidth=Object(c.a)(o,r,n),e.setState({imageGridWrapperWidth:o,imageGrid:t,imageContainerHeight:a})}),b(_(e),"onKeyDown",function(t,r){13===t&&(t.stopPropagation(),e.select(r))}),b(_(e),"select",function(t){if(e.props.appState.config.uploadParams.opt_force_name)e.props.upload(!0,t.url_permalink);else{var r=[g({},t,{public_link:t.url_permalink})];e.props.appState.config.uploadHandler(r),e.props.closeModal()}}),b(_(e),"onTagImage",function(t,r){if(t.preventDefault(),t.stopPropagation(),e.props.appState.config.tagging.active){var n=[g({},r,{public_link:r.url_permalink})];e.props.saveUploadedFiles(n),e.props.setPostUpload(!0,"TAGGING","MY_GALLERY")}}),b(_(e),"onEditImage",function(t,r){if(t.preventDefault(),t.stopPropagation(),e.props.appState.config.imageEditor.active){var n=e.props.path,o=[g({},r,{public_link:r.url_permalink})];e.props.saveUploadedFiles(o),e.props.setPostUpload(!0,"IMAGE_EDITOR","MY_GALLERY",{path:n})}}),b(_(e),"renderImage",function(t){var r=t.style,n=t.columnWidth,i=t.item,l=t.index,s=e.props.appState.config,d=s.tagging,f=s.imageEditor,m=d.active,h=f.active,_=Object(u.b)(i.type),y=Object(c.d)(_?i.url_permalink:Object(u.a)(i.type),n,Math.floor(n/(i.ratio||1.6)));return o.a.createElement(a.G,{style:g({},r,{width:Math.floor(n)}),role:"button",tabIndex:l,isNotImage:!_,onKeyDown:function(t){e.onKeyDown(t,i)}},o.a.createElement("div",{style:{overflow:"hidden",background:"rgba(155,155,155,.15)"}},o.a.createElement(a.I,{src:y,isNotImage:!_,height:Math.floor(n/(i.ratio||1.6))})),o.a.createElement(a.E,null,o.a.createElement(a.F,null,i.name)),o.a.createElement(a.R,null,h&&_&&o.a.createElement(a.s,{onClick:function(t){e.onEditImage(t,i)}},o.a.createElement(a.r,{fullBr:"4px"},p.I18n.t("file_manager.edit_image"))),m&&o.a.createElement(a.fb,{onClick:function(t){e.onTagImage(t,i)}},o.a.createElement(a.r,{fullBr:"4px"},p.I18n.t("file_manager.tag_image"))),o.a.createElement(a.V,{onClick:function(){e.select(i)}},o.a.createElement(a.r,{fullBr:"4px",success:!0},p.I18n.t("file_manager.select")))))}),b(_(e),"renderUploadBox",function(t){var r=t.style,n=void 0===r?{}:r,i=t.columnWidth,l=void 0===i?300:i,s=t.item,c=void 0===s?{}:s,u=e.props.fileDropHandler,d=e.state.isDragOver;return o.a.createElement(a.kb,{onDrop:u,method:"post",encType:"multipart/form-data",style:n,columnWidth:l,height:Math.floor(l/(c.ratio||1.6)+20)},o.a.createElement(a.ib,{isDragOver:d},o.a.createElement(a.jb,{className:"sfi-airstore-image"}),o.a.createElement(a.L,{center:!0},p.I18n.t("file_manager.drag_images_here"))))}),e.state={imageGridWrapperWidth:0,imageContainerHeight:0,imageGrid:{columnWidth:0,gutterSize:10,minColumnWidth:200}},e.imageGridWrapperRef=o.a.createRef(),e}var r,i,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(t,n["Component"]),r=t,(i=[{key:"componentDidMount",value:function(){this.updateImageGridColumnWidth()}},{key:"componentDidUpdate",value:function(e,t){this.imageGridWrapperRef.current&&this.getImageGridWrapperWidth()!==t.imageGridWrapperWidth&&this.updateImageGridColumnWidth()}},{key:"render",value:function(){var e=this,t=this.props,r=t.files,n=t.onDragEvent,i=t.isDragOver,l=t.isShowMoreImages,c=t.imagesIndex,u=t.isLoading,p=this.state,d=p.imageGrid,g=p.imageContainerHeight,m=p.imageGridWrapperWidth,h=d.columnWidth,_=d.gutterSize,y=[{id:"uploaderBox"}].concat(f(r));return o.a.createElement(a.o,{innerRef:this.imageGridWrapperRef,onDragOver:function(e){n(e,"isDragOver",!0)},onDragEnter:function(e){n(e,"isDragOver",!0)},onDragLeave:function(e){n(e,"isDragOver",!1)},onDragEnd:function(e){n(e,"isDragOver",!1)},isDragOver:i},r.length?o.a.createElement(s.a,{key:c,imageGridWrapperWidth:m,imageContainerHeight:g,columnWidth:h,gutterSize:_,count:y.length,list:y,upload:this.select,onShowMoreImages:this.props.onShowMoreImages,isShowMoreImages:l,ratio:1.6,additionalImageHeight:20,customPositionHandler:!0,cellContent:function(t){return"uploaderBox"!==t.item.id?e.renderImage(t):e.renderUploadBox(t)}}):"",!r.length&&!u&&this.renderUploadBox({}),o.a.createElement(a.Y,{show:l&&y.length>1}))}}])&&m(r.prototype,i),l&&m(r,l),t}(),O=v,E=O,w=("undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(v,"UploadedImagesContent","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/UploadedImagesContent.js"),__REACT_HOT_LOADER__.register(O,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/UploadedImagesContent.js")),r(121)),T=r(5),S=r(2),I=r(25);function j(){var e=H(["\n  display: ",";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 199;\n"]);return j=function(){return e},e}function C(){var e=H(["\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 1 !important;\n  width: "," !important;\n"]);return C=function(){return e},e}function R(){var e=H(["\n  display: inline-block;\n  vertical-align: middle;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  width: ",";\n"]);return R=function(){return e},e}function x(){var e=H(["\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n  margin: 0 5px 0 0;\n  color: #31b0d5;\n"]);return x=function(){return e},e}function A(){var e=H(["\n  position: relative;\n  padding: 5px 20px 5px 10px;\n  cursor: pointer;\n  font-size: 14px;\n  \n  :hover {\n    background: rgba(0, 0, 0, 0.1);\n    \n    .remove-icon-folder {\n      display: inline-block !important;\n    }\n    \n    .settings-icon-folder {\n      display: inline-block !important;\n    }\n  }\n"]);return A=function(){return e},e}function D(){var e=H(["\n  font-size: 18px;\n  top: 16px;\n  \n  :hover {\n    color: #7b8189;\n  }\n"]);return D=function(){return e},e}function M(){var e=H(["\n  line-height: 50px;\n  font-size: 14px;\n"]);return M=function(){return e},e}function P(){var e=H(["\n  height: 50px;\n  color: #5D636B;\n  padding: 0 10px;\n  white-space: nowrap;\n  border-bottom: 1px solid rgb(221,221,221);\n"]);return P=function(){return e},e}function U(){var e=H(["\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  top: 0;\n  color: #5D636B;\n  margin-left: ",";\n  //visibility: ",";;\n  width: 200px;\n  background: rgb(245, 245, 245);\n  border-right: 1px solid rgb(221,221,221);\n  z-index: 1045;\n  transition: 0.3s margin;\n  overflow: hidden;\n  overflow-y: auto;\n"]);return U=function(){return e},e}function L(){var e=H(["\n  cursor: pointer;\n  \n  :hover "," {\n    background-color: ",";\n    \n    :before {\n      background-color: ",";\n    }\n  }\n  \n  :hover "," {\n    color: ",";\n  }\n"]);return L=function(){return e},e}function k(){var e=H(["\n  width: ",";\n  height: ",";\n  margin: 0 auto;\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  background-color: ",";\n  border-radius: ",";\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.39);\n  margin-right: ",";\n  \n  :before {\n    content: '';\n    width: 50%;\n    height: ",";\n    border-radius: ",";\n    background-color: ",";\n    position: absolute;\n    top: ",";\n    left: 0px;\n  }\n"]);return k=function(){return e},e}function F(){var e=H(["\n  display: inline-block;\n  vertical-align: middle;\n  color: #5D636B;\n  margin-left: 10px;\n  font-size: 14px;\n"]);return F=function(){return e},e}function H(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var W=S.default.div(F()),G=S.default.div(k(),function(e){return e.small?"14px":"17px"},function(e){return e.small?"10px":"12px"},function(e){return e.small?e.theme.buttonBackground:" #708090"},function(e){return e.small?"0 1px 1px 1px":"0 2px 2px 2px"},function(e){return e.mr?e.mr:"auto"},function(e){return e.small?"2px":"3px"},function(e){return e.small?"0 1px 0 0":"0 2px 0 0"},function(e){return e.small?e.theme.buttonBackground:" #708090"},function(e){return e.small?"-2px":"-3px"}),z=S.default.div(L(),G,function(e){return e.theme.buttonBackground||"#00707C"},function(e){return e.theme.buttonBackground||"#00707C"},W,function(e){return e.theme.buttonBackground||"#00707C"}),B=S.default.div(U(),function(e){return e.showFileManager?"0px":"-200px"},function(e){return e.showFileManager?"visible":"hidden"}),N=S.default.div(P()),K=S.default.div(M()),Y=Object(S.default)(I.a)(D()),V=S.default.div(A());V.Icon=S.default.div.attrs({className:"ai-icon-folder"})(x()),V.Name=S.default.div(R(),function(e){return e.isSelect?"calc(100% - 40px)":"calc(100% - 25px)"}),V.EditName=S.default.input(C(),function(e){return e.isSelect?"calc(100% - 55px)":"calc(100% - 30px)"});var q=S.default.div(j(),function(e){return e.show?"block":"none"});"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(W,"FolderTitle","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(G,"FolderIcon","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(z,"FolderToggleWrapper","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(B,"FolderManagerWrapper","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(N,"ManagerHeader","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(K,"ManagerHeaderTitle","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(Y,"CloseManagerBtn","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(V,"Folder","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"),__REACT_HOT_LOADER__.register(q,"Overlay","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/folderManager.styled.js"));function J(e){return(J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Q(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function X(e){return(X=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function $(e,t){return($=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ee=function(e){function t(){var e,r,n,o,a,i,l;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var s=arguments.length,c=new Array(s),u=0;u<s;u++)c[u]=arguments[u];return n=this,o=(e=X(t)).call.apply(e,[this].concat(c)),r=!o||"object"!==J(o)&&"function"!=typeof o?Z(n):o,a=Z(r),l=function(e){e.preventDefault(),e.stopPropagation(),r.props.changeFolder(r.props.folder.path)},(i="onClickFolder")in a?Object.defineProperty(a,i,{value:l,enumerable:!0,configurable:!0,writable:!0}):a[i]=l,r}var r,a,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&$(e,t)}(t,n["Component"]),r=t,(a=[{key:"render",value:function(){var e=this.props.folder;return o.a.createElement(V,{onClick:this.onClickFolder},o.a.createElement(G,{small:!0,mr:"7px"}),o.a.createElement(V.Name,{title:e.name},e.name))}}])&&Q(r.prototype,a),i&&Q(r,i),t}();"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(ee,"FolderItem","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/FolderItem.js");function te(e){return(te="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function re(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function ne(e){return(ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ae(e,t){return(ae=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ie=function(e){function t(){var e,r,n,o,a,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,n=ne(t).call(this),e=!n||"object"!==te(n)&&"function"!=typeof n?oe(r):n,o=oe(e),i=function(){var t=!e.state.showFileManager;e.setState({showFileManager:t})},(a="toggleSideMenu")in o?Object.defineProperty(o,a,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[a]=i,e.state={showFileManager:!1},e}var r,a,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ae(e,t)}(t,n["Component"]),r=t,(a=[{key:"render",value:function(){var e=this,t=this.state.showFileManager,r=this.props,a=r.folders,i=void 0===a?[]:a,l=r.path,s=r.rootDir,c=r.isLoading;return o.a.createElement(n.Fragment,null,o.a.createElement(z,{onClick:this.toggleSideMenu},o.a.createElement(G,null),o.a.createElement(W,null,p.I18n.t("file_manager.change_folder"))),o.a.createElement(B,{showFileManager:t},o.a.createElement(N,null,o.a.createElement(K,null,p.I18n.t("file_manager.media_library")),o.a.createElement(Y,{onClick:this.toggleSideMenu})),l&&l!==s&&!c&&o.a.createElement(V,{onClick:this.props.goToLevelUpFolder},o.a.createElement("span",{className:"btn-back"}),o.a.createElement(V.Name,{title:p.I18n.t("file_manager.go_back")},"../")),!c&&i.map(function(t){return o.a.createElement(ee,{key:t.uuid,folder:t,changeFolder:e.props.changeFolder})})),o.a.createElement(q,{show:t,onClick:this.toggleSideMenu}))}}])&&re(r.prototype,a),i&&re(r,i),t}(),le=ie,se=le;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(ie,"FolderManager","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/FolderManager.js"),__REACT_HOT_LOADER__.register(le,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/folderManager/FolderManager.js"));function ce(e){return(ce="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ue(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function pe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function de(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function fe(e){return(fe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ge(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function me(e,t){return(me=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function he(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var _e={DEFAULT:"DEFAULT",UPLOADING:"UPLOADING",ERROR:"ERROR",UPLOADED:"UPLOADED"},ye=function(e){function t(e){var r,n,o;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,o=fe(t).call(this),r=!o||"object"!==ce(o)&&"function"!=typeof o?ge(n):o,he(ge(r),"activateFolder",function(e){r.setState({files:[],path:e}),r.onGetListFiles(e)}),he(ge(r),"fileChangeHandler",function(e){var t=e.target;r.changeFile(t.files)}),he(ge(r),"changeFile",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];r.setState({filesToUpload:e}),setTimeout(function(){e&&r.upload()})}),he(ge(r),"upload",function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=r.state.path,o=r.props,a=r.props.appState.config,l=e?[t]:r.state.filesToUpload,s=e?"application/json":"files[]",c=!e&&n;r.uploadStart(),i.f(l,a,s,c).then(function(e){var t=pe(e,3),n=t[0],i=t[1];if((t[2]||i)&&r.props.showAlert("",p.I18n.t("upload.file_already_exists"),"info"),r.uploadSuccess(n),a.tagging.active)return r.props.saveUploadedFiles(n),void r.props.setPostUpload(!0,"TAGGING","MY_GALLERY");a.uploadHandler(n),o.closeModal()}).catch(function(e){r.uploadError(e.msg)})}),he(ge(r),"changeStep",function(e){return r.setState({step:e})}),he(ge(r),"uploadStart",function(){return r.setState({step:_e.UPLOADING,files:[]})}),he(ge(r),"uploadSuccess",function(e){r.setState({step:_e.UPLOADED,uploadedFiles:e,isDragOver:!1}),r.onGetListFiles(r.state.path)}),he(ge(r),"uploadError",function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;r.setState({step:_e.ERROR,errorMsg:e||p.I18n.t("upload.error")}),t&&setTimeout(function(){return r.changeStep(_e.DEFAULT)},t)}),he(ge(r),"fileDropHandler",function(e){e.preventDefault(),r.changeFile((e.dataTransfer||e.originalEvent.dataTransfer).files)}),he(ge(r),"onDragEvent",function(e,t,n){e.preventDefault(),r.setState(he({},t,n))}),he(ge(r),"onSearchChange",function(e){r.setState({searchPhrase:e.target.value})}),he(ge(r),"onGetListFiles",function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0,o=r.props.appState.config.container;r.setState({isShowMoreImages:!!t,isLoading:!t}),Object(i.b)({dir:e,container:o,offset:t}).then(function(e){var o=pe(e,3),a=o[0],i=o[1],l=o[2],s=t?r.state.files:[];r.setState({files:[].concat(ue(s),ue(a)),directories:t?r.state.directories:i,isLoading:!1,isShowMoreImages:!1,offset:t,totalFilesCount:l},function(){"function"==typeof n&&n()})})}),he(ge(r),"search",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0,n=r.state,o=n.searchPhrase,a=void 0===o?"":o,l=n.imagesIndex,s=r.props.appState.config,c=s.container,u=s.language;a.length<2&&r.goToDefaultFolder(),r.setState({isShowMoreImages:!!e,isLoading:!e}),Object(i.d)({query:a,language:u,container:c,offset:e}).then(function(n){var o=pe(n,2),a=o[0],i=o[1],s=e?r.state.files:[],c=e;r.setState({files:[].concat(ue(s),ue(a)),isLoading:!1,isShowMoreImages:!1,totalFilesCount:i,offset:e},function(){setTimeout(function(){r.setState({imagesIndex:c?l:l+1}),"function"==typeof t&&t()})})})}),he(ge(r),"onShowMoreImages",function(e){if(!r.state.isShowMoreImages)if(r.state.searchPhrase){var t=r.state,n=t.totalFilesCount,o=t.offset;if(n>o+T.d)return o+=T.d,r.search(o,e)}else{var a=r.state,i=a.totalFilesCount,l=a.offset,s=a.path;if(i>l+T.d)return l+=T.d,r.onGetListFiles(s,l,e)}}),he(ge(r),"goToLevelUpFolder",function(e){e.preventDefault(),e.stopPropagation();var t=r.state.path;r.activateFolder(t.slice(0,t.lastIndexOf("/")))}),he(ge(r),"goToDefaultFolder",function(){event.preventDefault(),event.stopPropagation(),r.setState({searchPhrase:"",searchInputIndex:r.state.searchInputIndex+1},function(){r.activateFolder(r.props.appState.config.uploadParams.dir)})}),he(ge(r),"onKeyDownSearch",function(e){Object(w.a)(e)&&r.state.searchPhrase.length>1?r.search():Object(w.a)(e)&&0===r.state.searchPhrase.length&&r.goToDefaultFolder()}),r.state={searchPhrase:"",isLoading:!1,imagesIndex:0,searchInputIndex:0,files:[],directories:[],isShowMoreImages:!1,showFileManager:!1,path:e.path||e.appState.config.uploadParams.dir,folderBrowser:e.appState.config.folderBrowser},r}var r,s,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&me(e,t)}(t,n["Component"]),r=t,(s=[{key:"componentDidMount",value:function(){var e=this.state.path;this.onGetListFiles(e)}},{key:"render",value:function(){var e=this,t=this.state,r=t.isLoading,n=t.step,i=t.files,s=t.isDragOver,c=t.imagesIndex,u=t.directories,d=t.path,f=t.folderBrowser,g=t.searchPhrase,m=void 0===g?"":g,h=m.length<2;return o.a.createElement(a.mb,null,o.a.createElement(a.lb,{type:"file",name:"files[]",innerRef:function(t){return e.fileInput=t},"data-multiple-caption":"{count} files selected",defaultValue:"",tabIndex:-1,multiple:!0,onChange:this.fileChangeHandler}),o.a.createElement(a.t,null,o.a.createElement(a.O,null,f&&o.a.createElement(se,{path:d,rootDir:this.props.appState.config.uploadParams.dir,folders:u,goToLevelUpFolder:this.goToLevelUpFolder,changeFolder:this.activateFolder,isLoading:r})),o.a.createElement(a.U,null,o.a.createElement(a.S,{padding:"0px"},o.a.createElement(a.K,{searchInputIndex:this.state.searchInputIndex,type:"text",innerRef:function(t){return e._searchInput=t},autoFocus:!0,value:m,placeholder:p.I18n.t("file_manager.search_by_file_name_tag_desc"),onChange:this.onSearchChange,onKeyDown:this.onKeyDownSearch}),m&&o.a.createElement(a.f,{onClick:this.goToDefaultFolder}),o.a.createElement(a.g,{key:"ok",disabled:h,className:"ae-btn",onClick:function(){e.search()}},p.I18n.t("upload.search")))),o.a.createElement(a.g,{className:"ae-btn",fullBr:"4px",onClick:function(){e.fileInput.click()}},p.I18n.t("file_manager.upload_images"))),o.a.createElement(E,{appState:this.props.appState,upload:this.upload,setAppState:this.props.setAppState,imagesIndex:c,onDragEvent:this.onDragEvent,fileDropHandler:this.fileDropHandler,isDragOver:s,saveUploadedFiles:this.props.saveUploadedFiles,setPostUpload:this.props.setPostUpload,files:i,closeModal:this.props.closeModal,onShowMoreImages:this.onShowMoreImages,isShowMoreImages:this.state.isShowMoreImages,isLoading:r,path:d}),o.a.createElement(l.a,{overlay:!0,show:r||n===_e.UPLOADING}))}}])&&de(r.prototype,s),c&&de(r,c),t}(),be=ye;t.default=be,"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(_e,"STEP","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/UploadedImagesTab.js"),__REACT_HOT_LOADER__.register(ye,"UploadedImagesTab","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/UploadedImagesTab.js"),__REACT_HOT_LOADER__.register(be,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/UploadedImagesTab/UploadedImagesTab.js"))},574:function(e,t,r){"use strict";r.d(t,"b",function(){return n}),r.d(t,"a",function(){return a}),r.d(t,"d",function(){return l}),r.d(t,"c",function(){return s});var n=function(e,t,r){return Math.floor((e+r)/(t+r))},o=function(e,t,r){return(e-(t-1)*r)/t},a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,a=n(e,t,r);return o(e,a,r)},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return"https://scaleflex.cloudimg.io/width/".concat(Math.round(t),"/s/").concat(e)},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return"https://scaleflex.cloudimg.io/fit/".concat(Math.round(t),"x").concat(Math.round(r),"/ffffff/").concat(e)},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return"https://scaleflex.cloudimg.io/crop/".concat(Math.round(t),"x").concat(Math.round(r),"/s/").concat(e)};"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(n,"getColumnCount","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(o,"getColumnWidth","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(a,"getActualColumnWidth","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(i,"getResizeImageUrl","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(l,"getFitResizeImageUrl","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"),__REACT_HOT_LOADER__.register(s,"getCropImageUrl","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/services/imageGrid.service.js"))},578:function(e,t,r){"use strict";var n=r(1),o=r(591),a=r(577),i=r(574);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f=function(e){function t(e){var r,s,p;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),s=this,p=c(t).call(this,e),r=!p||"object"!==l(p)&&"function"!=typeof p?u(s):p,d(u(r),"_calculateColumnCount",function(){var e=r.state,t=e.columnWidth,n=e.gutterSize;r._columnCount=i.b(r._width,t,n)}),d(u(r),"_cellRenderer",function(e){var t=e.index,a=e.key,i=e.parent,l=e.style,s=r.props,c=s.list,u=s.cellContent,p=r.state.columnWidth,d=c[t];return n.createElement(o.b,{cache:r._cache,index:t,key:a,parent:i},u({style:l,columnWidth:p,item:d,index:t,key:a}))}),d(u(r),"_initCellPositioner",function(){if(void 0===r._cellPositioner){var e=r.state,t=e.columnWidth,n=e.gutterSize;r._cellPositioner=Object(a.b)({cellMeasurerCache:r._cache,columnCount:r._columnCount,columnWidth:t,spacer:n})}}),d(u(r),"_onResize",function(e){var t=e.width;t&&(r._width=t),r._calculateColumnCount(),r._resetCellPositioner(),r._setMasonryRef.recomputeCellPositions()}),d(u(r),"_renderAutoSizer",function(e){var t=e.height,a=e.scrollTop;r._height=t,r._scrollTop=a;var i=r.state.overscanByPixels;return n.createElement(o.a,{ref:function(e){return r.child=e},disableHeight:!0,height:t,onResize:r._onResize,overscanByPixels:i,scrollTop:r._scrollTop},r._renderMasonry)}),d(u(r),"onScroll",function(e){var t=e.clientHeight,n=e.scrollHeight,o=e.scrollTop,a=u(r),i=r.props,l=i.isShowMoreImages;i.onShowMoreImages&&t+o+600>=n&&!l&&r.props.onShowMoreImages(function(){var e=document.querySelector("div.resize-triggers").parentNode;"9px"===e.style.paddingLeft?e.style.paddingLeft="10px":e.style.paddingLeft="9px","9px"===e.style.paddingRight?e.style.paddingRight="10px":e.style.paddingRight="9px",a.child._onResize()})}),d(u(r),"getCoordinates",function(e){var t=r.props,n=t.imageGridWrapperWidth,o=t.ratio,a=t.additionalImageHeight,i=void 0===a?0:a,l=r.state,s=l.columnWidth,c=l.gutterSize,u=r._columnCount||Math.floor(n/s),p=Math.floor(e/u),d=e%u;return{top:Math.floor(s/o+c+i)*p,left:(s+c)*d}}),d(u(r),"_renderMasonry",function(e){var t=e.width;r._width=t,r._calculateColumnCount(),r._initCellPositioner();var a=r.props,i=a.count,l=a.customPositionHandler,s=r.state,c=s.height,u=s.overscanByPixels,p=s.windowScrollerEnabled;return n.createElement(o.d,{autoHeight:p,cellCount:i,cellMeasurerCache:r._cache,cellPositioner:l?r.getCoordinates:r._cellPositioner,cellRenderer:r._cellRenderer,height:p?r._height:c,overscanByPixels:u,ref:function(e){return r._setMasonryRef=e},scrollTop:r._scrollTop,width:t,onScroll:r.onScroll,tabIndex:-1})}),d(u(r),"_resetCellPositioner",function(){var e=r.state,t=e.columnWidth,n=e.gutterSize;r._cellPositioner.reset({columnCount:r._columnCount,columnWidth:t,spacer:n})}),d(u(r),"_setMasonryRef",function(e){r._masonry=e}),r._columnWidth=e.columnWidth||200,r._gutterSize=e.gutterSize||10,r._columnCount=0,r._cache=new o.c({defaultHeight:Math.floor(e.imageContainerHeight)||300,defaultWidth:Math.floor(r._columnWidth),fixedWidth:!1}),r.state={columnWidth:Math.floor(r._columnWidth),height:Math.floor(e.imageContainerHeight)||300,gutterSize:r._gutterSize,overscanByPixels:0,windowScrollerEnabled:!1},r}var r,f,g;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,n["PureComponent"]),r=t,(f=[{key:"render",value:function(){var e=this.state,t=e.overscanByPixels,r=e.windowScrollerEnabled,a=e.height;return r?n.createElement(o.e,{overscanByPixels:t},this._renderAutoSizer):this._renderAutoSizer({height:a})}}])&&s(r.prototype,f),g&&s(r,g),t}(),g=f;t.a=g;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(f,"ReactVirtualizedImagesGrid","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/VirtualizedImagesGrid.js"),__REACT_HOT_LOADER__.register(g,"default","/Users/dmitry/2017/airstore-uploader-react/projects/react-plugin/components/VirtualizedImagesGrid.js"))}}]);