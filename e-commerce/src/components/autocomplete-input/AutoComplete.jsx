import React, { Component, Fragment } from "react";


function Autocomplete(props) {
  const {fieldName, activeSuggestions, filteredSuggestions, showSuggestions, userInput} = props 

  //let suggestionsListComponent;

  //assign suggestionsListComponent
  const onChange = (e) => {
    const {suggestions} = this.props;
    const userInput = e.currentTarget.value;
    
    const filteredSuggestions = suggestions.filter(
      suggestions =>
        suggestions.toLowerCase().indexOf(userIput.toLowerCase()) > -1
    );

  
  }

  return (
    <>
      <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={userInput}/>
      {suggestionsListComponent}
    </>
  )
}

export default Autocomplete;

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  
}