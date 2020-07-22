import React from 'react';
import FFTextBox from './FFTextBox';
import propTypes from 'prop-types';

class FFEmailTextBox extends React.Component {
  static propTypes = {
    handleChange: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
  };
  render() {
    return (
      <>
        <FFTextBox
          handleChange={this.props.handleChange}
          placeholder={this.props.placeholder}
          maxLength={30}
          autoCapitalize="words"
          autoCompleteType="name"
          textContentType="name"
        />
      </>
    );
  }
}

export default FFEmailTextBox;
