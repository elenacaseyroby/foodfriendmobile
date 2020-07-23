import React from 'react';
import {ScrollView, Image, StyleSheet, View, Text} from 'react-native';
import {normalize} from '../utils/sizeScaling';
import FFDateBox from './forms/FFDateBox';
import FFSelectButtons from './forms/FFSelectButtons';
import elipse from '../assets/images/top-elipse-two-toned-orange.png';
import plant from '../assets/images/monstera.png';

class OnboardingSurvey extends React.Component {
  state = {
    birthday: null,
    diets: [],
  };
  onComponentDidMount() {}
  handleDateChange = (date) => {
    console.log(date);
    this.setState({birthday: date}); //... here
  };
  handleDiets = (selectedDiets) => {
    console.log(`selected diets: ${selectedDiets}`);
    this.setState({diets: selectedDiets});
  };
  render() {
    const items = [
      {id: 'vegetarian', value: 'Vegetarian'},
      {id: 'vegan', value: 'Vegan'},
      {id: 'pescatarian', value: 'Pescatarian'},
      {id: 'gluten-free', value: 'Gluten-free'},
      {id: 'dairy-free', value: 'Dairy-free'},
    ];
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
          <FFDateBox
            label={'Your Birthday'}
            onChangeText={this.handleDateChange}
          />
          <FFSelectButtons
            label="Dietery restrictions"
            instructionalText="Please select all that apply"
            onChange={this.handleDiets}
            items={items}
          />
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
    width: normalize(310),
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
    marginLeft: '3%',
    width: normalize(175),
    height: undefined,
    aspectRatio: 195 / 213,
    // borderColor: '#aaaaaa',
    // borderWidth: 0.5,
  },
  // Align page structure.
  form: {
    alignSelf: 'center',
    width: normalize(310),
    marginTop: '10%',
    minHeight: '100%',
  },
  instructionsText: {
    marginBottom: '5%',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#3d3d3d',
  },
  rectangle: {
    width: '100%',
    height: 1500,
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

export default OnboardingSurvey;
