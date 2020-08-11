import React from 'react';
import {StyleSheet, Image} from 'react-native';
import header from './path-header.png';
import propTypes from 'prop-types';

class PathHeader extends React.Component {
  static propTypes = {
    style: propTypes.object,
  };
  render() {
    return (
      <>
        <Image source={header} style={[styles.header, this.props.style]} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 188,
  },
});

export default PathHeader;
