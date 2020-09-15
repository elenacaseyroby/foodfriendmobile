import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import passiveTab from './assets/passive-tab.png';
import activeTab from './assets/active-tab.png';
import propTypes from 'prop-types';

class Tab extends React.Component {
  static propTypes = {
    onPress: propTypes.func.isRequired,
    active: propTypes.bool.isRequired,
    iconSource: propTypes.number.isRequired,
    style: propTypes.object,
  };
  render() {
    return (
      <TouchableOpacity
        style={[styles.tabContainer, styles.tabSize, this.props.style]}
        onPress={this.props.onPress}>
        <Image
          source={this.props.active ? activeTab : passiveTab}
          style={[styles.backgroundImage, styles.tabSize]}
        />
        <Image source={this.props.iconSource} style={styles.icon} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
  },
  tabSize: {
    width: normalize(180),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 516 / 165,
  },
  icon: {
    width: normalize(22),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
});

export default Tab;
