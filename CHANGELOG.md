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
