import * as React from 'react';
import { CellMeasurer, CellMeasurerCache, AutoSizer, WindowScroller } from 'react-virtualized';
import { createCellPositioner, Masonry } from 'react-virtualized/dist/es/Masonry';
import { IconsCss as styles } from '../assets/styles'
import { IconImage } from '../styledComponents/IconTab.styled';


const contentStyles = styles.container.content;
const iconStyles = contentStyles.results.icon;


class ReactVirtualizedImagesGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this._columnWidth = props.columnWidth || 100;
    this._gutterSize = props.gutterSize || 10;
    this._columnCount = 3;

    this._cache = new CellMeasurerCache({
      defaultHeight: 100,
      defaultWidth: this._columnWidth,
      fixedWidth: false,
    });

    this.state = {
      columnWidth: this._columnWidth,
      height: 300,
      gutterSize: this._gutterSize,
      overscanByPixels: 0,
      windowScrollerEnabled: true,
    };
  }

  render() {
    const { overscanByPixels, windowScrollerEnabled, height } = this.state;

    return <div>{this._renderAutoSizer({ height })}</div>;
  }

  _calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;
    //this._columnCount = ImageGridService.getColumnCount(this._width, columnWidth, gutterSize);
    this._columnCount = 4;
  };

  onLoadImage = (target) => {
    target.style.opacity = 1;
    target.style.background = '#fff';
  }

  _cellRenderer = ({ index, key, parent, style }) => {
    const { images, isUploading, uploadingIcon, upload } = this.props;
    const { columnWidth } = this.state;
    const image = images[index];

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div
          className="airstore-uploader-icon-item"
          style={[
            iconStyles,
            isUploading && uploadingIcon === image.src && iconStyles.loading.active,
            isUploading && uploadingIcon !== image.src && iconStyles.loading.notActive
          ]}
          onClick={() => { upload(image) }}
          onKeyDown={event => { event.keyCode === 13 && upload(image); }}
          tabIndex={0}
        >
          <div style={[iconStyles.imageWrap]}>
            <IconImage
              src={image.src}
              width="100%"
              height="100%"
              alt={image.desc}
              onLoad={({ target }) => this.onLoadImage(target)}
            />
          </div>
        </div>
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

    return this._renderMasonry({ width: '100%' });
  };

  _renderMasonry = ({ width }) => {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { imagesNumber } = this.props;
    const { height, overscanByPixels, windowScrollerEnabled } = this.state;

    return (
      <Masonry
        cellCount={imagesNumber}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
       // autoHeight={windowScrollerEnabled}
        //overscanByPixels={overscanByPixels}
        ref={this._setMasonryRef}
        //scrollTop={this._scrollTop}
        width={width}
        height={windowScrollerEnabled ? this._height : height}
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