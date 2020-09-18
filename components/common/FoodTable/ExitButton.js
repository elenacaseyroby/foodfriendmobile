import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import exitIcon from '../../../assets/images/close-icon.png';
import propTypes from 'prop-types';

class ExitButton extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
  };
  render() {
    return (
      <TouchableOpacity
        style={(styles.container, this.props.style)}
        onPress={this.props.onPress}>
        <View style={[styles.circle]}>
          <Image source={exitIcon} style={styles.exitIcon} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  exitIcon: {
    width: normalize(15),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  circle: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // Button effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
  container: {
    // Button Hovers over other components:
    // marginLeft: 33,
    // marginTop: '10.5%',
    // position: 'absolute',
    flex: 1,
  },
});

export default ExitButton;
