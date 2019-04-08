import React, { Component } from 'react';
import prettyBytes from 'pretty-bytes';
import TagsInput from 'react-tagsinput'
import { Spinner } from '../Spinner';
import {
  TaggingTabWrapper, FileWrapper, UploadedImageWrapper, UploadedImage, UploadedImageDesc, PropName, PropValue,
  InputsBlock, Textarea, TagsInputWrapper, Button, TaggingFooter, TaggingContent, InfoIcon, ToggleCropMenu,
  ErrorWrapper, ErrorParagraph, GoBack, BackIcon, AutoTaggingProcessLabel,
} from './TaggingTab.styled.js'
import ReactTooltip from 'react-tooltip';
import { generateTags, saveMetaData } from "../../services/api.service";
import { I18n } from 'react-i18nify';
import { uniqueArrayOfStrings } from '../../utils/helper.utils';
import { getFileIconSrcByType, isImage } from '../../utils/icons.utils';
import CropsBox from './CropsBox';
import { encodePermalink } from '../../utils';
import md5 from '../../utils/md5';


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
      tagsGenerated: false,
      isCropsBoxShow: false
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

  componentDidUpdate(prevProps) {
    if (this.props.files !== prevProps.files) {
      const { appState, files = {} } = this.props;
      const [file = {}] = files;
      const { language } = appState.config;
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
        firstLoad: file.created_at ? new Date(file.created_at).toLocaleTimeString(language, options) : '',
        lastModified: file.modified_at ? new Date(file.modified_at).toLocaleTimeString(language, options) : '',
        tagsGenerated: false,
        isCropsBoxShow: false
      };
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
    const { appState, files, options = {} } = this.props;
    const { prevTab } = appState;
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
          uploadHandler(files, { stage: 'tagging' });

          this.setState({ isLoading: true }, () => {
            this.props.setPostUpload(false, '', 'TAGGING');

            if (options.closeOnEdit || prevTab !== 'MY_GALLERY') {
              this.props.closeModal();
            }
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
    const { tagging, language, container, filerobotUploadKey, cloudimageToken } = appState.config;
    const [file = {}] = this.props.files;

    generateTags(encodePermalink(file.url_permalink), tagging, language, container, filerobotUploadKey, cloudimageToken)
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

  setSpinner = (value) => {
    this.setState({ isLoading: value })
  }

  goBack = () => {
    const { options = {} } = this.props;

    this.props.setPostUpload(false);

    if (options.closeOnEdit)
      this.props.closeModal();
  }

  toggleCropMenu = () => {
    this.setState({ isCropsBoxShow: !this.state.isCropsBoxShow });
  }

  render() {
    const { isLoading, errorMessage, currentTime, firstLoad, lastModified, isGeneratingTags, isCropsBoxShow } = this.state;
    const { prevTab, config } = this.props.appState;
    const { autoCropSuggestions } = config;
    const [file = {}] = this.props.files;
    const generateTagInfo = I18n.t('tagging.will_automatically_generate_tags');
    const isImageType = isImage(file.type);
    const icon = isImageType ? encodePermalink(file.url_permalink) : getFileIconSrcByType(file.type);

    return (
      <TaggingTabWrapper>
        <TaggingContent>
          {prevTab &&
          <GoBack href="javascript:void(0)" onClick={this.goBack}><BackIcon/>{I18n.t('tagging.go_back')}</GoBack>}
          {autoCropSuggestions && isImageType &&
          <ToggleCropMenu onClick={this.toggleCropMenu}>Auto Crop</ToggleCropMenu>}

          <FileWrapper>
            <UploadedImageWrapper>
              <UploadedImage
                isNotImage={!isImageType}
                src={`https://demo.cloudimg.io/width/800/n/${icon}?${md5(file.modified_at || file.sha1).split(0, 5)}`}
              />
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
                  <PropValue>{firstLoad || currentTime}</PropValue>
                </li>
                <li>
                  <PropName>{I18n.t('tagging.last_modified')}:</PropName>
                  <PropValue>{lastModified || currentTime}</PropValue>
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

        {autoCropSuggestions && isImageType &&
        <CropsBox
          appState={this.props.appState}
          show={isCropsBoxShow}
          setSpinner={this.setSpinner}
          showAlert={this.props.showAlert}
          saveUploadedFiles={this.props.saveUploadedFiles}
          src={`${icon}?${md5(file.modified_at || file.sha1).split(0, 5)}`}
          toggleCropMenu={this.toggleCropMenu}
        />}

        <Spinner show={isLoading} overlay/>

        {isGeneratingTags &&
        <AutoTaggingProcessLabel>{I18n.t('tagging.auto_tagging_processing')}</AutoTaggingProcessLabel>}

        <ReactTooltip offset={{ top: 0, right: 2 }} effect="solid"/>
      </TaggingTabWrapper>
    )
  }
}

export default TaggingTab;