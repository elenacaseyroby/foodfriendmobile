import React from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import addIcon from '../../assets/images/black-add-icon.png';
import propTypes from 'prop-types';

class AddButton extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    style: propTypes.object,
    iconWidth: propTypes.object,
    // diameter height & width
    diameter: propTypes.object,
  };
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <View style={[styles.circle, this.props.diameter || styles.diameter]}>
          <Image
            source={addIcon}
            style={[styles.addIcon, this.props.iconWidth || styles.iconWidth]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  addIcon: {
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  iconWidth: {
    width: normalize(15),
  },
  diameter: {
    width: normalize(35),
    height: normalize(35),
  },
  circle: {
    borderRadius: normalize(100 / 2),
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
    flex: 1,
  },
});

export default AddButton;
