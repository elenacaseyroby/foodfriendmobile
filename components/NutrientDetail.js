import React from 'react';
import {ScrollView, Image, Text, View, StyleSheet} from 'react-native';
import FFStatusBar from './common/FFStatusBar';
import OfflineNoticeBanner from './common/OfflineNoticeBanner';
// import topElipse from '../assets/images/';
import bottomElipse from '../assets/images/bottom-elipse-blue.png';
import topElipse from '../assets/images/top-elipse-two-toned-orange.png';
import {normalize} from '../utils/deviceScaling';
import BackArrow from './common/BackArrow';
import propTypes from 'prop-types';

class NutrientDetail extends React.Component {
  static propTypes = {
    nutrient: propTypes.object,
  };
  render() {
    let nutrient;
    try {
      nutrient = this.props.route.params.nutrient;
    } catch (error) {
      nutrient = this.props.nutrient;
    }
    return (
      <>
        <FFStatusBar />
        <OfflineNoticeBanner />
        <ScrollView style={styles.rectangle}>
          <Image style={styles.topElipse} source={topElipse} />
          <Image
            style={styles.icon}
            source={{
              uri: nutrient.iconPath,
            }}
          />
          <Text style={styles.title}>{nutrient.name}</Text>
          <View style={styles.line} />
          <Text style={styles.description}>{nutrient.description}</Text>
          <View style={[styles.banner, styles.blueBackground]}>
            <Text style={styles.bannerText}>Health Benefits</Text>
          </View>
          <View style={styles.arrowContainer}>
            <BackArrow
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  topElipse: {
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 127,
  },
  icon: {
    marginTop: normalize(20),
    alignSelf: 'center',
    position: 'absolute',
    width: normalize(140),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1 / 1,
  },
  arrowContainer: {
    position: 'absolute',
    width: normalize(325),
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    marginTop: normalize(41),
  },
  title: {
    marginTop: '11%',
    marginBottom: '3%',
    width: normalize(340),
    alignSelf: 'center',
    fontFamily: 'Cabin-Italic',
    fontSize: normalize(21),
    color: '#000000',
  },
  line: {
    marginTop: '1%',
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
  },
  description: {
    marginTop: '4%',
    marginBottom: '4%',
    width: normalize(340),
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(14),
    color: '#555555',
  },
  blueBackground: {
    backgroundColor: '#36549a',
  },
  greenBackground: {
    backgroundColor: '#36549a',
  },
  redBackground: {
    backgroundColor: '#36549a',
  },
  banner: {
    width: '100%',
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#ffffff',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    width: normalize(340),
  },
  rectangle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    flex: 1,
  },
});

export default NutrientDetail;
