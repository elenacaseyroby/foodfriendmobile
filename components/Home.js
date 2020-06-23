import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Text>Home Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {},
  rectangle: {
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
