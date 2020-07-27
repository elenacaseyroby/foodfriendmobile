import React from 'react';
import {View, StyleSheet} from 'react-native';
import {statusBarHeight} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class FFStatusBar extends React.Component {
  static propTypes = {
    // https://reactnative.dev/docs/statusbar#barstyle
    barStyle: propTypes.string,
    backgroundColorStyle: propTypes.object,
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
    opacity: 0.8,
  },
});

export default FFStatusBar;
