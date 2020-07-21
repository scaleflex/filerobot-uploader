import React, { Component } from 'react';
import prettyBytes from 'pretty-bytes';
import TagsInput from 'react-tagsinput';
import { Spinner } from '../Spinner';
import {
  AutoTaggingProcessLabel,
  BackIcon,
  Button,
  ErrorParagraph,
  ErrorWrapper,
  FileWrapper,
  GoBack,
  InfoIcon,
  Input,
  InputsBlock,
  PropName,
  PropValue,
  TaggingContent,
  TaggingFooter,
  TaggingTabWrapper,
  TagsInputWrapper,
  Textarea,
  UploadedImage,
  UploadedImageDesc,
  UploadedImageWrapper,
  MultiplyImageWrapper,
  ContentWrapper,
  ImagesWrapper
} from './TaggingTab.styled.js';
import ReactTooltip from 'react-tooltip';
import { generateTags, saveMetaData, updateProduct, generateMultiplyImagesTags } from '../../services/api.service';
import { I18n } from 'react-i18nify';
import { uniqueArrayOfStrings, nonUniqueArrayOfStrings, uniqueArrayOfStringsInObject } from '../../utils/helper.utils';
import { getFileIconSrcByType, isImage, isAllImages } from '../../utils/icons.utils';
import { encodePermalink } from '../../utils';
import { getPubliclink, getCDNlink } from '../../utils/adjustAPI.utils';
import AutosuggestionInput from './AutosuggestionInput';


class TaggingTab extends Component {
  constructor(props) {
    super();

    const { appState, files = {} } = props;
    const { tagging: { customFields = [] } = {}, language } = appState.config;
    const isOneFile = files.length === 1;
    const firstFile = files[0];
    const { ref: productRef = '', position: productPosition = '' } = firstFile.product || {};
    const date = new Date();
    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    };
    const currentTime = (date).toLocaleTimeString(language, options);
    const commonTags = [];
    const personalTags = [];

    files.forEach(file => {
      file.properties = file.properties || {};
      file.properties.tags = file.properties.tags || [];
      commonTags.push(...file.properties.tags);
      personalTags[file.uuid] = file.properties.tags;
    });

    let customFieldsProps = {};

    if (customFields && customFields.length) {
      customFieldsProps = this.getCustomFields(customFields, firstFile.properties);
    }

