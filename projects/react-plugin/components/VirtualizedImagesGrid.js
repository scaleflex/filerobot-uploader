import * as React from 'react';
import { Masonry, CellMeasurer, CellMeasurerCache, AutoSizer, WindowScroller } from 'react-virtualized';
import { createCellPositioner } from 'react-virtualized/dist/es/Masonry';
import * as ImageGridService from '../services/imageGrid.service';


class ReactVirtualizedImagesGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this._columnWidth = props.columnWidth || 200;
    this._gutterSize = props.gutterSize || 10;
    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: Math.floor(props.imageContainerHeight) || 300,
      defaultWidth: Math.floor(this._columnWidth),
      fixedWidth: false,
    });

    this.state = {
      columnWidth: Math.floor(this._columnWidth),
      height: Math.floor(props.imageContainerHeight) || 300,
      gutterSize: this._gutterSize,
      overscanByPixels: 0,
      windowScrollerEnabled: false
    };
  }

  render() {
    const { overscanByPixels, windowScrollerEnabled, height } = this.state;
    let child;

    if (windowScrollerEnabled) {
      child = (
        <WindowScroller overscanByPixels={overscanByPixels}>
          {this._renderAutoSizer}
        </WindowScroller>
      );
    } else {
      child = this._renderAutoSizer({ height });
    }

    return child;
  }

  _calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;
    this._columnCount = ImageGridService.getColumnCount(this._width, columnWidth, gutterSize);
  };

  _cellRenderer = ({ index, key, parent, style }) => {
    const { list, cellContent } = this.props;
    const { columnWidth } = this.state;
    const item = list[index];

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        {cellContent({ style, columnWidth, item, index, key })}
      </CellMeasurer>
    );
  };

  _initCellPositioner = () => {
    if (typeof this._cellPositioner === 'undefined') {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
      });
    }
  };

  _onResize = ({ width }) => {
    if (width) this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._setMasonryRef.recomputeCellPositions();
  };

  _renderAutoSizer = ({ height, scrollTop }) => {
    this._height = height;
    this._scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
        ref={node => this.child = node}
        disableHeight
        height={height}
        onResize={this._onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this._scrollTop}
      >
        {this._renderMasonry}
      </AutoSizer>
    );
  };

  onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    const self = this;
    const { isShowMoreImages, onShowMoreImages, getImageGridWrapperPosition } = this.props;

    if (getImageGridWrapperPosition ) getImageGridWrapperPosition();

    if (!onShowMoreImages) return;
    if ((clientHeight + scrollTop + 600 >= scrollHeight) && !isShowMoreImages) {
      this.props.onShowMoreImages(() => {
        const resizeTriggers = document.querySelector('div.resize-triggers').parentNode;
        if (resizeTriggers.style.paddingLeft === '9px') resizeTriggers.style.paddingLeft = '10px';
        else resizeTriggers.style.paddingLeft = '9px';
        if (resizeTriggers.style.paddingRight === '9px') resizeTriggers.style.paddingRight = '10px';
        else resizeTriggers.style.paddingRight = '9px';

        self.child._onResize();
      });
    }
  }

  getCoordinates = (index) => {
    const { imageGridWrapperWidth, ratio, additionalImageHeight = 0 } = this.props;
    const { columnWidth, gutterSize } = this.state;
    const perRow = this._columnCount || Math.floor(imageGridWrapperWidth / columnWidth);
    const row = Math.floor(index / perRow);
    const indexInRow = index % perRow;

    return {
      top: Math.floor((columnWidth / ratio) + gutterSize + additionalImageHeight) * row,
      left: (columnWidth + gutterSize) * indexInRow
    };
  }

  _renderMasonry = ({ width }) => {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { count, customPositionHandler } = this.props;
    const { height, overscanByPixels, windowScrollerEnabled } = this.state;

    return (
      <Masonry
        id="image-grid-wrapper"
        autoHeight={windowScrollerEnabled}
        cellCount={count}
        cellMeasurerCache={this._cache}
        cellPositioner={customPositionHandler ? this.getCoordinates : this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={windowScrollerEnabled ? this._height : height}
        overscanByPixels={overscanByPixels}
        ref={node => this._setMasonryRef = node}
        scrollTop={this._scrollTop}
        width={width}
        onScroll={this.onScroll}
        tabIndex={-1}
        onCellsRendered={this.props.getImageGridWrapperPosition}
      />
    );
  };

  _resetCellPositioner = () => {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize,
    });
  };

  _setMasonryRef = (node) => {
    this._masonry = node;
  };
}

export default ReactVirtualizedImagesGrid;