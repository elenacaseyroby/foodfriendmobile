import React from 'react';
import {View, StyleSheet} from 'react-native';
import {normalize, statusBarHeight} from '../../utils/sizeScaling';
import propTypes from 'prop-types';

class FFStatusBar extends React.Component {
  static propTypes = {
    // https://reactnative.dev/docs/statusbar#barstyle
    barStyle: propTypes.string,
    backgroundColorStyle: propTypes.string,
  };
  render() {
    return (
      <View style={[styles.statusBar, this.props.backgroundColorStyle]}></View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: statusBarHeight,
  },
});

export default FFStatusBar;
