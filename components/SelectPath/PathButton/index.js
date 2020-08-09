import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {normalize} from '../../../utils/deviceScaling';
import propTypes from 'prop-types';

class PathButton extends React.Component {
  static propTypes = {
    path: propTypes.object,
  };
  render() {
    return (
      <View key={this.props.path.name} style={styles.buttonContainer}>
        <Text>{this.props.path.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#5d80c1',
    width: '100%',
    height: normalize(97),
  },
});

export default PathButton;
