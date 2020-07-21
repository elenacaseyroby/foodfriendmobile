import React from 'react';
import {ScrollView, Image, StyleSheet, View, Text} from 'react-native';
import {normalize} from '../utils/sizeScaling';
import FFDateBox from './forms/FFDateBox';
import elipse from '../assets/images/top-elipse-two-toned-orange.png';
import plant from '../assets/images/monstera.png';

class OnboardingSurvey extends React.Component {
  state = {
    date: null,
  };
  handleDateChange = (date) => {
    this.setState({date: date}); //... here
  };
  render() {
    return (
      <ScrollView style={styles.rectangle}>
        <Image style={styles.elipse} source={elipse} />
        <View style={styles.header}>
          <Text style={styles.headerText}>Let's Learn about you</Text>
          <Image style={styles.plant} source={plant} />
        </View>
        <View style={styles.form}>
          <Text style={styles.instructionsText}>
            The information you provide will help us match you to your nutrient
            path.
          </Text>
          <FFDateBox label={'Your Birthday'} onChange={this.handleDateChange} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  elipse: {
    position: 'absolute',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 239,
  },
  header: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(30),
    width: normalize(304),
    flexDirection: 'row',
  },
  headerText: {
    marginTop: '20%',
    position: 'relative',
    fontFamily: 'Cabin-SemiBold',
    color: '#ffffff',
    lineHeight: normalize(33),
    fontSize: normalize(30),
    width: normalize(140),
  },
  plant: {
    width: normalize(175),
    height: undefined,
    aspectRatio: 195 / 213,
    // borderColor: '#aaaaaa',
    // borderWidth: 0.5,
  },
  // Align page structure.
  form: {
    alignSelf: 'center',
    width: normalize(304),
    marginTop: '10%',
    minHeight: '100%',
  },
  instructionsText: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#3d3d3d',
  },
  rectangle: {
    width: '100%',
    height: 1500,
    flex: 1,
  },
});

export default OnboardingSurvey;
