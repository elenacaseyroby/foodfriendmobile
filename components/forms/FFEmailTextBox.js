import React from 'react';
import FFTextBox from './FFTextBox';
import propTypes from 'prop-types';

class FFEmailTextBox extends React.Component {
  static propTypes = {
    handleChange: propTypes.func.isRequired,
  };
  render() {
    return (
      <>
        <FFTextBox
          handleChange={this.props.handleChange}
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
