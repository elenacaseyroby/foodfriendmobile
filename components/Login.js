import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
// import WideButton from './common/WideButton';
// import plateIcon from '../assets/images/plate-icon.png';
import BackArrow from '../assets/images/back-arrow.svg';
import plantMascot from '../assets/images/plant-mascot.png';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.backArrow}>
          <BackArrow />
        </View>
        <View style={styles.welcomeBackContainer}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Image source={plantMascot} style={styles.plantMascot} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backArrow: {
    marginTop: 33,
    marginLeft: 33,
  },
  welcomeBackContainer: {
    marginTop: 20,
    marginLeft: 33,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  plantMascot: {
    marginRight: 33,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

export default Login;
