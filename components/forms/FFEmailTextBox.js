import React from 'react';
import FFTextBox from './FFTextBox';
import propTypes from 'prop-types';

class FFEmailTextBox extends React.Component {
  static propTypes = {
    onChangeText: propTypes.func.isRequired,
  };
  render() {
    return (
      <>
        <FFTextBox
          onChangeText={this.props.onChangeText}
          placeholder="Email"
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
