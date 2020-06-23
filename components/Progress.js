import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Progress extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Text>My Progress Page</Text>
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

export default Progress;
