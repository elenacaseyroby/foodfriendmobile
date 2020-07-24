import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class FFSubmitButton extends React.Component {
  static propTypes = {
    onSubmit: propTypes.func.isRequired,
  };
  render() {
    return (
      <TouchableOpacity onPress={this.props.onSubmit} style={styles.button}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(17),
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    width: normalize(120),
    height: normalize(57),
    justifyContent: 'center',
    borderRadius: normalize(28.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#719e3d',
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default FFSubmitButton;
