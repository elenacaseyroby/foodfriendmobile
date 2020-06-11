import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Text> Login !!!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {},
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
