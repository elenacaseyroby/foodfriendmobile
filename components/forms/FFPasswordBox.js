import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class FFPasswordBox extends React.Component {
  static propTypes = {
    handleChange: propTypes.func.isRequired,
  };
  render() {
    return (
      <>
        <TextInput
          style={styles.formText}
          secureTextEntry={true}
          placeholder="Password (8+ characters)"
          onChangeText={this.props.handleChange}
        />
        <View style={styles.formBox} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  formText: {
    marginTop: 20,
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

export default FFPasswordBox;