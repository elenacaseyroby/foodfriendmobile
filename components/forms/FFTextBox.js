import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class FFTextBox extends React.Component {
  static propTypes = {
    handleChange: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
    isLowercase: propTypes.bool.isRequired,
  };
  render() {
    return (
      <>
        <TextInput
          style={styles.formText}
          placeholder={this.props.placeholder}
          autoCapitalize={this.props.isLowercase ? 'none' : 'words'}
          onChangeText={this.props.handleChange}
        />
        <View style={styles.formBox} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  formText: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    color: '#555555',
    width: 310,
    alignSelf: 'center',
  },
  formBox: {
    marginBottom: 15,
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
    color: '#555555',
  },
});

export default FFTextBox;
