import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import arrow from '../../../assets/images/black-forward-arrow.png';
import whiteArrow from '../../../assets/images/white-forward-arrow.png';
import propTypes from 'prop-types';

class ArrowButton extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
    selected: propTypes.bool,
  };
  render() {
    return (
      <TouchableOpacity
        style={(styles.container, this.props.style)}
        onPress={this.props.onPress}>
        <View
          style={[
            styles.circle,
            this.props.selected ? styles.selected : styles.unselected,
          ]}>
          <Image
            source={this.props.selected ? whiteArrow : arrow}
            style={styles.arrow}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: normalize(4),
    width: normalize(10),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 8 / 13,
  },
  circle: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  selected: {
    backgroundColor: '#36549a',
    borderColor: '#ffffff',
    borderWidth: normalize(1),
  },
  unselected: {
    backgroundColor: '#ffffff',
  },
  container: {
    // Button Hovers over other components:
    // marginLeft: 33,
    // marginTop: '10.5%',
    // position: 'absolute',
  },
});

export default ArrowButton;
