import React from 'react';
import {ScrollView, Image, StyleSheet, View, Text} from 'react-native';
import FFDateBox from './forms/FFDateBox';
import elipse from '../assets/images/top-elipse-two-toned-orange.png';
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
        <View style={styles.header}>
          <View style={styles.elipse}>
            <Image source={elipse} />
          </View>
          <Text style={styles.headerText}>Let's Learn about you</Text>
        </View>
        <View style={styles.content}>
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
  header: {
    width: '100%',
  },
  elipse: {
    position: 'absolute',
  },
  headerText: {
    marginTop: '20%',
    marginLeft: '5%',
    position: 'relative',
    fontFamily: 'Cabin-Regular',
    color: '#ffffff',
    lineHeight: 30,
    fontSize: 30,
    width: 137,
    height: 81,
  },
  instructionsText: {
    fontFamily: 'Cabin-Regular',
    fontSize: 16,
    color: '#3d3d3d',
  },
  // Align page structure.
  content: {
    width: 340,
    marginLeft: '5%',
    marginTop: 100,
    minHeight: '100%',
    borderColor: '#aaaaaa',
    borderWidth: 0.5,
  },
  rectangle: {
    width: '100%',
    height: 1500,
    flex: 1,
  },
});

export default OnboardingSurvey;
