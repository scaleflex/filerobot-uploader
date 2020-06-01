import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Autosuggestion } from './TaggingTab.styled';


class AutosuggestionInput extends Component {
  state = {
    cursor: 0,
    result: []
  };

  componentDidMount() {
    this.input.click();
  }

  storeInputReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input
    }
  };

  handleOnChange = (e, { newValue, method }) => {
    if (method === 'enter') e.preventDefault();
    if (method === 'up' || method === 'down') this.handleKeyDown(e);
    else this.props.onChange(e);
  };

  handleKeyDown = (e) => {
    const { cursor, result } = this.state;
    if (e.keyCode === 38 && cursor > 0) {
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  };

  render() {
    const { value, suggestionList = [], addTag } = this.props;
    const inputValue = (value && value.trim().toLowerCase()) || '';
    const inputLength = inputValue.length;
    let suggestions = suggestionList.filter((tag) => tag.name.toLowerCase().slice(0, inputLength) === inputValue);

    return (
      <Autosuggestion>
        <Autosuggest
          ref={this.storeInputReference}
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
          inputProps={{ ...this.props, onChange: this.handleOnChange, autoFocus: true }}
          onSuggestionSelected={(e, { suggestion }) => { addTag(suggestion.name); }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      </Autosuggestion>
    );
  }
};

export default AutosuggestionInput;