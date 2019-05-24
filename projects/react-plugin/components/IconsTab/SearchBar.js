import React, { Component } from 'react';
import { isEnterClick } from '../../utils'
import {
  SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle, AmountIcons
} from '../../styledComponents';
import { I18n } from 'react-i18nify';


class SearchBar extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.searchField && this.searchField.focus) this.searchField.focus();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && (nextProps.isLoading !== this.props.isLoading) &&
      this.searchField && this.searchField.focus)
      this.searchField.focus();
  }

  render() {
    const {
      items, isSearching, searchPhrase, onSearch, onChangeSearchPhrase, title, count = 0, presetImagesCount = 0
    } = this.props;
    const isEmptyIcons = (!items || !items.length);

    return (
      <SearchWrapper empty={isEmptyIcons && !isSearching}>
        <SearchTitle show={isEmptyIcons && !isSearching}>{title}</SearchTitle>
        <SearchGroup>
          <InputSearch
            type="search"
            ref={node => this.searchField = node}
            autoFocus={true}
            value={searchPhrase}
            onChange={onChangeSearchPhrase}
            onKeyDown={ev => { isEnterClick(ev) && onSearch() }}
          />
          <ButtonSearch className="ae-btn" onClick={() => { onSearch(); }}>{I18n.t('upload.search')}</ButtonSearch>
        </SearchGroup>

        <AmountIcons empty={isEmptyIcons}>
          {I18n.t('upload.found')}: {presetImagesCount || count ? presetImagesCount || count : ''}
          </AmountIcons>
      </SearchWrapper>
    );
  }
}

export default SearchBar;