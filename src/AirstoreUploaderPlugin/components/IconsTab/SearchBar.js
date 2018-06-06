import React, { Component } from 'react';
import { isEnterClick } from '../../utils'
import {
  SearchGroup, InputSearch, ButtonSearch, SearchWrapper, SearchTitle, AmountIcons
} from '../../styledComponents';
import { connect } from 'react-redux'


class SearchBar extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.searchField) this.searchField.focus();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && (nextProps.isLoading !== this.props.isLoading) && this.searchField)
      this.searchField.focus();
  }

  render() {
    const { items, isSearching, searchPhrase, onSearch, onChangeSearchPhrase, title, count = 0 } = this.props;
    const isEmptyIcons = (!items || !items.length);

    return (
      <SearchWrapper empty={isEmptyIcons && !isSearching}>
        <SearchTitle show={isEmptyIcons && !isSearching}>{title}</SearchTitle>
        <SearchGroup>
          <InputSearch
            type="search"
            innerRef={node => this.searchField = node}
            autoFocus={true}
            value={searchPhrase}
            onChange={onChangeSearchPhrase}
            onKeyDown={ev => { isEnterClick(ev) && onSearch() }}
          />
          <ButtonSearch onClick={onSearch}>Search</ButtonSearch>
        </SearchGroup>

        <AmountIcons empty={isEmptyIcons}>Found: {count}</AmountIcons>
      </SearchWrapper>
    );
  }
}

export default connect(null, null)(SearchBar);