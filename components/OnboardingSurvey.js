import React from 'react';
import {ScrollView, Image, StyleSheet, View, Text} from 'react-native';
import {normalize} from '../utils/deviceScaling';
import {validateDate} from '../utils/formValidation';
import api from '../services/api';
import {connect} from 'react-redux';
import {fetchDiets} from '../redux/actions/dietsActionCreator';
import {fetchPaths} from '../redux/actions/pathsActionCreator';
import {fetchUser} from '../redux/actions/userActionCreator';
import FFDateBox from './forms/FFDateBox';
import FFSelectButtons from './forms/FFSelectButtons';
import FFRadioButtons from './forms/FFRadioButtons';
import FFNarrowButton from './common/FFNarrowButton';
import FFErrorMessage from './forms/FFErrorMessage';
import FFStatusBar from './common/FFStatusBar';
import orangeElipse from '../assets/images/top-elipse-two-toned-orange.png';
import plant from '../assets/images/monstera.png';
import blueElipse from '../assets/images/bottom-elipse-blue-2.png';

class OnboardingSurvey extends React.Component {
  state = {
    errorMessage: null,
    birthday: 'MM/DD/YYYY',
    diets: [],
    pathName: null,
    menstruates: null,
  };
  onComponentDidMount() {
    // Fetch data if not yet in state.
    if (
      this.props.diets &&
      !this.props.diets.list &&
      !this.props.diets.loading &&
      !this.props.diets.error
    ) {
      this.props.dispatch(fetchDiets());
    }
    if (
      this.props.paths &&
      !this.props.paths.list &&
      !this.props.paths.loading &&
      !this.props.paths.error
    ) {
      this.props.dispatch(fetchPaths());
    }
  }
  handleDateChange = (date) => {
    this.setState({birthday: date});
  };
  handleDiets = (selectedDiets) => {
    this.setState({diets: selectedDiets});
  };
  handlePath = (selectedPath) => {
    this.setState({pathName: selectedPath});
  };
  handleMenstruates = (menstruates) => {
    this.setState({menstruates: menstruates});
  };
  getPathName = () => {
    let vegan;
    this.props.diets.list.map((diet) => {
      if (diet.name.toLowerCase().trim() === 'vegan') {
        vegan = diet;
      }
    });
    const userIsVegan = this.state.diets.includes(JSON.stringify(vegan.id))
      ? true
      : false;
    // beauty is same for everyone
    if (this.state.pathName === 'beauty') return 'beauty';
    // energy for vegans works for menstruating vegans too
    if (this.state.pathName === 'energy' && userIsVegan) {
      return 'energy for vegans';
    }
    if (this.state.pathName === 'mood' && userIsVegan) {
      return 'mood for vegans';
    }
    if (this.state.pathName === 'cognition' && userIsVegan) {
      return 'cognition for vegans';
    }
    if (this.state.pathName === 'immunity' && userIsVegan) {
      return 'immunity for vegans';
    }
    // Energy for menstruation is energy for menstruating non-vegans
    if (this.state.pathName === 'energy' && this.state.menstruates) {
      return 'energy for menstruation';
    }
    // Without those issues, all paths are the same:
    if (this.state.pathName === 'energy') return 'energy';
    if (this.state.pathName === 'cognition') return 'cognition';
    if (this.state.pathName === 'immunity') return 'immunity';
    if (this.state.pathName === 'mood') return 'mood';
  };
  handleSubmit = async () => {
    // Validate fields
    let errorMessage;
    errorMessage = validateDate(this.state.birthday);
    errorMessage =
      errorMessage ||
      (!this.state.pathName
        ? 'Please select an area you are most interested in improving.'
        : null);
    if (errorMessage) {
      return this.setState({errorMessage: errorMessage});
    }
    // post user diets
    if (this.state.diets.length > 0) {
      const dietsRequest = await api.putUserDiets(
        this.props.auth.userId,
        this.state.diets,
      );
      if (dietsRequest.status !== 200) {
        return this.setState({
          errorMessage: 'Form submit has failed, please try again.',
        });
      }
    }
    // post user birthday & menstruates
    const body = {
      birthday: this.state.birthday,
      menstruates: this.state.menstruates,
    };
    const userRequest = await api.putUser(this.props.auth.userId, body);
    if (userRequest.status !== 200) {
      return this.setState({
        errorMessage: 'Form submit failed, please try again.',
      });
    }
    // get fresh user data since it's been updated:
    this.props.dispatch(fetchUser(this.props.auth.userId));
    const selectedPathName = this.getPathName();
    let selectedPath;
    this.props.paths.list.map((path) => {
      if (
        path.name.toLowerCase().trim() === selectedPathName.toLowerCase().trim()
      ) {
        selectedPath = path;
      }
    });
    if (selectedPath) {
      this.props.navigation.navigate('Path', {
        selectedPath: selectedPath,
      });
    } else {
      this.setState({
        errorMessage: 'Submit failed, please try again.',
      });
    }
  };
  render() {
    let diets = [];
    if (this.props.diets.list) {
      this.props.diets.list.map((diet) => {
        diets.push({id: JSON.stringify(diet.id), value: diet.name});
      });
    }
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
          hidden={false}
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
            <FFNarrowButton label={'Submit'} onClick={this.handleSubmit} />
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  diets: state.diets,
  paths: state.paths,
});

export default connect(mapStateToProps)(OnboardingSurvey);
