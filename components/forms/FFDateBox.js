import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class FFDateBox extends React.Component {
  static propTypes = {
    onChange: propTypes.func.isRequired,
    label: propTypes.string.isRequired,
  };
  render() {
    return (
      <>
        <TextInput
          style={styles.formText}
          placeholder={'MM/DD/YY'}
          onChangeText={this.props.onChange}
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
    width: 305,
  },
  formBox: {
    marginBottom: 15,
    borderBottomWidth: 0.5,
    // width: 310,
    color: '#555555',
    width: 305,
  },
});

export default FFDateBox;
