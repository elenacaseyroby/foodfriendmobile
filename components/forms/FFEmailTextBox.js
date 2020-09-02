import React from 'react';
import FFTextBox from './FFTextBox';
import propTypes from 'prop-types';

class FFEmailTextBox extends React.Component {
  static propTypes = {
    onChangeText: propTypes.func.isRequired,
    placeholder: propTypes.string,
  };
  render() {
    return (
      <>
        <FFTextBox
          onChangeText={this.props.onChangeText}
          placeholder={this.props.placeholder || 'Email'}
          maxLength={50}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="username"
        />
      </>
    );
  }
}

export default FFEmailTextBox;
