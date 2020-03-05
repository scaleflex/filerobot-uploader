> Repository includes React version and JS wrapper for standalone usage

[![Release](https://img.shields.io/badge/release-v2.8.7-blue.svg)](https://github.com/scaleflex/filerobot-uploader/releases)
[![Free plan](https://img.shields.io/badge/price-includes%20free%20plan-green.svg)](https://www.filerobot.com/en/home#2de3fb9f-dd4a-457a-999a-025ad9bd5f3b)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#contributing)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Scaleflex team](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-the%20Scaleflex%20team-6986fa.svg)](https://www.scaleflex.it/en/home)

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Manage%20and%20Accelerate%20your%20images%20and%20Digital%20Assets&url=https://scaleflex.github.io/filerobot-uploader/&via=filerobot&hashtags=uploader,reverse_CDN,image_resizing,image_editor,image_tagging,image_acceleration,image_compression,file_manager,asset_management)

<p align="center">
	<img
		height="175"
		alt="The Lounge"
		src="https://scaleflex.airstore.io/filerobot/robot-filerobot.png?sanitize=true">
</p>

<h1 align="center">
   Filerobot Uploader
</h1>

<p align="center">
	<strong>
		<a href="#table_of_contents">Docs</a>
		•
		<a href="https://scaleflex.github.io/filerobot-uploader/" target="_blank">Demo</a>
		•
		<a href="https://codesandbox.io/s/k29w0m48r" target="_blank">CodeSandbox</a>
	</strong>
</p>

The Filerobot Uploader is a multi-function Uploader that will make uploads super easy on your web and mobile applications. With few lines of code, you will get a state of the art Uploader and enable your users to upload media, files and any assets via Filerobot's reverse CDN. Files are stored into scalable and flexible Cloud storage, optimized and delivered over CDN to your end users rocket fast. Features include inline image editing, auto-tagging, auto-cropping and many more.

<p align="center">
	<a href="https://scaleflex.github.io/filerobot-uploader/" target="_blank">
		<img
			width="800"
			alt="The Lounge"
			src="https://scaleflex.airstore.io/filerobot/assets/filerobot-uploader.png?sanitize=true">
	</a>
</p>

<p align="center"><a href="https://scaleflex.github.io/filerobot-uploader/" target="_blank">Demo</a></p>

## <a name="table_of_contents"></a>Table of contents

* [Standalone usage](#standalone_usage)
    * [Installation](#installation)
    * [Quick start](#quick_start)
    * [Methods](#methods)
* [React component usage](#react_component)
    * [Installation](#installation_react)
    * [Quick start](#quick_start_react)
    * [Methods/Properties](#methods_react)
* [Configuration](#configuration)
* [Full features config example](#full_example)
* [Filerobot UI Family](#ui_family)
* [Contributing](#contributing)
* [License](#license)

## <a name="standalone_usage"></a>Standalone usage

### <a name="installation"></a>Installation

Use latest CDNized plugin version

```html
<script src="https://cdn.scaleflex.it/plugins/filerobot-uploader/2.8.7/filerobot-uploader.min.js"></script>
```

You may also use major version number instead of fixed version to have the latest version available.

```html
<script src="https://cdn.scaleflex.it/plugins/filerobot-uploader/2/filerobot-uploader.min.js"></script>
```

### <a name="quick_start"></a>Quick start

To use the Filerobot Uploader in your application, you need to first create a free Filerobot account <a href="https://www.filerobot.com/en/register_page">here</a>. Once registered, you will obtain your **container** name and **filerobotUploadKey** to configure the Uploader in your application:

```html
<script>
  let config = {
    container: 'example',
    filerobotUploadKey: '0cbe9ccc4f164bf8be26bd801d53b132'
  };
  let onUpload = (files) => {
     console.log('files: ', files);
     alert('Files uploaded successfully! check the console to see the uploaded files');
  };
  let uploader = FilerobotUploader.init(config, onUpload);

  uploader.open();
</script>
```
<a href="https://codesandbox.io/s/k29w0m48r"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edeit on codesandbox"/></a>

### <a name="methods"></a>Methods

#### `window.FilerobotUploader.init(config: {}, uploadHandler: callback)`: function

Initialization of Filerobot Uploader plugin.

#### `uploadHandler(files: file[], info: {})`: function

Function to handle uploaded files.

* **files**: file[] - array of uploaded files

example response:

```json
[{
  "uuid": "a955877f-c79d-5b7c-8f70-18e7a2950000",
  "name": "Screen Shot 2019-02-28 at 10.03.43 PM.png",
  "type": "image/png",
  "size": 102069,
  "sha1": "a91c1e7aea6aed05a22b42bc3f46326820e4275e",
  "meta": { "img_type": "PNG", "img_h": 320, "img_w": 816 },
  "url_permalink": "https://scaleflex-tests-v5a.api.airstore.io/v1/get/_/a955877f-c79d-5b7c-8f70-18e7a2950000/Screen Shot 2019-02-28 at 10.03.43 PM.png",
  "url_public": "https://scaleflex-tests-v5a.airstore.io/demo_filerobot_en/Screen Shot 2019-02-28 at 10.03.43 PM.png",
  "properties": {
    "description": "",
    "tags": ["Text", "Blue", "Font", "White", "Logo", "Azure", "Line", "Product", "Aqua", "Brand"],
    "lang": "en",
    "search": " Text Blue Font White Logo Azure Line Product Aqua Brand"
  },
  "overwrite": false
}]
```
* **info**: {} - additional information on upload

* **info.stage**: string (upload|edit|select) - stage on which uploadHandler was triggered

#### `window.FilerobotUploader.open(tab : string, options: {})`: function

Open uploader modal.

* **tab**: string (optional, default: 'UPLOAD') - allow to choose the initial tab (should be one of enabled modules)

* **options**: {} (optional) - options for tabs

* **options.file**: {} (optional) - open Uploader to Tag or Edit specified file

* **options.closeOnEdit**: bool (optional) - close Uploader on complete Tagging or Editing

#### `window.FilerobotUploader.close()`: function

Close uploader modal.

#### `window.FilerobotUploader.unmount()`: function

Destroy uploader

## <a name="react_component"></a>React component usage

### <a name="installation_react"></a>Installation

```
$ npm install --save filerobot-uploader
```

### <a name="quick_start_react"></a>Quick start

We provide easy way to integrate image uploader in your applications

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import FilerobotUploader from 'filerobot-uploader';


const config = {
  modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY', 'TAGGING', 'IMAGE_EDITOR'],
  uploadParams: { dir:"/demo_filerobot_en" },
  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
  container: 'scaleflex-tests-v5a'
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false
    }
  }

  render() {
    return (
      <div>
        <h1>React Example</h1>
        <button onClick={() => { this.setState({ isShow: true }); }}>Click</button>
        <FilerobotUploader
          opened={this.state.isShow}
          config={config}
          onClose={() => { this.setState({ isShow: false }); }}
          onUpload={(img) => { console.log(img); }}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
```

<a href="https://codesandbox.io/s/x9x94lyr54"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edeit on codesandbox"/></a>

### <a name="methods_react"></a>Methods/Properties

#### `opened`: bool (required)

**default**: false

Trigger to display the uploader widget.

#### `initialTab`: string (optional)

**default**: 'UPLOAD'

Allow to choose the initial tab. Should be one of enabled modules.

#### `config`: object (required)

Uploader config.

#### `options`: object (optional)

* **options.closeOnEdit**: bool (optional) - close Uploader on complete Tagging or Editing

#### `onClose()`: function (required)

Close uploader widget.

#### `onUpload(files: file[], info: {})`: function (required)

Function to handle uploaded files.

* **files**: file[] - array of uploaded files

example response:

```json
[{
  "uuid": "a955877f-c79d-5b7c-8f70-18e7a2950000",
  "name": "Screen Shot 2019-02-28 at 10.03.43 PM.png",
  "type": "image/png",
  "size": 102069,
  "sha1": "a91c1e7aea6aed05a22b42bc3f46326820e4275e",
  "meta": { "img_type": "PNG", "img_h": 320, "img_w": 816 },
  "url_permalink": "https://scaleflex-tests-v5a.api.airstore.io/v1/get/_/a955877f-c79d-5b7c-8f70-18e7a2950000/Screen Shot 2019-02-28 at 10.03.43 PM.png",
  "url_public": "https://scaleflex-tests-v5a.airstore.io/demo_filerobot_en/Screen Shot 2019-02-28 at 10.03.43 PM.png",
  "properties": {
    "description": "",
    "tags": ["Text", "Blue", "Font", "White", "Logo", "Azure", "Line", "Product", "Aqua", "Brand"],
    "lang": "en",
    "search": " Text Blue Font White Logo Azure Line Product Aqua Brand"
  },
  "overwrite": false
}]
```

* **info**: {} - additional information on upload

* **info.stage**: string (upload|edit|select) - stage on which uploadHandler was triggered

## <a name="configuration"></a>Configuration

#### `container`: string (required)

Filerobot Container name.

```
config.container = 'example';
```

#### `filerobotUploadKey`: string (required)

Unique upload key for Filerobot.

```
config.filerobotUploadKey = 'xxxxxxxxxxxx';
```

#### `openpixKey`: string (required)

Key for Openpix. Required if you are using "ICONS_GALLERY", "IMAGES_GALLERY"

```
config.openpixKey = 'xxxxxxxxxxxx';
```

#### `language`: string

**default**: 'en'

Language of uploader

available languages: en, fr, de, ru

```
config.language = 'en';
```

#### `modules`: string[]

**default**: ["UPLOAD", "MY_GALLERY", "ICONS_GALLERY", "IMAGES_GALLERY"]

Modules (tabs) in file uploader modal.

**Available modules**: **UPLOAD**, **MY_GALLERY**, **ICONS_GALLERY**, **IMAGES_GALLERY**, **TAGGING**, **IMAGE_EDITOR**

```
config.modules = ['UPLOAD', 'ICONS_GALLERY', 'TAGGING'];
```

#### `uploadParams`: object

[see documentation](https://docs.airstore.io/go/airstore-public-documentation/en/airstore-api-reference/upload-files/#od_9911d3cb)

* **dir**: string (default: '/') - specify the folder where you want to upload the file. If the folder doesn't exist, it will be created.

```
config.uploadParams = {
    dir: '/folder_name',
    ...
};
```

#### `initialTab`: string

**default**: 'UPLOAD'

Allow to choose the initial tab. Should be one of enabled modules.

```
config.initialTab = 'UPLOAD';
```

#### `preUploadImageProcess`: bool

**default**: false

Activates Pre-upload process module which allows to transform images before uploading them to a server.
Available operations: "smart crop", "face detection", "resize"

```
config.preUploadImageProcess = true;
```

#### `processBeforeUpload`: object

**default**: null

Auto pre-upload process which allows to transform images before uploading them to a server.
Available operations: "resize"

```
config.processBeforeUpload = {
    operation: 'resize',
    widthLimit: 2000,
    heightLimit: 2000
};
```

#### `folderBrowser`: bool

**default**: true

Aside menu to browse folders in your container.

```
config.folderBrowser = true;
```

#### `myGallery`: object

* `upload`: bool | default: true - possibility to upload in my gallery tab

```
config.myGallery = {
    upload: true
};
```

#### `tagging`: object

* `key`: string (require) - key to use image recognition technology

* `autoTaggingButton`: bool - adds button which will automatically generate tags based on image recognition technology

* `provider`: string [google|imagga] - recognition provider

* `confidence`: number [0..100] - confidence of recognition

* `limit`: number - limit of tags generated by image recognition technology

* `customFields`: array [{ name, metaKey, type }] - custom properties for an image. Where **name** - name of the field,
**metaKey** - key/id of the field, **type** - type of the field: 'text', 'textarea'

```javascript
config.tagging = {
    autoTaggingButton: true,
    provider: 'google',
    confidence: 60,
    limit: 10,
    key: 'xxxxx',
    customFields: [
      {
        name: 'Test name 1',
        metaKey: 'test_key',
        type: 'text'
      },
      {
        name: 'Test name 2',
        metaKey: 'test_key_2',
        type: 'textarea'
      }
    ]
};
```

#### `colorScheme`: object

* `active` string (default: 'default')- active theme scheme

* `custom`: object - custom color scheme

* `custom.mainBackground`: color - main background

* `custom.navBackground`: color - nav background

* `custom.buttonBackground`: color - button background

* `custom.hoverButtonBackground`: color - button background on hover

* `custom.inputBackground`: color - search field background

* `custom.inputOutlineColor`: color - search field outline

* `custom.activeTabBackground`: color - current nav tab background

* `custom.text`: color - text

* `custom.title`: color - title

* `custom.inputTextColor`: color - search field text

* `custom.tabTextColor`: color - nav tab text

* `custom.activeTabTextColor`: color - current nav tab text

* `custom.buttonTextColor`: color - button text

* `custom.border`: color - draggable boundaries border


```
let config = {
    ...,

    colorScheme: {
       active: 'custom',

       custom: {
         mainBackground: '#f5f5f5',
         navBackground: '#181830',
         buttonBackground: '#00707C',
         hoverButtonBackground: '#096868',
         inputBackground: '#fff',
         inputOutlineColor: '#4d90fe',
         activeTabBackground: '#40545b',
         text: '#5d636b',
         title: '#1e262c',
         inputTextColor: '#555555',
         tabTextColor: '#c0c1c1',
         activeTabTextColor: '#fff',
         buttonTextColor: '#fff',
         border: '#d8d8d8'
       }
    }
};
```

## <a name="full_example"></a>Full features config example

```html
<script>
  let config = {
    modules: ['UPLOAD', 'MY_GALLERY', 'ICONS_GALLERY', 'IMAGES_GALLERY', 'TAGGING', 'IMAGE_EDITOR'],
    uploadParams: {
      dir: '/your_root_folder'
    },
    filerobotUploadKey: '0cbe9ccc4f164bf8be26bd801d53b132',
    container: 'example',
    openpixKey: 'xxxxxxxxxxxxxxx',
    initialTab: 'UPLOAD',
    folderBrowser: true,
    tagging: {
      executeAfterUpload: true,
      autoTaggingButton: true,
      provider: 'google',
      confidence: 60,
      limit: 10,
      key: 'aaaa'
    },
    language: 'en',

    colorScheme: {
      active: 'custom',
      custom: {
        mainBackground: '#f5f5f5',
        navBackground: '#181830',
        buttonBackground: '#00707C',
        hoverButtonBackground: '#096868',
        inputBackground: '#fff',
        inputOutlineColor: '#4d90fe',
        activeTabBackground: '#40545b',
        text: '#5d636b',
        title: '#1e262c',
        inputTextColor: '#555555',
        tabTextColor: '#c0c1c1',
        activeTabTextColor: '#fff',
        buttonTextColor: '#fff',
        border: '#d8d8d8'
      }
    }
  };
  let onUpload = (files) => {
    console.log('files: ', files);
    alert('Files uploaded successfully! check the console to see the uploaded files');
  };
  let uploader = FilerobotUploader.init(config, onUpload);
  let button = document.createElement('button');

  button.onclick = () => { uploader.open(); }
  button.innerText = 'Open Uploader';
  document.body.appendChild(button);
</script>
```

## <a name="ui_family"></a>Filerobot UI Familiy

* [Image Editor](https://github.com/scaleflex/filerobot-image-editor)
* [JS Cloudimage Responsive](https://github.com/scaleflex/js-cloudimage-responsive)
* [JS Cloudimage 360 view](https://github.com/scaleflex/js-cloudimage-360-view)
* [React Cloudimage Responsive](https://github.com/scaleflex/react-cloudimage-responsive)
* [Angular Cloudimage Responsive](https://github.com/scaleflex/ng-cloudimage-responsive)

## <a name="contributing"></a>Contributing!

All contributions are super welcome!


## <a name="license"></a>License
Filerobot Uploader is provided under the [MIT License](https://opensource.org/licenses/MIT)
