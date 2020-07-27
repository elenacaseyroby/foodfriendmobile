import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {normalize, statusBarHeight} from '../../utils/deviceScaling';
import ProgressBar from './ProgressBar';
import backgroundImage from './assets/backgroundImage2.png';
// import plate from '../../assets/images/full-food-plate.png'

class SlideTwo extends React.Component {
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.progressBar}>
          <ProgressBar activeCircleIndex={2} />
        </View>
        <View style={styles.rectangle}>
          <View style={styles.topTextContainer}>
            <Text style={[styles.whiteText, styles.regularText, styles.h1]}>
              {"That's why"}
            </Text>
            <Text style={[styles.whiteText, styles.regularText, styles.h1]}>
              {"we've designed"}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={[styles.whiteText, styles.regularText, styles.h1]}>
                {'an '}
              </Text>
              <Text
                style={[styles.orangeText, styles.italicizedText, styles.h1]}>
                {'easy way'}
              </Text>
            </View>
          </View>
          {/* <View style={styles.plateAndTextContainer} />
          <View style={styles.plate}>
            <Image source={plate} />
          </View> */}
          <View style={styles.bottomTextContainer}>
            <View style={styles.rowContainer}>
              <Text style={[styles.whiteText, styles.regularText, styles.h3]}>
                {'to get the '}
              </Text>
              <Text
                style={[styles.orangeText, styles.italicizedText, styles.h3]}>
                {'nutrients '}
              </Text>
              <Text style={[styles.whiteText, styles.regularText, styles.h3]}>
                {'you need'}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={[styles.whiteText, styles.regularText, styles.h2]}>
                {'from the '}
              </Text>
              <Text
                style={[styles.orangeText, styles.italicizedText, styles.h2]}>
                {'food '}
              </Text>
              <Text style={[styles.whiteText, styles.regularText, styles.h2]}>
                {'you eat!'}
              </Text>
            </View>
          </View>
          {/* </View> */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // Component styles from top of slide
  // to bottom of slide.
  progressBar: {
    marginTop: statusBarHeight + 5,
    alignSelf: 'center',
    position: 'absolute',
  },
  topTextContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: statusBarHeight + normalize(50, 90),
    width: normalize(221),
    // To test:
    // borderColor: '#ffffff',
    // borderWidth: 0.5,
  },
  // plate: {
  //   marginBottom: '10%',
  //   width: normalize(w, mw),
  //   height: undefined,
  //   // aspectRatio: width / height,
  //   aspectRatio: w / h,
  // },
  // plateAndBottomTextContainer: {
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   bottom: '12%',
  // },
  bottomTextContainer: {
    width: normalize(299),
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '12%',
  },
  orangeText: {
    color: '#ffb021',
  },
  whiteText: {
    color: '#ffffff',
  },
  italicizedText: {
    fontFamily: 'Bellota-BoldItalic',
  },
  regularText: {
    fontFamily: 'Bellota-Regular',
  },
  h1: {
    fontSize: normalize(31, 60),
    letterSpacing: -0.54,
    lineHeight: normalize(33, 60),
  },
  h2: {
    fontSize: normalize(30, 80),
    letterSpacing: -0.54,
    lineHeight: normalize(33, 80),
  },
  h3: {
    fontSize: normalize(26, 40),
    letterSpacing: -1.28,
    lineHeight: normalize(26, 40),
  },
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
    position: 'relative',
  },
});

export default SlideTwo;
