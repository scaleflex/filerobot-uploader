import React from 'react';
import Loadable from 'react-loadable';
import { Spinner } from '../components/Spinner';


export const UploadedImagesTab = Loadable({
  loader: () => import(/* webpackChunkName: "gallery" */ './UploadedImagesTab/UploadedImagesTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const IconTab = Loadable({
  loader: () => import(/* webpackChunkName: "icons" */ './IconsTab/IconTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const BackgroundTab = Loadable({
  loader: () => import(/* webpackChunkName: "images" */ './ImagesTab/ImagesTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const TaggingTab = Loadable({
  loader: () => import(/* webpackChunkName: "tagging" */ './TaggingTab/TaggingTab'),
  loading: () => <Spinner overlay show={true}/>,
});
export const ImageEditor = Loadable({
  loader: () => import(/* webpackChunkName: "image-editor" */ './imageEditor/ImageEditorWrapper'),
  loading: () => <Spinner overlay show={true}/>
});