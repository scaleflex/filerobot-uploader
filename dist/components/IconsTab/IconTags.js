'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('../../styledComponents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconTags = function IconTags(props) {
  var tagsList = props.tagsList,
      searchPhrase = props.searchPhrase,
      activeTags = props.activeTags,
      toggleTag = props.toggleTag;


  if (!(tagsList.length > 0)) return null;

  return _react2.default.createElement(
    _styledComponents.TagsWrapper,
    null,
    tagsList.filter(function (item) {
      return item.tag && !item.tag.includes('sf-');
    }).map(function (item) {
      return _react2.default.createElement(
        _styledComponents.Tag,
        {
          hide: searchPhrase.includes(item.tag),
          key: item.tag,
          active: activeTags[item.tag],
          onClick: function onClick() {
            toggleTag(item.tag);
          }
        },
        item.tag,
        _react2.default.createElement(_styledComponents.CloseIcon, { active: activeTags[item.tag] })
      );
    })
  );
};

exports.default = IconTags;