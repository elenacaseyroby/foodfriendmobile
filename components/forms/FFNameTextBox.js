import React from 'react';
import FFTextBox from './FFTextBox';
import propTypes from 'prop-types';

class FFEmailTextBox extends React.Component {
  static propTypes = {
    onChangeText: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
  };
  render() {
    return (
      <>
        <FFTextBox
          onChangeText={this.props.onChangeText}
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
