import React from 'react';
import {TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class MenuButton extends React.Component {
  static propTypes = {
    backgroundImage: propTypes.number.isRequired,
    icon: propTypes.number.isRequired,
    iconStyle: propTypes.object.isRequired,
    label: propTypes.string.isRequired,
    onPress: propTypes.func.isRequired,
  };
  render() {
    return (
      <TouchableOpacity style={styles.cardSize} onPress={this.props.onPress}>
        <Image
          style={[styles.cardSize, styles.backgroundImage]}
          source={this.props.backgroundImage}
        />
        <View style={styles.iconAndLabelContainer}>
          <Image
            style={[styles.icon, this.props.iconStyle]}
            source={this.props.icon}
          />
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconAndLabelContainer: {
    marginLeft: '7%',
    marginRight: '7%',
    marginTop: '5%',
    // borderColor: '#ffffff',
    // borderWidth: 1.0,
  },
  icon: {
    marginLeft: '-3%',
    position: 'relative',
  },
  label: {
    position: 'relative',
    color: '#ffffff',
    fontFamily: 'Cabin-Bold',
    fontSize: normalize(16),
  },
  cardSize: {
    width: normalize(165),
    height: undefined,
    aspectRatio: 165 / 175,
  },
  backgroundImage: {
    position: 'absolute',
  },
});

export default MenuButton;
