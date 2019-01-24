import React, { Component } from 'react';
import { connect } from 'react-redux';
import prettyBytes from 'pretty-bytes';
import TagsInput from 'react-tagsinput'
import { Spinner } from '../Spinner';
import {
  TaggingTabWrapper, FileWrapper, UploadedImageWrapper, UploadedImage, UploadedImageDesc, PropName, PropValue,
  InputsBlock, Textarea, TagsInputWrapper, Button, TaggingFooter, TaggingContent, InfoIcon,
  ErrorWrapper, ErrorParagraph, GoBack, BackIcon
} from './TaggingTab.styled.js'
import ReactTooltip from 'react-tooltip';
import { generateTags, saveMetaData } from "../../services/api.service";
import { modalClose } from '../../actions';
import { I18n } from 'react-i18nify';
import { uniqueArrayOfStrings } from '../../utils/helper.utils';


class TaggingTab extends Component {
  constructor(props) {
    super();

    const { files = {} } = props;
    const [file = {}] = files;
    const date = new Date();
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    const currentTime = (date).toLocaleTimeString("en-us", options);

    file.properties = file.properties || {};
    file.properties.tags = file.properties.tags || [];

    this.state = {
      tags: file.properties.tags || [],
      description: file.properties.description || '',
      isLoading: false,
      errorMessage: '',
      currentTime,
      firstLoad: file.created_at ? new Date(file.created_at).toLocaleTimeString("en-us", options) : currentTime,
      lastModified: file.modified_at ? new Date(file.modified_at).toLocaleTimeString("en-us", options) : currentTime,
      tagsGenerated: false
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

    saveMetaData(file.uuid, {
      description,
      tags: uniqueArrayOfStrings(tags),
      lang: language,
      search: `${description} ${tags.join(' ')}`
    }, config)
      .then(response => {
        if (response.status === 'success') {
          files[0].properties = response.properties;
          uploadHandler(files);

          this.setState({ isLoading: true }, () => {
            this.props.setPostUpload(false);

            if (this.props.onClose) this.props.onClose();

            this.props.modalClose();
          });
        } else {
          this.setState({
            errorMessage: response.msg || response.message || I18n.t('tagging.something_went_wrong_try_again'),
            isLoading: false
          })
        }
      });

    this.setState({ isLoading: true });
  }

  generateTags = () => {
    if (this.state.tagsGenerated) return;

    const { taggingConfig, language } = this.props;
    const [file = {}] = this.props.files;

    generateTags(file.url_permalink, taggingConfig, language).then(({ tags, ...props } = {}) => {
      if (tags) {
        if (!tags.length) {
          this.props.showAlert(I18n.t('tagging.asset_could_not_be_automatically_tagged'), '', 'warning');
        }

        let nextTags = [
          ...this.state.tags,
          ...tags.map(item => item && item.tag && item.tag[language])
        ];

        this.setState({
          tags: uniqueArrayOfStrings(nextTags),
          isLoading: false,
          tagsGenerated: true
        });
      } else {
        this.setState({
            isLoading: false,
            errorMessage: props.msg || props.message || I18n.t('tagging.something_went_wrong_try_again')
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
    const generateTagInfo = I18n.t('tagging.will_automatically_generate_tags');

    return (
      <TaggingTabWrapper>
        <TaggingContent>
          {prevTab &&
          <GoBack href="javascript:void(0)" onClick={this.goBack}><BackIcon/>{I18n.t('tagging.go_back')}</GoBack>}

          <FileWrapper>
            <UploadedImageWrapper>
              <UploadedImage src={`https://demo.cloudimg.io/width/800/q80.foil1/${file.url_permalink}`}/>
            </UploadedImageWrapper>

            <UploadedImageDesc>
              <ul>
                <li>
                  <PropName>{I18n.t('tagging.file_name')}:</PropName>
                  <PropValue>{file.name}</PropValue>
                </li>
                <li>
                  <PropName>{I18n.t('tagging.size')}:</PropName>
                  <PropValue>{prettyBytes(file.size)}</PropValue>
                </li>
                <li>
                  <PropName>{I18n.t('tagging.first_upload')}:</PropName>
                  <PropValue>{currentTime}</PropValue>
                </li>
                <li>
                  <PropName>{I18n.t('tagging.last_modified')}:</PropName>
                  <PropValue>{currentTime}</PropValue>
                </li>
              </ul>
            </UploadedImageDesc>
          </FileWrapper>

          <InputsBlock>
            <Textarea
              value={this.state.description}
              placeholder={I18n.t('tagging.add_description')}
              onChange={this.handleDescriptionChange}
            />

            <TagsInputWrapper>
              <TagsInput
                value={this.state.tags}
                onChange={this.handleTagsChange}
                inputProps={{
                  placeholder: I18n.t('tagging.add_a_tag_separate_by_pressing_enter')
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
          <Button
            disabled={this.state.tagsGenerated}
            onClick={this.generateTags}>{I18n.t('tagging.generate_tags')} <InfoIcon data-tip={generateTagInfo}/></Button>}

          <Button success onClick={this.saveMetadata}>{I18n.t('tagging.save')}</Button>

        </TaggingFooter>

        <Spinner show={isLoading} overlay/>

        <ReactTooltip offset={{top: 0, right: 2}} effect="solid"/>
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