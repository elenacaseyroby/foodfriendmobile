import React from 'react';
import FFTextBox from './FFTextBox';
import propTypes from 'prop-types';

class FFPasswordBox extends React.Component {
  static propTypes = {
    handleChange: propTypes.func.isRequired,
  };
  render() {
    return (
      <>
        <FFTextBox
          handleChange={this.props.handleChange}
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
