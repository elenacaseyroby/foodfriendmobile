import React from 'react';
import FFTextBox from './FFTextBox';
import propTypes from 'prop-types';

class FFPasswordBox extends React.Component {
  static propTypes = {
    onChangeText: propTypes.func.isRequired,
  };
  render() {
    return (
      <>
        <FFTextBox
          onChangeText={this.props.onChangeText}
          placeholder="Password (8+ characters)"
          maxLength={40}
          autoCapitalize="none"
          secureTextEntry={true}
          autoCompleteType="password"
          textContentType="password"
        />
      </>
    );
  }
}

export default FFPasswordBox;
