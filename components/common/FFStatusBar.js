import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {statusBarHeight} from '../../utils/deviceScaling';
import propTypes from 'prop-types';

class FFStatusBar extends React.Component {
  static propTypes = {
    // https://reactnative.dev/docs/statusbar#barstyle
    barStyle: propTypes.string,
    backgroundColorStyle: propTypes.object,
    hidden: propTypes.bool,
  };
  render() {
    const backgroundColor =
      this.props.backgroundColorStyle || styles.defaultBackgroundColor;
    return (
      <>
        <View style={[styles.statusBar, backgroundColor]} />
        <StatusBar
          barStyle={this.props.barStyle || 'dark-content'}
          hidden={this.props.hidden || false}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: statusBarHeight,
    opacity: 0.8,
  },
  defaultBackgroundColor: {
    backgroundColor: '#ffffff',
  },
});

export default FFStatusBar;
