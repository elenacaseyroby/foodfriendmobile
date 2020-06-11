import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from './common/logo-green-background.svg';

class Landing extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Logo />
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
