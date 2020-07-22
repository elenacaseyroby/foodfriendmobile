import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/sizeScaling';
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
    marginTop: normalize(15),
    marginBottom: normalize(8),
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#555555',
    width: normalize(305),
  },
  formBox: {
    marginBottom: normalize(15),
    borderBottomWidth: normalize(0.5),
    color: '#555555',
    width: normalize(305),
  },
});

export default FFDateBox;
