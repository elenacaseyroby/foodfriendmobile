import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage3.png';
import topDesertIcon from './assets/desert-red-icon.png';
import target from './assets/target-icon.png';

class SlideThree extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.topDesertIcon}>
          <Image source={topDesertIcon} resizeMode="contain" />
        </View>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={3} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.topTextContainer}>
            <Text style={styles.lightWhiteText}>Just choose a</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.lightWhiteText}>{'nutrient '}</Text>
              <Text style={styles.boldPeachText}>path</Text>
            </View>
          </View>
          <View style={styles.textAndTargetContainer}>
            <View style={styles.bottomTextContainer}>
              <Text style={styles.lightWhiteText}>aligned with your</Text>
              <Text style={styles.boldPurpleText}>health goals</Text>
            </View>
            <Image style={styles.target} source={target} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // Component styles from top of slide
  // to bottom of slide.
  progressBar: {
    marginTop: '12%',
    alignSelf: 'center',
    position: 'absolute',
  },
  topDesertIcon: {
    position: 'absolute',
  },
  topTextContainer: {
    paddingTop: '39%',
    width: 200,
    height: '30%',
    marginLeft: '10%',
  },
  lightWhiteText: {
    fontFamily: 'Bellota-Regular',
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 31,
  },
  boldPeachText: {
    fontFamily: 'Bellota-Bold',
    color: '#dd886d',
    fontSize: 30,
    lineHeight: 31,
  },
  textAndTargetContainer: {
    position: 'absolute',
    bottom: '5%',
    right: '10%',
  },
  bottomTextContainer: {
    alignItems: 'flex-end',
    width: 250,
  },
  boldPurpleText: {
    fontFamily: 'Bellota-Bold',
    color: '#513c51',
    fontSize: 30,
    lineHeight: 31,
  },
  target: {
    alignSelf: 'flex-end',
  },
  // Resusable & component wide styles
  rowContainer: {
    flexDirection: 'row',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
  // Use this to fit slide on iPhone 8
  // and center slide on iPhone 11
  rectangle: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    marginTop: 0,
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
});

export default SlideThree;
