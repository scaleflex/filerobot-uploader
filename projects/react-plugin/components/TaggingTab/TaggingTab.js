import React, { Component } from 'react';
import { connect } from 'react-redux';
import prettyBytes from 'pretty-bytes';
import TagsInput from 'react-tagsinput'
import { Spinner } from '../Spinner';
import {
  TaggingTabWrapper, FileWrapper, UploadedImageWrapper, UploadedImage, UploadedImageDesc, PropName, PropValue,
  InputsBlock, InputLabel, Textarea, TagsInputWrapper, Button, TaggingFooter, TaggingContent, InfoIcon,
  ErrorWrapper, ErrorParagraph, GoBack, BackIcon
} from './TaggingTab.styled.js'
import ReactTooltip from 'react-tooltip';
import { generateTags, saveMetaData } from "../../services/api.service";
import { modalClose } from '../../actions';


class TaggingTab extends Component {
  constructor() {
    super();

    const date = new Date();
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };

    this.state = {
      tags: [],
      description: '',
      isLoading: false,
      errorMessage: '',
      currentTime: date.toLocaleTimeString("en-us", options)
    };
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value, errorMessage: '' });
  }

  handleTagsChange = (tags) => {
    this.setState({ tags, errorMessage: '' });
  }

  saveMetadata = () => {
    const { description, tags } = this.state;
    const { files, uploadHandler, language, config } = this.props;
    const [file = {}] = this.props.files;
    const nextTags = tags.map(tagName => ({ [language]: tagName }))

    saveMetaData(file.uuid, { description, tags: nextTags }, config)
      .then(response => {
        if (response.status === 'success') {
          uploadHandler(files, nextTags, description);

          this.setState({ isLoading: true }, () => {
            this.props.setPostUpload(false);
            this.props.modalClose();
          });
        } else {
          this.setState({
            errorMessage: response.msg || response.message || 'something went wrong, try again',
            isLoading: false
          })
        }
      });

    this.setState({ isLoading: true });
  }

  generateTags = () => {
    const { taggingConfig, language } = this.props;
    const [file = {}] = this.props.files;

    generateTags(file.url_permalink, taggingConfig).then(({ tags, ...props } = {}) => {
      if (tags) {
        this.setState({
          tags: tags.map(item => item && item.tag && item.tag[language]),
          isLoading: false
        });
      } else {
        this.setState({
            isLoading: false,
            errorMessage: props.msg || props.message || 'something went wrong, try again'
          }
        );
      }
    });

    this.setState({ isLoading: true, errorMessage: '' });
  }

  goBack = () => {
    this.props.setPostUpload(false);
  }

  render() {
    const { isLoading, errorMessage, currentTime } = this.state;
    const { autoTagging, prevTab } = this.props;
    const [file = {}] = this.props.files;
    const generateTagInfo = 'will automatically generate tags based on image recognition technology';

    return (
      <TaggingTabWrapper>
        <TaggingContent>
          {prevTab &&
          <GoBack href="javascript:void(0)" onClick={this.goBack}><BackIcon/>Go back</GoBack>}

          <FileWrapper>
            <UploadedImageWrapper>
              <UploadedImage src={`https://demo.cloudimg.io/width/800/q80.foil1/${file.url_permalink}`}/>
            </UploadedImageWrapper>

            <UploadedImageDesc>
              <ul>
                <li>
                  <PropName>File name:</PropName>
                  <PropValue>{file.name}</PropValue>
                </li>
                <li>
                  <PropName>Size:</PropName>
                  <PropValue>{prettyBytes(file.size)}</PropValue>
                </li>
                <li>
                  <PropName>First Upload:</PropName>
                  <PropValue>{currentTime}</PropValue>
                </li>
                <li>
                  <PropName>Last Modified:</PropName>
                  <PropValue>{currentTime}</PropValue>
                </li>
              </ul>
            </UploadedImageDesc>
          </FileWrapper>

          <InputsBlock>
            <Textarea
              value={this.state.description}
              placeholder={'Add description'}
              onChange={this.handleDescriptionChange}
            />

            <TagsInputWrapper>
              <TagsInput
                value={this.state.tags}
                onChange={this.handleTagsChange}
                inputProps={{
                  placeholder: 'Add a tag (separate by pressing enter)'
                }}
              />
            </TagsInputWrapper>

          </InputsBlock>

          {errorMessage &&
          <ErrorWrapper>
            <ErrorParagraph>
              {errorMessage}
            </ErrorParagraph>
          </ErrorWrapper>}
        </TaggingContent>

        <TaggingFooter>

          {autoTagging &&
          <Button onClick={this.generateTags}>Generate tags <InfoIcon data-tip={generateTagInfo}/></Button>}

          <Button success onClick={this.saveMetadata}>Save</Button>

        </TaggingFooter>

        <Spinner show={isLoading} overlay/>

        <ReactTooltip/>
      </TaggingTabWrapper>
    )
  }
}

const mapStateToProps = state => ({
  uploadHandler: state.uploader.uploaderConfig.uploadHandler,
  autoTagging: state.uploader.uploaderConfig.tagging.auto_tagging,
  taggingConfig: state.uploader.uploaderConfig.tagging,
  language: state.uploader.uploaderConfig.language,
  config: state.uploader.uploaderConfig
})

export default connect(
  mapStateToProps,
  { modalClose, generateTags }
)(TaggingTab);