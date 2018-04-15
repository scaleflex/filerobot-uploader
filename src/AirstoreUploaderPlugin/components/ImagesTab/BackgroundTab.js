import React, { Component } from 'react';
import Radium from 'radium';
import { CSS, BgCss as styles } from '../../assets/styles/index';
import { getBackgrounds, uploadFilesFromUrls } from '../../actions/index';
import { connect } from 'react-redux';
import { SidebarWrap, ColorItem, ColorItemName, ActiveItem, TabWrap, SideBar, ColorType } from '../../styledComponents/index';

class BackgroundTab extends Component {
  state = { isLoading: false, uploadingUuid: null };

  uploadStart = uuid => this.setState({ uploadingUuid: uuid, isLoading: true });

  uploadStop = () => this.setState({ uploadingUuid: null, isLoading: false });

  upload = (bg = {}) => {
    if (this.state.isLoading) return;

    this.uploadStart(bg.uuid);
    this.props.onFileUpload(bg.url_public, this.props.uploaderConfig)
      .then(() => this.uploadStop(), () => this.uploadStop());
  };

  componentDidMount() {
    this.props.onGetBackgrounds();
  }

  onKeyDown = (event, bg) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.upload(bg);
    }
  }

  render() {
    return (
      <TabWrap>
        { this.renderSidebar() }
        { this.renderContent() }
      </TabWrap>
    )
  }

  renderSidebar = () => {
    return (
      <SidebarWrap>
        <SideBar>
          <ColorType>
            <ColorItem
              active={false}
              key="type-of-background-one"
              // onClick={}
            >
              <ColorItemName>Transport</ColorItemName>
            </ColorItem>
            <ColorItem
              active={true}
              key="type-of-background-two"
              // onClick={}
            >
              <ColorItemName>Interface</ColorItemName>
            </ColorItem>
          </ColorType>
        </SideBar>
      </SidebarWrap>
    )
  };

  renderContent = () => {
    const { isLoading, uploadingUuid } = this.state;
    const itemStyles = styles.container.item;

    return (
      <div style={[ styles.container ]}>
        {this.props.backgrounds.map((bg, index) =>
          <div
            style={[
              itemStyles,
              isLoading && uploadingUuid === bg.uuid && itemStyles.loading.active,
              isLoading && uploadingUuid !== bg.uuid && itemStyles.loading.notActive
            ]}
            key={`bg-${bg.uuid}`}
            onClick={this.upload.bind(this, bg)}
            role="button"
            tabIndex={0}
            onKeyDown={event => this.onKeyDown(event, bg)}
          >
            <span style={[ styles.container.item.alignmentBlock ]}/>
            <img
              style={[ styles.container.item.img ]}
              src={bg.url_preview}
              alt={bg.alt || `background ${index + 1}`}
              width="100%"
              height="auto"
            />
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  ({ uploader: { backgrounds, uploaderConfig } }) => ({ backgrounds, uploaderConfig }),
  dispatch => ({
    onFileUpload: (file, uploaderConfig) => dispatch(uploadFilesFromUrls([ file ], uploaderConfig)),
    onGetBackgrounds: () => dispatch(getBackgrounds())
  })
)(Radium(BackgroundTab));