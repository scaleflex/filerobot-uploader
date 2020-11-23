# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

> Date format: YYYY-MM-DD

> If we have some "Breaking changes" we can mark it in message by `**BREAKING**` preffix, like:  
> `- **BREAKING**: Some message`

-------------

## TODOs
> Todo list for future

- ...

-------------
# 2.15.13 - 2020-11-23
### Changed
- chore: update dependencies

# 2.15.12 - 2020-11-23
### Fixed
- fix: show confirm modal on click 'back' btn only in case of changes

# 2.15.11 - 2020-11-20
### Changed
- Clean imageSealing extra configs (everything must be configurated in user configs).

# 2.15.10 - 2020-11-19
### Changed
- Sealing container.

# 2.15.9 - 2020-11-19
### Fixed
- ImageEditor config filerobot.imageSealing issue.

# 2.15.8 - 2020-11-19
### Changed
- Updating filerobot-image-editor package for having latest version of image editor.

# 2.15.7 - 2020-11-19
### Added
- feat: Modify URL add sealing support

# 2.15.6 - 2020-11-19
### Changed
- refactor: show description field regardless of EDGY version

# 2.15.5 - 2020-11-19
### Fixed
- fix: searching bug

# 2.15.4 - 2020-11-15
### Changed
- Updating filerobot-image-editor package for having latest version of image editor.

# 2.15.3 - 2020-11-10
### Fixed
- fix: empty field with tags

# 2.15.2 - 2020-11-03
### Fixed
- fix: bug with visibility 'generate tags' button

# 2.15.0 - 2020-11-03
### Added
- feat: process tagging according token metadata version
- feat: add 'closeOnSave' property

# 2.14.11 - 2020-10-30
### Fixed
- fix: tags input disabling

# 2.14.10 - 2020-10-27
### Fixed
- fix: fix field styles

# 2.14.9 - 2020-10-27
### Fixed
- fix: fix tags updating logic

# 2.14.8 - 2020-10-27
### Changed
- feat: add "description" property in config. Allows hide/show description field

# 2.14.7 - 2020-10-27
### Fixed
- Fix config preparing

# 2.14.6 - 2020-10-27
### Changed
- change updating logic for description and tags fields. Process them depends on filerobot metadata version (M1_EDGY)

# 2.14.5 - 2020-10-22
### Changed
- update dependencies

# 2.14.4 - 2020-10-02
### Changed
- add classes for wrappers

# 2.14.3 - 2020-09-24
### Changed
- update dependencies

# 2.14.2 - 2020-09-24
### Changed
- add confirm popup on click "Go back" and "Delete" buttons

# 2.14.1 - 2020-09-23
### Changed
- add possibility to hide 'Modify URL' button
- add confirm modal on click delete image

# 2.14.0 - 2020-08-17
### Changed
- update dependencies

# 2.13.6 - 2020-07-28
### Changed
- update dependencies

# 2.13.5 - 2020-07-27
### Changed
- update dependencies

# 2.13.4 - 2020-07-21

### Fixed
- show alert modal on click 'go back' button after generating tags
- bug if customFiled is undefined
- delete warning in console

# 2.13.3 - 2020-07-17

### Fixed
- save data of uploaded image on switch tabs

# 2.13.2 - 2020-07-17

### Fixed
- remove warning about invalid upload key

# 2.13.1 - 2020-06-14

### Fixed
- sorting

### Changed
- version of filerobot-image-editor

# 2.13.0 - 2020-06-12

### Fixed
- problem with conflicting two versions for camanjs

### Added
- implement modify URL option

# 2.12.3 - 2020-06-10

### Fixed
- reset selected items on outside click in my gallery
- add preprocess logic to my gallery tab

# 2.12.2 - 2020-06-02

### Fixed
- tip position for multi select checkbox;
- bug with scroll to top on click checkbox

### Changed
- delay for the controls tips

# 2.12.1 - 2020-06-01

### Fixed
- modal on go back


## 2.12.0 - 2020-06-01

### Added
- add tag autocomplete/suggestions
- possibility to auto tag multiply images
- possibility to select/delete/tag multiply images
- 'deselect all' button
- tips on hover for image controls
- alert if changes not saved

### Fixed
- problems with cdn links
- do not run auto tagging if file type is not image
- problem with icons in My icons tab

### Changed
- design: update item controls structure
- config: rename predefinedTags to suggestionList
- config: move suggestionList into tagging


## 2.11.0 - 2020-05-22

### Added
- add possibility to delete image
- add possibility to limit files according to the extension on upload

## 2.10.0 - 2020-04-05

### Added
- bread crumbs in my gallery tab
- configurable default sort params [check the doc](https://github.com/scaleflex/filerobot-uploader#sortparams-object)
- limit root folder on server [check the doc](https://github.com/scaleflex/filerobot-uploader#folderbrowser-object)

### Changed
- folderBrowser *bool* to *object* [check the doc](https://github.com/scaleflex/filerobot-uploader#folderbrowser-object). Now we can set two params:
**show** bool (as previously folderBrowser param was used) - show folder manager,
**rootFolder** string - limit access to some root folder on server

## Fixed
- after upload stay in the same directory
- on cancel search stay in the same directory


## 2.9.0 - 2020-04-03

### Added
- sort by name, type, modified date, uploaded date in gallery tab

### Fixed
- show more images on scroll
