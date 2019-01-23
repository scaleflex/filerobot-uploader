'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _index = require('../../actions/index');

var _reactRedux = require('react-redux');

var _styledComponents = require('../../styledComponents');

var _SearchBar = require('../IconsTab/SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _IconTags = require('../IconsTab/IconTags');

var _IconTags2 = _interopRequireDefault(_IconTags);

var _VirtualizedImagesGrid = require('../VirtualizedImagesGrid');

var _VirtualizedImagesGrid2 = _interopRequireDefault(_VirtualizedImagesGrid);

var _imageGrid = require('../../services/imageGrid.service');

var ImageGridService = _interopRequireWildcard(_imageGrid);

var _Spinner = require('../Spinner');

var _actions = require('../../actions');

var _reactColor = require('react-color');

var _hoc = require('../hoc');

var _reactI18nify = require('react-i18nify');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagesTab = function (_Component) {
  _inherits(ImagesTab, _Component);

  function ImagesTab() {
    _classCallCheck(this, ImagesTab);

    var _this = _possibleConstructorReturn(this, (ImagesTab.__proto__ || Object.getPrototypeOf(ImagesTab)).call(this));

    _this.onChangeColorFilter = function (index) {
      _this.setState({ displayColorPicker: true, activeColorFilterIndex: index });
    };

    _this.onRemoveColorFilter = function (index) {
      var activeColorFilters = _this.state.activeColorFilters;


      _this.setState({
        activeColorFilters: [].concat(_toConsumableArray(activeColorFilters.slice(0, index)), _toConsumableArray(activeColorFilters.slice(index + 1)))
      });
      setTimeout(function () {
        var _this$state = _this.state,
            activeColorFilters = _this$state.activeColorFilters,
            searchPhrase = _this$state.searchPhrase,
            activePresetTag = _this$state.activePresetTag;

        var value = searchPhrase || activePresetTag || '';

        _this.search({ value: value, colorFilters: activeColorFilters }, false);
      });
    };

    _this.addColorFilter = function () {
      var activeColorFilters = _this.state.activeColorFilters;


      activeColorFilters.push({ value: _this.state.defaultColor });
      _this.setState({
        displayColorPicker: !_this.state.displayColorPicker,
        activeColorFilters: activeColorFilters,
        activeColorFilterIndex: activeColorFilters.length - 1
      });
    };

    _this.handleClose = function () {
      _this.setState({ displayColorPicker: false, activeColorFilterIndex: null });

      setTimeout(function () {
        var _this$state2 = _this.state,
            activeColorFilters = _this$state2.activeColorFilters,
            searchPhrase = _this$state2.searchPhrase,
            activePresetTag = _this$state2.activePresetTag;

        var value = searchPhrase || activePresetTag || '';

        _this.search({ value: value, colorFilters: activeColorFilters }, false);
      });
    };

    _this.handleChange = function (color) {
      var _this$state3 = _this.state,
          activeColorFilters = _this$state3.activeColorFilters,
          activeColorFilterIndex = _this$state3.activeColorFilterIndex;

      activeColorFilters[activeColorFilterIndex].value = color.hex;
      _this.setState({ activeColorFilters: activeColorFilters });
    };

    _this.getImageGridWrapperWidth = function () {
      return Math.floor(_this.imageGridWrapperRef.current.getBoundingClientRect().width - 20);
    };

    _this.getImageGridWrapperHeight = function () {
      return _this.imageGridWrapperRef.current.getBoundingClientRect().height;
    };

    _this.updateImageGridColumnWidth = function () {
      var imageGrid = _this.state.imageGrid;
      var minColumnWidth = imageGrid.minColumnWidth,
          gutterSize = imageGrid.gutterSize;

      var imageGridWrapperWidth = _this.getImageGridWrapperWidth();
      var imageContainerHeight = _this.getImageGridWrapperHeight();

      imageGrid.columnWidth = ImageGridService.getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

      _this.setState({ imageGridWrapperWidth: imageGridWrapperWidth, imageGrid: imageGrid, imageContainerHeight: imageContainerHeight });
    };

    _this.uploadStart = function () {
      return _this.setState({ isLoading: true });
    };

    _this.uploadStop = function () {
      return _this.setState({ isLoading: false });
    };

    _this.upload = function () {
      var image = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_this.state.isLoading) return;

      _this.setState({ isLoading: true });
      _this.uploadStart();

      var self = _this.props;

      _this.props.onFileUpload(image.src, _this.props.uploaderConfig).then(function (files) {
        _this.uploadStop();

        if (_this.props.uploaderConfig.tagging.active) {
          _this.props.saveUploadedFiles(files);
          _this.props.setPostUpload(true, 'TAGGING', 'IMAGES_GALLERY');
          return;
        }

        self.uploaderConfig.uploadHandler(files);

        if (_this.props.onClose) _this.props.onClose();

        self.modalClose();
      }).catch(function () {
        _this.uploadStop();
      });
    };

    _this.onChangeSearchPhrase = function (_ref) {
      var target = _ref.target;
      _this.setState({ searchPhrase: target.value });
    };

    _this.search = function (_ref2, refreshTags, resizeOnSuccess) {
      var _ref2$value = _ref2.value,
          value = _ref2$value === undefined ? '' : _ref2$value,
          colorFilters = _ref2.colorFilters,
          _ref2$offset = _ref2.offset,
          offset = _ref2$offset === undefined ? 0 : _ref2$offset;

      var self = _this;
      var related_tags = _this.props.related_tags;

      var activeTags = refreshTags ? {} : _this.state.activeTags;
      var relevantActiveTags = _this.getRelevantActiveTags(activeTags, related_tags);
      _this.setState({ isSearching: true, activeTags: activeTags, relevantActiveTags: relevantActiveTags });
      var onSuccess = function onSuccess(response) {
        var _response$payload = response.payload,
            payload = _response$payload === undefined ? {} : _response$payload;
        var _payload$images = payload.images,
            images = _payload$images === undefined ? [] : _payload$images;

        if (!images.length) _this.props.showAlert(_reactI18nify.I18n.t('images.zero_images_was_found'), '', 'warning');
        self.setState({ isSearching: false });
        typeof resizeOnSuccess === 'function' && resizeOnSuccess();
      };

      if (!value && !colorFilters.length) return;

      return _this.loadIcons({ value: value, colorFilters: colorFilters, offset: offset }, relevantActiveTags, onSuccess);
    };

    _this.onShowMoreImages = function (resizeOnSuccess) {
      if (_this.state.isShowMoreImages) return;

      var _this$props = _this.props,
          searchParams = _this$props.searchParams,
          count = _this$props.count;


      if (count > searchParams.offset + 100) {
        searchParams.offset = searchParams.offset + 100;
        return _this.onSearch(searchParams.offset, resizeOnSuccess);
      }
    };

    _this.onSearch = function () {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var resizeOnSuccess = arguments[1];

      if (!_this.state.searchPhrase && !_this.state.activePresetTag) return;
      _this.setState({ activePresetTag: _this.state.searchPhrase ? null : _this.state.activePresetTag });

      return _this.search({
        value: (_this.state.searchPhrase || _this.state.activePresetTag || '').toLowerCase(),
        colorFilters: _this.state.activeColorFilters,
        offset: offset
      }, true, resizeOnSuccess);
    };

    _this.loadIcons = function () {
      var searchParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var relevantActiveTags = arguments[1];
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var uploaderConfig = _this.props.uploaderConfig;
      var openpixKey = uploaderConfig.openpixKey;

      var done = function done(response) {
        typeof cb === 'function' && cb(response);
        _this.setState({ isLoading: false, isShowMoreImages: false });
      };

      searchParams.limit = uploaderConfig.limit;

      _this.setState({ isLoading: !searchParams.offset, isShowMoreImages: searchParams.offset });

      return _this.props.onSearchImages(_extends({}, searchParams, { openpixKey: openpixKey }), relevantActiveTags).then(done, done);
    };

    _this.toggleTag = function (tag) {
      var _this$state4 = _this.state,
          activeTags = _this$state4.activeTags,
          activeColorFilters = _this$state4.activeColorFilters;
      var _this$state5 = _this.state,
          activePresetTag = _this$state5.activePresetTag,
          searchPhrase = _this$state5.searchPhrase;

      if (activePresetTag === 'backgrounds') {
        activePresetTag = '';
        searchPhrase = 'backgrounds';
      }
      var value = (searchPhrase || activePresetTag || '').toLowerCase();

      activeTags[tag] = !activeTags[tag];
      _this.setState({ activeTags: activeTags, searchPhrase: searchPhrase, activePresetTag: activePresetTag });

      setTimeout(function () {
        _this.search({ value: value, colorFilters: activeColorFilters });
      });
    };

    _this.getRelevantActiveTags = function (activeTags, related_tags) {
      var result = [];

      var _loop = function _loop(tag) {
        if (activeTags[tag] && related_tags.find(function (item) {
          return item.tag === tag;
        }) && activeTags.hasOwnProperty(tag)) result.push(tag);
      };

      for (var tag in activeTags) {
        _loop(tag);
      }

      return result;
    };

    _this.onActivatePresetTag = function (activePresetTag) {
      var activeColorFilters = _this.state.activeColorFilters;

      _this.setState({ activePresetTag: activePresetTag, searchPhrase: '' });
      _this.search({ value: activePresetTag, colorFilters: activeColorFilters }, true);
    };

    _this.renderSidebar = function () {
      var _this$state6 = _this.state,
          activePresetTag = _this$state6.activePresetTag,
          _this$state6$activeCo = _this$state6.activeColorFilters,
          activeColorFilters = _this$state6$activeCo === undefined ? [] : _this$state6$activeCo;
      var _this$props2 = _this.props,
          tags = _this$props2.tags,
          backgrounds = _this$props2.backgrounds;


      return _react2.default.createElement(
        _styledComponents.SidebarWrap,
        null,
        _react2.default.createElement(
          _styledComponents.SideBar,
          null,
          _react2.default.createElement(
            _styledComponents.Label,
            { fs: '16px', color: 'black' },
            _reactI18nify.I18n.t('images.color_filter')
          ),
          _react2.default.createElement(
            'div',
            { style: { margin: '0 10px' } },
            activeColorFilters.map(function (colorFilter, index) {
              return _react2.default.createElement(_styledComponents.ColorFilterItem, {
                index: index,
                key: 'colorFilter-' + index,
                color: colorFilter.value,
                onChangeColorFilter: _this.onChangeColorFilter,
                onRemoveColorFilter: _this.onRemoveColorFilter
              });
            })
          ),
          _react2.default.createElement(
            'div',
            { style: { padding: '5px 10px 12px' } },
            _react2.default.createElement(
              _styledComponents.AddColorBtn,
              {
                onClick: _this.addColorFilter,
                onKeyDown: function onKeyDown(event) {
                  event.keyCode === 13 && _this.addColorFilter();
                },
                tabIndex: 0,
                role: 'button'
              },
              '+ ',
              _reactI18nify.I18n.t('images.add_color')
            )
          ),
          _react2.default.createElement(
            _styledComponents.Label,
            { fs: '16px', color: 'black' },
            _reactI18nify.I18n.t('upload.categories')
          ),
          tags.length && _react2.default.createElement(
            _styledComponents.ColorItem,
            {
              key: 'category-background',
              active: 'backgrounds' === activePresetTag,
              onClick: function onClick() {
                _this.onActivatePresetTag('backgrounds');
              },
              tabIndex: 0,
              role: 'button'
            },
            _react2.default.createElement(
              _styledComponents.ColorItemName,
              null,
              _reactI18nify.I18n.t('images.backgrounds'),
              ' '
            ),
            _react2.default.createElement(
              _styledComponents.CountTag,
              null,
              '(',
              backgrounds.length,
              ')'
            )
          ),
          tags.slice(0, 20).map(function (item, index) {
            return _this.renderItem(item, index);
          }),
          !tags.length ? _react2.default.createElement(_Spinner.Spinner, { black: true, show: true, style: { fontSize: 8, top: 10, opacity: 0.4 } }) : null
        )
      );
    };

    _this.renderItem = function (_ref3, index) {
      var tag = _ref3.tag,
          label = _ref3.label,
          count = _ref3.count;
      var activePresetTag = _this.state.activePresetTag;


      return _react2.default.createElement(
        _styledComponents.ColorItem,
        {
          key: 'category-' + tag,
          active: tag === activePresetTag,
          onClick: function onClick() {
            _this.onActivatePresetTag(tag);
          },
          onKeyDown: function onKeyDown(event) {
            event.keyCode === 13 && _this.onActivatePresetTag(tag);
          },
          tabIndex: 0,
          role: 'button'
        },
        _react2.default.createElement(
          _styledComponents.ColorItemName,
          null,
          label || tag.replace(/_/g, ' ').trim()
        ),
        _react2.default.createElement(
          _styledComponents.CountTag,
          null,
          '(',
          count,
          ')'
        )
      );
    };

    _this.onKeyDown = function (event, image) {
      if (event.keyCode === 13) {
        event.preventDefault();
        event.stopPropagation();

        _this.upload(image);
      }
    };

    _this.renderContent = function () {
      var _this$props3 = _this.props,
          related_tags = _this$props3.related_tags,
          images = _this$props3.images,
          backgrounds = _this$props3.backgrounds,
          count = _this$props3.count;
      var _this$state7 = _this.state,
          imageGrid = _this$state7.imageGrid,
          imageContainerHeight = _this$state7.imageContainerHeight,
          isLoading = _this$state7.isLoading,
          isSearching = _this$state7.isSearching,
          searchPhrase = _this$state7.searchPhrase,
          activeTags = _this$state7.activeTags,
          activePresetTag = _this$state7.activePresetTag,
          imageGridWrapperWidth = _this$state7.imageGridWrapperWidth,
          isShowMoreImages = _this$state7.isShowMoreImages;
      var columnWidth = imageGrid.columnWidth,
          gutterSize = imageGrid.gutterSize;

      var isBackground = activePresetTag === 'backgrounds';
      var imagesList = isBackground ? [].concat(_toConsumableArray(backgrounds), _toConsumableArray(images)) : images;

      return _react2.default.createElement(
        _styledComponents.ImageContainer,
        null,
        _react2.default.createElement(_SearchBar2.default, {
          title: _reactI18nify.I18n.t('images.you_can_search_images_here'),
          items: images,
          isLoading: isLoading,
          onSearch: function onSearch() {
            _this.onSearch();
          },
          isSearching: isSearching,
          searchPhrase: searchPhrase,
          onChangeSearchPhrase: _this.onChangeSearchPhrase,
          count: count
        }),
        _react2.default.createElement(_IconTags2.default, {
          tagsList: related_tags,
          searchPhrase: searchPhrase,
          activeTags: activeTags,
          toggleTag: _this.toggleTag
        }),
        _react2.default.createElement(
          _styledComponents.ImagesListContainer,
          { innerRef: _this.imageGridWrapperRef },
          imagesList.length && imageContainerHeight && columnWidth && !isLoading ? _react2.default.createElement(
            _hoc.Aux,
            null,
            _react2.default.createElement(_VirtualizedImagesGrid2.default, {
              imageGridWrapperWidth: imageGridWrapperWidth,
              imageContainerHeight: imageContainerHeight,
              columnWidth: columnWidth,
              gutterSize: gutterSize,
              count: imagesList.length,
              list: imagesList,
              upload: _this.upload,
              onShowMoreImages: _this.onShowMoreImages,
              isShowMoreImages: isShowMoreImages,
              cellContent: function cellContent(_ref4) {
                var style = _ref4.style,
                    columnWidth = _ref4.columnWidth,
                    item = _ref4.item,
                    index = _ref4.index;
                return _react2.default.createElement(
                  _styledComponents.ImageWrapper,
                  {
                    style: _extends({}, style, { width: columnWidth }),
                    onClick: function onClick() {
                      _this.upload(item);
                    },
                    tabIndex: index,
                    onKeyDown: function onKeyDown(event) {
                      _this.onKeyDown(event, item);
                    }
                  },
                  _react2.default.createElement(_styledComponents.Img, {
                    height: columnWidth / (item.ratio || 1.6),
                    src: ImageGridService.getCropImageUrl(item.src, columnWidth, columnWidth / (item.ratio || 1.6))
                  })
                );
              }
            }),
            _react2.default.createElement(_styledComponents.ShowMoreResultsSpinner, { show: isShowMoreImages })
          ) : null
        )
      );
    };

    _this.state = {
      isLoading: false,
      imageGridWrapperWidth: 0,
      imageContainerHeight: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 },

      isSearching: false,
      searchPhrase: '',
      activePresetTag: '',
      activeTags: {},
      isBackground: true,
      activeColorFilters: [],
      defaultColor: '#00ff00',
      displayColorPicker: false,
      activeColorFilterIndex: null,
      isShowMoreImages: false
    };
    _this.imageGridWrapperRef = _react2.default.createRef();
    return _this;
  }

  _createClass(ImagesTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onGetImagesTags();
      this.props.onGetBackgrounds();
      this.updateImageGridColumnWidth();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.imageGridWrapperRef.current && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth) this.updateImageGridColumnWidth();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isLoading = _state.isLoading,
          displayColorPicker = _state.displayColorPicker,
          activeColorFilters = _state.activeColorFilters,
          activeColorFilterIndex = _state.activeColorFilterIndex;

      var colorFilter = activeColorFilters[activeColorFilterIndex] || {};

      return _react2.default.createElement(
        _styledComponents.TabWrap,
        null,
        this.renderSidebar(),
        this.renderContent(),
        displayColorPicker && _react2.default.createElement(
          _styledComponents.SketchPickerWrapper,
          null,
          _react2.default.createElement(_styledComponents.SketchPickerOverlay, { onClick: this.handleClose }),
          _react2.default.createElement(_reactColor.SketchPicker, { color: colorFilter.value, onChange: this.handleChange }),
          _react2.default.createElement(
            _styledComponents.ApplyColorBtn,
            {
              sm: true,
              themeColor: true,
              onClick: this.handleClose,
              style: { zIndex: 5555, position: 'relative' }
            },
            _reactI18nify.I18n.t('upload.apply')
          )
        ),
        _react2.default.createElement(_Spinner.Spinner, { overlay: true, show: isLoading })
      );
    }
  }]);

  return ImagesTab;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (_ref5) {
  var _ref5$uploader = _ref5.uploader,
      backgrounds = _ref5$uploader.backgrounds,
      uploaderConfig = _ref5$uploader.uploaderConfig,
      _ref5$images = _ref5.images,
      images = _ref5$images.images,
      related_tags = _ref5$images.related_tags,
      tags = _ref5$images.tags,
      count = _ref5$images.count,
      searchParams = _ref5$images.searchParams;
  return { backgrounds: backgrounds, uploaderConfig: uploaderConfig, images: images, related_tags: related_tags, tags: tags, count: count, searchParams: searchParams };
}, {
  onGetImagesTags: function onGetImagesTags() {
    return function (dispatch) {
      return dispatch((0, _actions.getImagesTags)());
    };
  },
  onFileUpload: function onFileUpload(file, uploaderConfig) {
    return function (dispatch) {
      return dispatch((0, _index.uploadFilesFromUrls)([file], uploaderConfig));
    };
  },
  onGetBackgrounds: function onGetBackgrounds() {
    return function (dispatch) {
      return dispatch((0, _index.getBackgrounds)());
    };
  },
  onSearchImages: function onSearchImages(searchParams, relevantActiveTags) {
    return function (dispatch) {
      return dispatch((0, _actions.fetchImages)(searchParams, relevantActiveTags));
    };
  },
  modalClose: _index.modalClose
})((0, _radium2.default)(ImagesTab));