import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Autosuggestion } from './TaggingTab.styled';


class AutosuggestionInput extends Component {
  state = {
    cursor: 0,
    result: []
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
    const { value, preDefinedTags = [], addTag } = this.props;
    const inputValue = (value && value.trim().toLowerCase()) || '';
    const inputLength = inputValue.length;
    let suggestions = preDefinedTags.filter((tag) => tag.name.toLowerCase().slice(0, inputLength) === inputValue);

    return (
      <Autosuggestion>
        <Autosuggest
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
          inputProps={{ ...this.props, onChange: this.handleOnChange }}
          onSuggestionSelected={(e, { suggestion }) => { addTag(suggestion.name); }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      </Autosuggestion>
    );
  }
};

export default AutosuggestionInput;