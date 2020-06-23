import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Onboarding extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Text>Onboarding Page</Text>
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

export default Onboarding;