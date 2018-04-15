import * as React from 'react';
import { Masonry, CellMeasurer, CellMeasurerCache, AutoSizer, WindowScroller } from 'react-virtualized';
import { createCellPositioner } from 'react-virtualized/dist/es/Masonry';
import { Img, ImageWrapper } from '../styledComponents';
import * as ImageGridService from '../services/imageGrid.service';


class ReactVirtualizedImagesGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this._columnWidth = props.columnWidth || 200;
    this._gutterSize = props.gutterSize || 10;
    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: props.imageContainerHeight || 300,
      defaultWidth: this._columnWidth,
      fixedWidth: false,
    });

    this.state = {
      columnWidth: this._columnWidth,
      height: props.imageContainerHeight || 300,
      gutterSize: this._gutterSize,
      overscanByPixels: 0,
      windowScrollerEnabled: false,
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

    return <div>{child}</div>;
  }

  _calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;
    this._columnCount = ImageGridService.getColumnCount(this._width, columnWidth, gutterSize);
  };

  _cellRenderer = ({ index, key, parent, style }) => {
    const { images } = this.props;
    const { columnWidth } = this.state;
    const image = images[index];

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <ImageWrapper style={{ ...style, width: columnWidth }}>
          <Img
            height={columnWidth / 1.4}
            src={ImageGridService.getCropImageUrl(image.src, columnWidth, columnWidth / 1.4)}
          />
        </ImageWrapper>
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
    this._width = width;

    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  };

  _renderAutoSizer = ({ height, scrollTop }) => {
    this._height = height;
    this._scrollTop = scrollTop;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
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

  _renderMasonry = ({ width }) => {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { imagesNumber } = this.props;
    const { height, overscanByPixels, windowScrollerEnabled } = this.state;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={imagesNumber}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={windowScrollerEnabled ? this._height : height}
        overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
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

  _setMasonryRef = (ref) => {
    this._masonry = ref;
  };
}

export default ReactVirtualizedImagesGrid;