import React from 'react';
import {View, Image, Text, StyleSheet, ImageBackground} from 'react-native';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage2.png';
import plate from '../../assets/images/full-food-plate.png';

class SlideTwo extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={2} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.slideContent}>
            <View style={styles.topTextContainer}>
              <Text style={styles.lightWhiteText}>{"That's why"}</Text>
              <Text style={styles.lightWhiteText}>{'  we designed'}</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.lightWhiteText}>{'    an '}</Text>
                <Text style={styles.boldGreenText}>easy way</Text>
              </View>
            </View>
            <View style={styles.plate}>
              <Image source={plate} />
            </View>
            <View style={styles.middleTextContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.lightGreenText}>{'to get the '}</Text>
                <Text style={styles.boldWhiteText}>nutrients</Text>
              </View>
              <Text style={styles.lightGreenText}>
                {'                you need'}
              </Text>
            </View>
            <View style={styles.bottomTextContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.lightWhiteText}>{'from the '}</Text>
                <Text style={styles.boldGreenText}>food</Text>
              </View>
              <Text style={styles.lightWhiteText}>
                {'              you eat!'}
              </Text>
            </View>
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
  topTextContainer: {
    marginTop: '17%',
    marginLeft: '10%',
    width: 210,
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  lightWhiteText: {
    fontFamily: 'Bellota-Regular',
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 31,
  },
  boldGreenText: {
    fontFamily: 'Bellota-Bold',
    color: '#c0dd78',
    fontSize: 30,
    lineHeight: 31,
  },
  plate: {
    marginTop: '2%',
    marginLeft: '35%',
  },
  middleTextContainer: {
    marginTop: '2%',
    alignSelf: 'center',
    width: 270,
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  lightGreenText: {
    fontFamily: 'Bellota-Regular',
    color: '#004700',
    fontSize: 30,
    lineHeight: 31,
  },
  boldWhiteText: {
    fontFamily: 'Bellota-Bold',
    color: '#ffffff',
    fontSize: 30,
    lineHeight: 31,
  },
  bottomTextContainer: {
    marginTop: '17%',
    width: 230,
    alignSelf: 'center',
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    height: 650,
    width: 375,
  },
});

export default SlideTwo;
