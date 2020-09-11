import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import whiteExitIcon from '../../assets/images/white-exit-icon.png';
import propTypes from 'prop-types';

class ExitButton extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
  };
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <Image source={whiteExitIcon} style={styles.exitIcon} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  exitIcon: {
    width: normalize(15),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 32 / 31,
  },
});

export default ExitButton;
