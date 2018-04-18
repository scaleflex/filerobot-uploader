var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { isEnterClick } from '../../utils';
import { SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle, AmountIcons } from '../../styledComponents';
import { connect } from 'react-redux';

var SearchBar = function (_Component) {
  _inherits(SearchBar, _Component);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        if (_this2.searchField) _this2.searchField.focus();
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.isLoading && nextProps.isLoading !== this.props.isLoading && this.searchField) this.searchField.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          items = _props.items,
          isSearching = _props.isSearching,
          searchPhrase = _props.searchPhrase,
          onSearch = _props.onSearch,
          onChangeSearchPhrase = _props.onChangeSearchPhrase,
          title = _props.title,
          _props$count = _props.count,
          count = _props$count === undefined ? 0 : _props$count;

      var isEmptyIcons = !items || !items.length;

      return React.createElement(
        SearchWrapper,
        { empty: isEmptyIcons && !isSearching },
        React.createElement(
          SearchTitle,
          { show: isEmptyIcons && !isSearching },
          title
        ),
        React.createElement(
          SearchGroup,
          null,
          React.createElement(InputSearch, {
            type: 'search',
            innerRef: function innerRef(node) {
              return _this3.searchField = node;
            },
            autoFocus: true,
            value: searchPhrase,
            onChange: onChangeSearchPhrase,
            onKeyDown: function onKeyDown(ev) {
              isEnterClick(ev) && onSearch();
            }
          }),
          React.createElement(
            ButtonSearch,
            { onClick: onSearch },
            'Search'
          )
        ),
        React.createElement(
          AmountIcons,
          { empty: isEmptyIcons },
          'Found: ',
          count
        )
      );
    }
  }]);

  return SearchBar;
}(Component);

export default connect(null, null)(SearchBar);