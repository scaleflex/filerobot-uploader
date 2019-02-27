import React, { Component } from 'react';
import prettyBytes from 'pretty-bytes';
import TagsInput from 'react-tagsinput'
import { Spinner } from '../Spinner';
import {
  TaggingTabWrapper, FileWrapper, UploadedImageWrapper, UploadedImage, UploadedImageDesc, PropName, PropValue,
  InputsBlock, Textarea, TagsInputWrapper, Button, TaggingFooter, TaggingContent, InfoIcon,
  ErrorWrapper, ErrorParagraph, GoBack, BackIcon, AutoTaggingProcessLabel
} from './TaggingTab.styled.js'
import ReactTooltip from 'react-tooltip';
import { generateTags, saveMetaData } from "../../services/api.service";
import { I18n } from 'react-i18nify';
import { uniqueArrayOfStrings } from '../../utils/helper.utils';


class TaggingTab extends Component {
  constructor(props) {
    super();

    const { appState, files = {} } = props;
    const { tagging: { autoTaggingButton, executeAfterUpload } = {}, language } = appState.config;
    const [file = {}] = files;
    const date = new Date();
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    const currentTime = (date).toLocaleTimeString(language, options);

    file.properties = file.properties || {};
    file.properties.tags = file.properties.tags || [];

    this.state = {
      tags: file.properties.tags || [],
      description: file.properties.description || '',
      isLoading: false,
      isGeneratingTags: false,
      errorMessage: '',
      currentTime,
      firstLoad: file.created_at ? new Date(file.created_at).toLocaleTimeString(language, options) : currentTime,
      lastModified: file.modified_at ? new Date(file.modified_at).toLocaleTimeString(language, options) : currentTime,
      tagsGenerated: false
    };

    this.isAutoTaggingButton = autoTaggingButton && !executeAfterUpload;
  }

  componentDidMount() {
    const { tagging: { executeAfterUpload } = {} } = this.props.appState.config;

    if (executeAfterUpload && !this.state.tags.length) {
      this.setState({ isGeneratingTags: true });

      this.generateTags();
    }
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value, errorMessage: '' });
  }

  handleTagsChange = (tags) => {
    this.setState({ tags, errorMessage: '' });
  }

  saveMetadata = () => {
    const { description, tags } = this.state;
    const { appState, files } = this.props;
    const { uploadHandler, language } = appState.config;
    const [file = {}] = this.props.files;

    saveMetaData(file.uuid, {
      description,
      tags: uniqueArrayOfStrings(tags),
      lang: language,
      search: `${description} ${tags.join(' ')}`
    }, appState.config)
      .then(response => {
        if (response.status === 'success') {
          files[0].properties = response.properties;
          uploadHandler(files);

          this.setState({ isLoading: true }, () => {
            this.props.setPostUpload(false);
            this.props.closeModal();
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

    const { appState } = this.props;
    const { tagging, language } = appState.config;
    const [file = {}] = this.props.files;

    generateTags(file.url_permalink, tagging, language)
      .then(({ tags, ...props } = {}) => {
        if (tags) {
          if (!tags.length) {
            this.props.showAlert(I18n.t('tagging.asset_could_not_be_automatically_tagged'), '', 'warning');
            this.setState({ isLoading: false, isGeneratingTags: false });

            return;
          }

          let nextTags = [
            ...this.state.tags,
            ...tags.map(item => item && item.tag && item.tag[language])
          ];

          this.setState({
            tags: uniqueArrayOfStrings(nextTags),
            isLoading: false,
            isGeneratingTags: false,
            tagsGenerated: true
          });
        } else {
          this.setState({
              isLoading: false,
              isGeneratingTags: false,
              errorMessage: props.msg || props.message || I18n.t('tagging.something_went_wrong_try_again')
            }
          );
        }
      })
      .catch(e => {
        this.setState({
            isLoading: false,
            isGeneratingTags: false,
            errorMessage: e.msg || e.message || I18n.t('tagging.something_went_wrong_try_again')
          }
        );
      })

    this.setState({ isLoading: true, isGeneratingTags: true, errorMessage: '' });
  }

  goBack = () => {
    this.props.setPostUpload(false);
  }

  render() {
    const { isLoading, errorMessage, currentTime, isGeneratingTags } = this.state;
    const { prevTab } = this.props.appState;
    const [file = {}] = this.props.files;
    const generateTagInfo = I18n.t('tagging.will_automatically_generate_tags');

    return (
      <TaggingTabWrapper>
        <TaggingContent>
          {prevTab &&
          <GoBack href="javascript:void(0)" onClick={this.goBack}><BackIcon/>{I18n.t('tagging.go_back')}</GoBack>}

          <FileWrapper>
            <UploadedImageWrapper>
              <UploadedImage src={`https://demo.cloudimg.io/width/800/n/${file.url_permalink}`}/>
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

          {this.isAutoTaggingButton &&
          <Button
            disabled={this.state.tagsGenerated}
            onClick={this.generateTags}>{I18n.t('tagging.generate_tags')} <InfoIcon
            data-tip={generateTagInfo}/></Button>}

          <Button success onClick={this.saveMetadata}>{I18n.t('tagging.save')}</Button>

        </TaggingFooter>

        <Spinner show={isLoading} overlay/>

        {isGeneratingTags &&
        <AutoTaggingProcessLabel>{I18n.t('tagging.auto_tagging_processing')}</AutoTaggingProcessLabel>}

        <ReactTooltip offset={{ top: 0, right: 2 }} effect="solid"/>
      </TaggingTabWrapper>
    )
  }
}

export default TaggingTab;