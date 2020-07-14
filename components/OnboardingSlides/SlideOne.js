import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage1.png';
import mirror from './assets/mirror-illustration.png';
import coins from './assets/money-icon.png';
import RightArrow from './assets/swipe-right-arrow.svg';

class SlideOne extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={1} />
        </View>
        <View style={styles.everyoneTextContainer}>
          <Text style={styles.everyoneText}>Everyone</Text>
          <Text style={styles.deservesText}>deserves to feel good</Text>
        </View>
        <Image source={mirror} />
        <View style={styles.textAndCoinsContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.butText}>but</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.thiscanBeText}>this can be</Text>
              <Text style={styles.difficultText}>difficult</Text>
            </View>
            <Text style={styles.whenText}>when relying on</Text>
            <Text style={styles.expensiveText}>expensive, unregulated</Text>
            <Text style={styles.supplementsText}>supplements.</Text>
          </View>
          <Image source={coins} />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.swipeText}>Swipe to continue</Text>
          <RightArrow />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  progressBar: {
    marginTop: '12%',
    alignSelf: 'center',
  },
  backgroundImage: {
    height: '100%',
    flex: 1,
  },
  everyoneTextContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  everyoneText: {
    fontFamily: 'Bellota-Regular',
  },
  deservesText: {},
  textAndCoinsContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    width: '70%',
  },
  butText: {},
  thiscanBeText: {},
  difficultText: {},
  whenText: {},
  expensiveText: {},
  supplementsText: {},
  swipeText: {},
  rowContainer: {
    flexDirection: 'row',
  },
});

export default SlideOne;
