var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import { Masonry, CellMeasurer, CellMeasurerCache, AutoSizer, WindowScroller } from 'react-virtualized';
import { createCellPositioner } from 'react-virtualized/dist/es/Masonry';
import * as ImageGridService from '../services/imageGrid.service';

var ReactVirtualizedImagesGrid = function (_React$PureComponent) {
  _inherits(ReactVirtualizedImagesGrid, _React$PureComponent);

  function ReactVirtualizedImagesGrid(props) {
    _classCallCheck(this, ReactVirtualizedImagesGrid);

    var _this = _possibleConstructorReturn(this, (ReactVirtualizedImagesGrid.__proto__ || Object.getPrototypeOf(ReactVirtualizedImagesGrid)).call(this, props));

    _this._calculateColumnCount = function () {
      var _this$state = _this.state,
          columnWidth = _this$state.columnWidth,
          gutterSize = _this$state.gutterSize;

      _this._columnCount = ImageGridService.getColumnCount(_this._width, columnWidth, gutterSize);
    };

    _this._cellRenderer = function (_ref) {
      var index = _ref.index,
          key = _ref.key,
          parent = _ref.parent,
          style = _ref.style;
      var _this$props = _this.props,
          list = _this$props.list,
          cellContent = _this$props.cellContent;
      var columnWidth = _this.state.columnWidth;

      var item = list[index];

      return React.createElement(
        CellMeasurer,
        { cache: _this._cache, index: index, key: key, parent: parent },
        cellContent({ style: style, columnWidth: columnWidth, item: item, index: index, key: key })
      );
    };

    _this._initCellPositioner = function () {
      if (typeof _this._cellPositioner === 'undefined') {
        var _this$state2 = _this.state,
            columnWidth = _this$state2.columnWidth,
            gutterSize = _this$state2.gutterSize;


        _this._cellPositioner = createCellPositioner({
          cellMeasurerCache: _this._cache,
          columnCount: _this._columnCount,
          columnWidth: columnWidth,
          spacer: gutterSize
        });
      }
    };

    _this._onResize = function (_ref2) {
      var width = _ref2.width;

      if (width) _this._width = width;

      _this._calculateColumnCount();
      _this._resetCellPositioner();
      _this._setMasonryRef.recomputeCellPositions();
    };

    _this._renderAutoSizer = function (_ref3) {
      var height = _ref3.height,
          scrollTop = _ref3.scrollTop;

      _this._height = height;
      _this._scrollTop = scrollTop;

      var overscanByPixels = _this.state.overscanByPixels;


      return React.createElement(
        AutoSizer,
        {
          ref: _this.child,
          disableHeight: true,
          height: height,
          onResize: _this._onResize,
          overscanByPixels: overscanByPixels,
          scrollTop: _this._scrollTop
        },
        _this._renderMasonry
      );
    };

    _this.onScroll = function (_ref4) {
      var clientHeight = _ref4.clientHeight,
          scrollHeight = _ref4.scrollHeight,
          scrollTop = _ref4.scrollTop;

      var self = _this;
      var _this$props2 = _this.props,
          isShowMoreImages = _this$props2.isShowMoreImages,
          onShowMoreImages = _this$props2.onShowMoreImages;


      if (!onShowMoreImages) return;
      if (clientHeight + scrollTop + 600 >= scrollHeight && !isShowMoreImages) {
        _this.props.onShowMoreImages(function () {
          var resizeTriggers = document.querySelector('div.resize-triggers').parentNode;
          if (resizeTriggers.style.paddingLeft === '9px') resizeTriggers.style.paddingLeft = '10px';else resizeTriggers.style.paddingLeft = '9px';
          if (resizeTriggers.style.paddingRight === '9px') resizeTriggers.style.paddingRight = '10px';else resizeTriggers.style.paddingRight = '9px';

          self.child.current._onResize();
        });
      }
    };

    _this._renderMasonry = function (_ref5) {
      var width = _ref5.width;

      _this._width = width;

      _this._calculateColumnCount();
      _this._initCellPositioner();

      var count = _this.props.count;
      var _this$state3 = _this.state,
          height = _this$state3.height,
          overscanByPixels = _this$state3.overscanByPixels,
          windowScrollerEnabled = _this$state3.windowScrollerEnabled;


      return React.createElement(Masonry, {
        autoHeight: windowScrollerEnabled,
        cellCount: count,
        cellMeasurerCache: _this._cache,
        cellPositioner: _this._cellPositioner,
        cellRenderer: _this._cellRenderer,
        height: windowScrollerEnabled ? _this._height : height,
        overscanByPixels: overscanByPixels,
        ref: function ref(_ref6) {
          return _this._setMasonryRef = _ref6;
        },
        scrollTop: _this._scrollTop,
        width: width,
        onScroll: _this.onScroll
      });
    };

    _this._resetCellPositioner = function () {
      var _this$state4 = _this.state,
          columnWidth = _this$state4.columnWidth,
          gutterSize = _this$state4.gutterSize;


      _this._cellPositioner.reset({
        columnCount: _this._columnCount,
        columnWidth: columnWidth,
        spacer: gutterSize
      });
    };

    _this._setMasonryRef = function (ref) {
      _this._masonry = ref;
    };

    _this._columnWidth = props.columnWidth || 200;
    _this._gutterSize = props.gutterSize || 10;
    _this._columnCount = 0;

    _this._cache = new CellMeasurerCache({
      defaultHeight: props.imageContainerHeight || 300,
      defaultWidth: _this._columnWidth,
      fixedWidth: false
    });

    _this.state = {
      columnWidth: _this._columnWidth,
      height: props.imageContainerHeight || 300,
      gutterSize: _this._gutterSize,
      overscanByPixels: 0,
      windowScrollerEnabled: false
    };
    _this.child = React.createRef();
    return _this;
  }

  _createClass(ReactVirtualizedImagesGrid, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          overscanByPixels = _state.overscanByPixels,
          windowScrollerEnabled = _state.windowScrollerEnabled,
          height = _state.height;

      var child = void 0;

      if (windowScrollerEnabled) {
        child = React.createElement(
          WindowScroller,
          { overscanByPixels: overscanByPixels },
          this._renderAutoSizer
        );
      } else {
        child = this._renderAutoSizer({ height: height });
      }

      return child;
    }
  }]);

  return ReactVirtualizedImagesGrid;
}(React.PureComponent);

export default ReactVirtualizedImagesGrid;