import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import logo from '../assets/images/launch-logo.png';

class Landing extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Image source={logo} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {},
  rectangle: {
    backgroundColor: '#1f641e',
    minHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Landing;
