import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {normalize} from '../utils/deviceScaling';

class Account extends React.Component {
  render() {
    return <Text style={styles.rectangle}>Account</Text>;
  }
}

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    height: '100%',
    flex: 1,
  },
});

export default Account;
