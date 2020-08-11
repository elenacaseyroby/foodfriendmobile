import React from 'react';
import {StyleSheet, Image} from 'react-native';
import footer from './path-footer.png';
import propTypes from 'prop-types';

class PathFooter extends React.Component {
  static propTypes = {
    style: propTypes.object,
  };
  render() {
    return (
      <>
        <Image source={footer} style={[styles.footer, this.props.style]} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 270,
  },
});

export default PathFooter;
