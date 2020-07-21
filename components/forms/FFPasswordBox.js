import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/sizeScaling';
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
    marginTop: '5%',
    marginBottom: '3%',
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#555555',
    width: normalize(305),
  },
  formBox: {
    marginBottom: '5%',
    borderBottomWidth: normalize(0.5),
    color: '#555555',
    width: normalize(305),
  },
});

export default FFPasswordBox;
