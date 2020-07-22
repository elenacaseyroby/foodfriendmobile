import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage1.png';
import mirror from './assets/mirror-illustration.png';
import coins from './assets/money-icon.png';
// import RightArrow from './assets/swipe-right-arrow.svg';

class SlideOne extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={1} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.slideContent}>
            <View style={styles.everyoneTextContainer}>
              <Text style={styles.everyoneText}>everyone</Text>
              <View style={styles.rowContainer}>
                <Text style={styles.deservesText}>{'deserves to feel '}</Text>
                <Text style={styles.goodText}>good</Text>
              </View>
            </View>
            <View style={styles.mirror}>
              <Image source={mirror} />
            </View>
            <View style={styles.textAndCoinsContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.butText}>
                  {'                        but'}
                </Text>
                <View style={styles.rowContainer}>
                  <Text style={styles.lightWhiteText}>{'  this can be '}</Text>
                  <Text style={styles.difficultText}>{'difficult'}</Text>
                </View>
                <Text style={styles.lightWhiteText}>
                  {'         when relying on'}
                </Text>
                <Text style={styles.lightWhiteText}>
                  {'expensive, unregulated'}
                </Text>
                <Text style={styles.supplementsText}>
                  {'     supplements.'}
                </Text>
              </View>
              <View style={styles.coins}>
                <Image source={coins} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.swipeContainer}>
          <Text style={styles.swipeText}>Swipe to continue</Text>
          {/* <RightArrow style={styles.arrow} /> */}
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
  everyoneTextContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '5%',
    // To test:
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  everyoneText: {
    fontFamily: 'Bellota-Regular',
    color: '#ffa639',
    fontSize: 70,
  },
  deservesText: {
    fontFamily: 'Bellota-Regular',
    color: '#ffffff',
    fontSize: 30,
  },
  goodText: {
    fontFamily: 'Bellota-Regular',
    color: '#ffa639',
    fontSize: 30,
  },
  mirror: {
    marginTop: '2%',
    alignSelf: 'center',
  },
  textAndCoinsContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    alignSelf: 'center',
    // Make this bigger to move text to left.
    width: 330,
  },
  textContainer: {
    width: 260,
  },
  butText: {
    fontSize: 21,
    fontFamily: 'Bellota-Regular',
    color: '#ffffff',
    lineHeight: 20,
  },
  lightWhiteText: {
    fontSize: 20,
    fontFamily: 'Bellota-Regular',
    color: '#ffffff',
    lineHeight: 20,
  },
  difficultText: {
    fontSize: 20,
    fontFamily: 'Bellota-Bold',
    color: '#ffa639',
    lineHeight: 20,
  },
  supplementsText: {
    fontSize: 30,
    fontFamily: 'Bellota-Bold',
    color: '#ffa639',
    lineHeight: 30,
  },
  coins: {
    marginTop: '-2%',
  },
  swipeContainer: {
    marginTop: 0,
    position: 'absolute',
    bottom: '2%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: 140,
  },
  swipeText: {
    fontSize: 14,
    fontFamily: 'Bellota-Regular',
    color: '#ffffff',
  },
  // arrow: {
  //   marginTop: 4,
  //   marginLeft: 4,
  // },
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
    height: 600,
    width: 375,
  },
});

export default SlideOne;