    this.state = {
      tags: isOneFile ? firstFile.properties.tags : nonUniqueArrayOfStrings(commonTags, files.length),
      description: firstFile.properties.description || '',
      ...customFieldsProps,
      isLoading: false,
      isGeneratingTags: false,
      errorMessage: '',
      currentTime,
      firstLoad: firstFile.created_at ? new Date(firstFile.created_at).toLocaleTimeString(language, options) : currentTime,
      lastModified: firstFile.modified_at ? new Date(firstFile.modified_at).toLocaleTimeString(language, options) : currentTime,
      tagsGenerated: false,
      productRef,
      productPosition,
      oldProductRef: productRef,
      oldProductPosition: productPosition,
      isUpdatingProduct: false,
      personalTags: uniqueArrayOfStringsInObject(personalTags),
      removedTags: []
    };
  }

  componentDidMount() {
    const { files = [], config, prevTab, uploadedImageData } = this.props.appState;
    const { tagging: { executeAfterUpload } = {} } = config;
    const firstFile = files[0];
    const isOneFile = files.length === 1;
    const isImageType = isOneFile ? isImage(firstFile.type) : isAllImages(files);
    const isPreviousGallery = prevTab === "MY_GALLERY";
    const isPreviousEditor = prevTab === "IMAGE_EDITOR";

    if ((isPreviousGallery || isPreviousEditor ? false : executeAfterUpload) && !this.state.tags.length && isImageType) {
      this.setState({ isGeneratingTags: true });

      this.generateTags(isOneFile);
    }

    if (isPreviousEditor)
      this.setState(uploadedImageData);

    if (this._saveMetadataBtn) this._saveMetadataBtn.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.files !== prevProps.files) {
      const { appState, files = {} } = this.props;
      const isOneFile = files.length === 1;
      const firstFile = files[0];
      const { language } = appState.config;
      const date = new Date();
      const options = {
        weekday: 'long', year: 'numeric', month: 'short',
        day: 'numeric', hour: '2-digit', minute: '2-digit'
      };
      const currentTime = (date).toLocaleTimeString(language, options);
      const commonTags = [];
      const personalTags = [];

      files.forEach(file => {
        file.properties = file.properties || {};
        file.properties.tags = file.properties.tags || [];
        commonTags.push(...file.properties.tags);
        personalTags[file.uuid] = file.properties.tags;
      });

      this.state = {
        tags: isOneFile ? firstFile.properties.tags : nonUniqueArrayOfStrings(commonTags, files.length),
        description: firstFile.properties.description || '',
        isLoading: false,
        isGeneratingTags: false,
        errorMessage: '',
        currentTime,
        firstLoad: firstFile.created_at ? new Date(firstFile.created_at).toLocaleTimeString(language, options) : '',
        lastModified: firstFile.modified_at ? new Date(firstFile.modified_at).toLocaleTimeString(language, options) : '',
        tagsGenerated: false,
        personalTags: uniqueArrayOfStringsInObject(personalTags),
      };
    }
  }

  componentWillUnmount() {
    const { productRef, productPosition, description, tags } = this.state;
    const { tagging: { customFields = [] } = {} }  = this.props.appState.config;
    const uploadedImageData = {
      description,
      productRef,
      productPosition,
      tags
    };

    if (customFields.length) {
      customFields.forEach(field => {
        uploadedImageData[field.metaKey] = this.state[field.metaKey];
      });
    }

    this.props.setAppState({ uploadedImageData });
  }

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value, errorMessage: '' });
    this.props.setAppState({ hasChanged: true });
  };

  handleTagsChange = (newTags = [], lastTag = []) => {
    const { removedTags } = this.state;
    const isNewAdded = newTags.includes(lastTag[0]);
    this.setState({ tags: newTags, errorMessage: '' });
    this.props.setAppState({ hasChanged: true });

    if (!isNewAdded) {
      const nextRemovedTags = [...removedTags, ...lastTag];
      this.setState({ removedTags: nextRemovedTags });
    }
  };

  getCustomFields = (customFields = [], properties) => {
    const customFieldsProps = {};

    customFields.forEach(field => {
      customFieldsProps[field.metaKey] = properties[field.metaKey] || '';
    });

    return customFieldsProps;
  };

  saveMetadataAndModify = () => {
    this.saveMetadata(true, () => {
      if (this.props.appState.config.imageEditor.active) {
        const { path, files } = this.props;

        this.props.saveUploadedFiles(files);
        this.props.setPostUpload(true, 'IMAGE_EDITOR', 'MY_GALLERY', { path, modifyURL: true });
      }
    });
  }

  saveMetadata = (isModifyURL, callback) => {
    const { description, tags, personalTags, removedTags } = this.state;
    const { appState, files = [], options = {} } = this.props;
    const { prevTab } = appState;
    const { uploadHandler, language, tagging } = appState.config;
    const { customFields = [] } = tagging;
    const nextPersonalTags = {};
    let customFieldsProps = {};

    Object.keys(personalTags).forEach(key => {
      nextPersonalTags[key] = personalTags[key].filter(tag => !removedTags.find(removedTag => removedTag === tag))
    });

    if (customFields && customFields.length) {
      customFieldsProps = this.getCustomFields(customFields, this.state);
    }

    saveMetaData(files, {
      description,
      tags: uniqueArrayOfStrings(tags),
      lang: language,
      search: `${description} ${tags.join(' ')}`,
      ...customFieldsProps
    }, appState.config, nextPersonalTags)
      .then(images => {
        images.forEach(image => {
          if (image.status === 'success') {
            const findIndex = files.findIndex(file => file.uuid === image.file_uuid);
            files[findIndex].properties = image.properties;
          } else {
            this.setState({
              errorMessage: image.msg || image.message || I18n.t('tagging.something_went_wrong_try_again'),
              isLoading: false
            });
          }
        });

        uploadHandler(files, { stage: 'tagging' });
        this.setState({ isLoading: true }, () => {
          this.props.setPostUpload(false, '', 'TAGGING');

          if ((options.closeOnEdit || prevTab !== 'MY_GALLERY') && !isModifyURL) {
            this.props.closeModal();
          }

          if (typeof callback === "function") {
            callback();
          }
        });
      });

    this.props.setAppState({ hasChanged: false, uploadedImageData: {} });
    this.setState({ isLoading: true });
  };

  generateTags = (isOneFile) => {
    if (this.state.tagsGenerated) return;

    const { appState, files } = this.props;
    const { tagging, language, container, baseAPI, platform, uploadKey, cloudimageToken } = appState.config;
    const firstFile = files[0];
    const filesWithoutTags = files.filter(file => !file.properties.tags.length).map(file => file.uuid);

    isOneFile ?
      generateTags(firstFile.uuid, tagging, language, container, baseAPI, platform, uploadKey, cloudimageToken)
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
        .catch(error => {
          const { response: { data = {} } = {} } = error;

          this.setState({
              isLoading: false,
              isGeneratingTags: false,
              errorMessage: data.msg || error.message || error.msg || I18n.t('tagging.something_went_wrong_try_again')
            }
          );
        })
      :
      generateMultiplyImagesTags(filesWithoutTags, tagging, language, container, baseAPI, platform, uploadKey, cloudimageToken)
        .then((images) => {
          const commonTags = [];
          const personalTags = {};

          files.forEach(image => { personalTags[image.uuid] = image.properties.tags; });

          images.forEach(image => {
            if (image.tags) {
              if (!image.tags.length) {
                const imageName = image.meta.url.match(/[\w-]+\.(jpg|png|jpeg|svg|gif|WebP)/g)[0] || '';
                this.props.showAlert(`${imageName} ${I18n.t('tagging.could_not_be_automatically_tagged')}`, '', 'warning');
              } else {
                commonTags.push(...image.tags.map(tag => tag && tag.tag && tag.tag[language]));
                personalTags[image.meta.uuid] = [...image.tags.map(tag => tag && tag.tag && tag.tag[language])];
              }
            }
          });

          this.setState({
            tags: nonUniqueArrayOfStrings(commonTags, files.length),
            personalTags: uniqueArrayOfStringsInObject(personalTags),
            isLoading: false,
            isGeneratingTags: false,
            tagsGenerated: true
          });
        })
        .catch(error => {
          const { response: { data = {} } = {} } = error;

          this.setState({
              isLoading: false,
              isGeneratingTags: false,
              errorMessage: data.msg || error.message || error.msg || I18n.t('tagging.something_went_wrong_try_again')
            }
          );
        });

    this.setState({ isLoading: true, isGeneratingTags: true, errorMessage: '' });
  };

  setSpinner = (value) => {
    this.setState({ isLoading: value });
  };

  goBack = () => {
    const { options = {}, appState } = this.props;
    const { hasChanged } = appState;

    if (hasChanged) {
      const isGoBack = window.confirm('Do you want to leave this tab? Changes you made may not be saved');

      if (isGoBack) {
        this.props.setPostUpload(false);
        this.props.setAppState({ hasChanged: false });
      }

    } else {
      this.props.setPostUpload(false);
    }

    if (options.closeOnEdit)
      this.props.closeModal({ hasChanged });
  };

  handleCustomFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, errorMessage: '' });
    this.props.setAppState({ hasChanged: true });
  };

  updateProductProps = () => {
    const { productRef, productPosition } = this.state;
    const { appState, files } = this.props;
    const firstFile = files[0];

    this.props.setAppState({ hasChanged: true });
    this.setState({ isUpdatingProduct: true });

    updateProduct(firstFile.uuid, { ref: productRef, position: productPosition }, appState.config)
      .then(() => {
        this.setState({
            oldProductPosition: productPosition || '',
            oldProductRef: productRef || '',
            isUpdatingProduct: false
          }
        );
      })
      .catch((error) => {
        const { response: { data = {} } = {} } = error;

        this.setState({
          isUpdatingProduct: false,
          errorMessage: data.msg || error.message || error.msg || I18n.t('tagging.something_went_wrong_try_again')
        });
      });
  };

  /**
   * @param {String} imageUrl
   * @param {Object} queryOptions
   * @param {Number} queryOptions.w
   */
  transformImage = (imageUrl = '', queryOptions = { w: 800 }) => {
    let search = imageUrl.includes('?') ? '&' : '?';
    const keys = Object.keys(queryOptions);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!queryOptions[key]) { continue; }
      search += `${key}=${queryOptions[key]}${i !== keys.length - 1 ? '&' : ''}`;
    }

    return `${imageUrl}${search}`;
  };

  getImageSrc = (files, isImageType) => {
    let sources = [];
    const isOneFile = files.length === 1;
    const cdnLinks = files.map(file => getCDNlink(file));
    const publicLinks = files.map(file => getPubliclink(file));

    if (isImageType && isOneFile) {
      sources = !!cdnLinks.length ? this.transformImage(cdnLinks[0]) : encodePermalink(publicLinks);
    } else if (isImageType) {
      sources = !!cdnLinks.length ? cdnLinks.map(file => this.transformImage(file)) : publicLinks.map(file => encodePermalink(file));
    } else {
      sources = getFileIconSrcByType(files[0].type);
    }

    return sources;
  };

  render() {
    const {
      isLoading, errorMessage, currentTime, firstLoad, lastModified, isGeneratingTags, oldProductRef,
      oldProductPosition, isUpdatingProduct, tags
    } = this.state;
    const { files = [], appState } = this.props;
    const { prevTab, config, productsEnabled } = appState;
    const { tagging } = config;
    const { customFields = [], autoTaggingButton, suggestionList } = tagging;
    const generateTagInfo = I18n.t('tagging.will_automatically_generate_tags');
    const firstFile = files[0];
    const isOneFile = files.length === 1;
    const isImageType = isOneFile ? isImage(firstFile.type) : isAllImages(files);
    const imageSources = this.getImageSrc(files, isImageType);
    const isSomeImageHasNoTags = files.some(file => !file.properties.tags.length);

    return (
      <TaggingTabWrapper>
        <TaggingContent>
          {prevTab &&
          <GoBack type="button" onClick={this.goBack}><BackIcon/>{I18n.t('tagging.go_back')}</GoBack>}

          {isOneFile &&
          <FileWrapper>
            <UploadedImageWrapper>
              <UploadedImage
                isNotImage={!isImageType}
                src={imageSources}
              />
            </UploadedImageWrapper>

            <UploadedImageDesc>
              <ul>
                <li>
                  <PropName>{I18n.t('tagging.file_name')}:</PropName>
                  <PropValue>{firstFile.name}</PropValue>
                </li>
                <li>
                  <PropName>{I18n.t('tagging.size')}:</PropName>
                  <PropValue>{firstFile.size && firstFile.size.pretty ? firstFile.size.pretty : prettyBytes(firstFile.size)}</PropValue>
                </li>
                <li>
                  <PropName>{I18n.t('tagging.first_upload')}:</PropName>
                  <PropValue>{firstLoad || currentTime}</PropValue>
                </li>
                <li>
                  <PropName>{I18n.t('tagging.last_modified')}:</PropName>
                  <PropValue>{lastModified || currentTime}</PropValue>
                </li>
                {productsEnabled &&
                <>
                  <li>
                    <PropName>{I18n.t('tagging.product_ref')}:</PropName>
                    <PropValue>
                      <Input
                        type="text"
                        id={'productRef'}
                        key={'productRef'}
                        name={'productRef'}
                        placeholder={I18n.t('tagging.not_set')}
                        value={this.state.productRef || ''}
                        onChange={this.handleCustomFieldChange}
                      />
                    </PropValue>
                  </li>
                  {oldProductRef !== this.state.productRef && (
                    <li>
                      <PropName/>
                      <PropValue>
                        <Button success onClick={this.updateProductProps}>
                          {isUpdatingProduct ? I18n.t('tagging.updating') : I18n.t('tagging.update_product_ref')}
                        </Button>
                      </PropValue>
                    </li>
                  )}
                  <li>
                    <PropName>{I18n.t('tagging.product_position')}:</PropName>
                    <PropValue>
                      <Input
                        type="text"
                        id={'productPosition'}
                        key={'productPosition'}
                        name={'productPosition'}
                        placeholder={I18n.t('tagging.not_set')}
                        value={this.state.productPosition || ''}
                        onChange={this.handleCustomFieldChange}
                      />
                    </PropValue>
                  </li>
                  {oldProductPosition !== this.state.productPosition && (
                    <li>
                      <PropName/>
                      <PropValue>
                        <Button success onClick={this.updateProductProps}>
                          {isUpdatingProduct ? I18n.t('tagging.updating') : I18n.t('tagging.update_product_position')}
                        </Button>
                      </PropValue>
                    </li>
                  )}
                </>}
              </ul>
            </UploadedImageDesc>
          </FileWrapper>}

          <ContentWrapper>
            {!isOneFile &&
            <ImagesWrapper>
              {imageSources.map(source => (
                <MultiplyImageWrapper key={source}>
                  <UploadedImageWrapper w={20}>
                    <UploadedImage
                      isNotImage={!isImageType}
                      src={source}
                    />
                  </UploadedImageWrapper>
                </MultiplyImageWrapper>
              ))}
            </ImagesWrapper>}

            <InputsBlock isOneFile={isOneFile}>
              {isOneFile &&
              <>
                {customFields.map(field => renderField(field, this.state[field.metaKey], this.handleCustomFieldChange))}

                <Textarea
                  value={this.state.description || ''}
                  placeholder={I18n.t('tagging.add_description')}
                  onChange={this.handleDescriptionChange}
                />
              </>}

              {isImageType &&
              <>
                {!isOneFile &&
                <PropName>{I18n.t('tagging.common_tags')}</PropName>}

                <TagsInputWrapper>
                  <TagsInput
                    value={tags}
                    renderInput={props => <AutosuggestionInput {...{ ...props, suggestionList }}/>}
                    onChange={this.handleTagsChange}
                    inputProps={{
                      placeholder: I18n.t('tagging.add_a_tag_separate_by_pressing_enter')
                    }}
                  />
                </TagsInputWrapper>
              </>}

            </InputsBlock>
          </ContentWrapper>

          {errorMessage &&
          <ErrorWrapper>
            <ErrorParagraph>
              {errorMessage}
            </ErrorParagraph>
          </ErrorWrapper>}
        </TaggingContent>

        <TaggingFooter>
          {autoTaggingButton && isImageType && isSomeImageHasNoTags &&
          <Button disabled={this.state.tagsGenerated} onClick={() => this.generateTags(isOneFile)}>
            {I18n.t('tagging.generate_tags')}
            <InfoIcon data-tip={generateTagInfo}/>
          </Button>}

          <Button
            ref={node => this._saveMetadataBtn = node}
            success
            onClick={this.saveMetadata.bind(this, false)}
          >{I18n.t('tagging.save')}</Button>

          <Button
            success
            style={{ marginLeft: 10 }}
            onClick={this.saveMetadataAndModify}
          >{I18n.t('tagging.save_and_modify')}</Button>
        </TaggingFooter>

        <Spinner show={isLoading} overlay/>

        {isGeneratingTags &&
        <AutoTaggingProcessLabel>{I18n.t('tagging.auto_tagging_processing')}</AutoTaggingProcessLabel>}

        <ReactTooltip offset={{ top: 0, right: 2 }} effect="solid"/>
      </TaggingTabWrapper>
    );
  }
}

const renderField = ({ type = 'text', name = '', metaKey }, value = '', handler) => {
  switch (type) {
    case 'textarea':
      return (
        <Textarea
          id={metaKey}
          key={metaKey}
          name={metaKey}
          placeholder={name}
          value={value}
          onChange={handler}
        />
      );
    case 'text':
      return (
        <Input
          type="text"
          id={metaKey}
          key={metaKey}
          name={metaKey}
          placeholder={name}
          value={value}
          onChange={handler}
        />
      );
  }
};

export default TaggingTab;