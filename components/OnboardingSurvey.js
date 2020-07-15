import React from 'react';
import {ScrollView, Image, StyleSheet, View, Text} from 'react-native';
import elipse from '../assets/images/top-elipse-two-toned-orange.png';
class OnboardingSurvey extends React.Component {
  render() {
    return (
      <ScrollView style={styles.rectangle}>
        <View style={styles.header}>
          <View style={styles.elipse}>
            <Image source={elipse} />
          </View>
          <Text style={styles.headerText}>Let's Learn about you</Text>
        </View>
        <View style={styles.content}></View>
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
