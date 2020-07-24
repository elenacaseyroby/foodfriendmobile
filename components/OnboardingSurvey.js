import React from 'react';
import {
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {normalize} from '../utils/deviceScaling';
import FFDateBox from './forms/FFDateBox';
import FFSelectButtons from './forms/FFSelectButtons';
import FFRadioButtons from './forms/FFRadioButtons';
import FFSubmitButton from './forms/FFSubmitButton';
import FFErrorMessage from './forms/FFErrorMessage';
import FFStatusBar from './common/FFStatusBar';
import orangeElipse from '../assets/images/top-elipse-two-toned-orange.png';
import plant from '../assets/images/monstera.png';
import blueElipse from '../assets/images/bottom-elipse-blue-2.png';

class OnboardingSurvey extends React.Component {
  state = {
    errorMessage: null,
    birthday: null,
    diets: [],
    path: null,
    menstruates: null,
  };
  onComponentDidMount() {}
  handleDateChange = (date) => {
    this.setState({birthday: date});
  };
  handleDiets = (selectedDiets) => {
    this.setState({diets: selectedDiets});
  };
  handlePath = (selectedPaths) => {
    this.setState({path: selectedPaths.length > 0 ? selectedPaths[0] : null});
  };
  handleMenstruates = (menstruates) => {
    this.setState({menstruates: menstruates});
  };
  handleSubmit = () => {
    return;
  };
  getPath = () => {
    // beauty is same for everyone
    if (this.state.path === 'beauty') return 'Beauty';
    // energy for vegans works for menstruating vegans too
    if (this.state.path === 'energy' && this.state.diets.includes('vegan')) {
      return 'Energy For Vegans';
    }
    if (this.state.path === 'mood' && this.state.diets.includes('vegan')) {
      return 'Mood For Vegans';
    }
    if (this.state.path === 'cognition' && this.state.diets.includes('vegan')) {
      return 'Cognition For Vegans';
    }
    if (this.state.path === 'immunity' && this.state.diets.includes('vegan')) {
      return 'Immunity For Vegans';
    }
    // Energy for menstruation is energy for menstruating non-vegans
    if (this.state.path === 'energy' && this.state.menstruates) {
      return 'Energy For Menstruation';
    }
    // Without those issues, all paths are the same:
    if (this.state.path === 'energy') return 'Energy';
    if (this.state.path === 'cognition') return 'Cognition';
    if (this.state.path === 'immunity') return 'Immunity';
    if (this.state.path === 'mood') return 'Mood';
  };
  render() {
    const diets = [
      {id: 'vegetarian', value: 'Vegetarian'},
      {id: 'vegan', value: 'Vegan'},
      {id: 'pescatarian', value: 'Pescatarian'},
      {id: 'gluten-free', value: 'Gluten-free'},
      {id: 'dairy-free', value: 'Dairy-free'},
    ];
    const benefits = [
      {id: 'mood', value: 'Emotional Well-being'},
      {id: 'cognition', value: 'Brain Health'},
      {id: 'beauty', value: 'Skin & Hair'},
      {id: 'energy', value: 'Energy & Vitality'},
      {id: 'immunity', value: 'Physical Health & Wellness'},
    ];
    return (
      <>
        <FFStatusBar
          barStyle={'dark-content'}
          backgroundColorStyle={styles.statusBarBackgroundColor}
        />
        <ScrollView style={styles.rectangle}>
          <Image style={styles.orangeElipse} source={orangeElipse} />
          <View style={styles.header}>
            <Text style={styles.headerText}>Let's Learn about you</Text>
            <Image style={styles.plant} source={plant} />
          </View>
          <View style={styles.form}>
            <Text style={styles.instructionsText}>
              The information you provide will help us match you to your
              nutrient path.
            </Text>
            <FFDateBox
              label={'Your Birthday'}
              onChangeText={this.handleDateChange}
            />
            <FFSelectButtons
              label="Do you have any dietary restrictions?"
              instructions="Please select all that apply"
              items={diets}
              onChange={this.handleDiets}
            />
            <FFRadioButtons
              label="Do you menstruate?"
              onChange={this.handleMenstruates}
              allowOptOut={true}
            />
            <FFSelectButtons
              label="What are you most interested in improving?"
              instructions="Please select one"
              items={benefits}
              onChange={this.handlePath}
              selectionCount={1}
            />
            <FFErrorMessage errorMessage={this.state.errorMessage} />
          </View>
          <Image style={styles.blueElipse} source={blueElipse} />
          <View style={styles.submitButton}>
            <FFSubmitButton onSubmit={this.handleSubmit} />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  orangeElipse: {
    position: 'absolute',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 239,
  },
  header: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(20),
    width: normalize(310),
    flexDirection: 'row',
  },
  headerText: {
    marginTop: '19%',
    position: 'relative',
    fontFamily: 'Cabin-SemiBold',
    color: '#ffffff',
    lineHeight: normalize(33),
    fontSize: normalize(30),
    width: normalize(140),
  },
  plant: {
    marginLeft: '1%',
    width: normalize(190),
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
  },
  instructionsText: {
    marginBottom: '5%',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#3d3d3d',
  },
  submitButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: normalize(60),
  },
  blueElipse: {
    marginTop: '10%',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1110 / 270,
  },
  rectangle: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  statusBarBackgroundColor: {
    backgroundColor: '#ffffff',
  },
});

export default OnboardingSurvey;
