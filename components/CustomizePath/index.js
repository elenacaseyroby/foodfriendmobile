import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import api from '../../services/api';
import {fetchUser} from '../../redux/actions/userActionCreator';
import FFStatusBar from '../common/FFStatusBar';
import NutrientButton from '../common/NutrientButton';
import BackArrow from '../common/BackArrow';
import PathHeader from '../common/PathHeader';
import BlueBottomElipse2 from '../common/BlueBottomElipse2';
import FFNarrowButton from '../common/FFNarrowButton';
import FFTextBox from '../forms/FFTextBox';
import FFErrorMessage from '../forms/FFErrorMessage';
import OfflineNotificationBanner from '../common/OfflineNoticeBanner';
import topElipse from './custom-elipse-top.png';
import bottomElipse from './custom-elipse-bottom.png';
import {normalize} from '../../utils/deviceScaling';
import {orderNutrientsByTheme} from '../../utils/nutrients';

class CustomizePath extends React.Component {
  state = {
    errorMessage: '',
    pathName: '',
    nutrientIds: [],
  };
  componentDidMount = () => {
    const {customPath} = this.props.user;
    if (!customPath) return;
    const nutrientIds = customPath.nutrients.map((nutrient) => {
      return nutrient.id;
    });
    this.setState({nutrientIds: nutrientIds, pathName: customPath.name});
  };
  handleNutrients = (nutrientId) => {
    const nutrientIds = this.state.nutrientIds;
    // If nutrient is already in list, remove it.
    if (nutrientIds.includes(nutrientId)) {
      const newNutrientIds = [];
      nutrientIds.map((id) => {
        if (id !== nutrientId) {
          newNutrientIds.push(id);
        }
      });
      return this.setState({nutrientIds: newNutrientIds});
    }
    // If 3 nutrients already selected, do nothing.
    if (nutrientIds.length >= 3) return;
    // Else, add nutrient id to list.
    this.setState({nutrientIds: [...nutrientIds, nutrientId]});
  };
  renderNutrients = (nutrients) => {
    const orderedNutrients = orderNutrientsByTheme(nutrients);
    return (
      <View style={styles.nutrientsContainer}>
        {orderedNutrients.map((nutrient) => {
          const selected = this.state.nutrientIds.includes(nutrient.id);
          return (
            <NutrientButton
              key={nutrient.id}
              nutrient={nutrient}
              style={styles.nutrientButton}
              navigation={this.props.navigation}
              displayAddNutrientButton={true}
              onAddNutrientClick={this.handleNutrients}
              selected={selected}
            />
          );
        })}
      </View>
    );
  };
  handlePathName = (name) => {
    this.setState({pathName: name});
  };
  handleSubmit = async () => {
    const pathName = this.state.pathName;
    const nutrientIds = this.state.nutrientIds;
    const userId = this.props.user.id;
    // Don't allow names longer than 1 word in length.
    if (pathName.trim().split(' ').length > 1) {
      return this.setState({
        errorMessage:
          'Path name cannot contain more than one word. Please shorten your path name and try again.',
      });
    }
    // Must select between 1 and 3 nutrients.
    if (nutrientIds.length < 1) {
      return this.setState({
        errorMessage:
          'Must select at least one nutrient to submit.  Click the (+) button next to a nutrient to select it.  If 3 nutrients already selected, must unselect a nutrient to select a new nutrient',
      });
    }
    const pathUpdated = await api.putCustomPath(userId, pathName, nutrientIds);
    if (pathUpdated.status !== 200) {
      return this.setState({
        errorMessage:
          'Oops! An error ocurred and we were not able to update your custom path.  Please check your network connection and try again.',
      });
    }
    // Update user state.
    this.props.dispatch(fetchUser(userId));
    this.props.navigation.navigate('Dashboard');
  };
  render() {
    const {customPath} = this.props.user;
    const nutrients = this.props.nutrients.list;
    return (
      <>
        <FFStatusBar />
        {/*scrollIndicatorInsets setting prevents bug: https://github.com/facebook/react-native/issues/26610*/}
        <ScrollView style={styles.rectangle} scrollIndicatorInsets={{right: 1}}>
          {/**render default header under real header so if internet fails, default header appears.*/}
          <PathHeader style={styles.headerImg} />
          <View style={styles.formContainer}>
            <Text style={styles.h1}>Customize Your Path</Text>
            <Text style={[styles.h3, styles.topMargin]}>
              Build a nutrient path to fit your needs.
            </Text>
            <Text style={[styles.h2, styles.textboxLabel, styles.topMargin]}>
              Define your path in one word
            </Text>
            <FFTextBox
              onChangeText={this.handlePathName}
              placeholder={
                (customPath && customPath.name) ||
                'Choose a word to describe your journey.'
              }
              maxLength={30}
              autoCapitalize="words"
              autoCompleteType="name"
              textContentType="name"
            />
            <Text style={[styles.h2, styles.yourNutrientsTopMargin]}>
              Select your nutrients
            </Text>
            <Text style={[styles.h4, styles.bottomMargin]}>
              Choose up to 3 nutrients. Scroll to the bottom to submit.
            </Text>
          </View>
          <Image style={styles.topElipse} source={topElipse} />
          {this.renderNutrients(nutrients)}
          <Image style={styles.bottomElipse} source={bottomElipse} />
          <View style={styles.errorMessage}>
            <FFErrorMessage
              textStyle={styles.errorMessageText}
              errorMessage={this.state.errorMessage}
            />
          </View>
          <BlueBottomElipse2 style={styles.blueElipse} />
          <View style={styles.submitButton}>
            <FFNarrowButton label={'Submit'} onClick={this.handleSubmit} />
          </View>
          <View style={styles.arrowContainer}>
            <BackArrow
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            />
          </View>
        </ScrollView>
        <OfflineNotificationBanner />
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerImg: {
    // resizeMode: 'contain',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 188,
  },
  topElipse: {
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1125 / 102,
  },
  bottomElipse: {
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 1125 / 102,
  },
  title: {
    marginTop: '1%',
    marginBottom: '1%',
    width: normalize(340),
    alignSelf: 'center',
    fontFamily: 'Cabin-Italic',
    fontSize: normalize(21),
    color: '#000000',
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
  pathHeaderDefault: {
    position: 'absolute',
  },
  textboxLabel: {
    marginBottom: normalize(-7),
  },
  nutrientsContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingTop: '5%',
    paddingBottom: '10%',
    backgroundColor: '#36549a',
  },
  nutrientButton: {
    marginTop: '1%',
    marginBottom: '1%',
  },
  errorMessage: {
    marginTop: '5%',
    alignSelf: 'center',
    width: normalize(340),
  },
  errorMessageText: {
    textAlign: 'center',
  },
  formContainer: {
    alignSelf: 'center',
    width: normalize(310),
    marginBottom: '2%',
  },
  yourNutrientsTopMargin: {
    marginTop: '2%',
  },
  topMargin: {
    marginTop: '5%',
  },
  bottomMargin: {
    marginBottom: '5%',
  },
  h1: {
    marginTop: '5%',
    fontSize: normalize(30),
    color: '#555555',
    width: normalize(150),
    alignSelf: 'flex-start',
    fontFamily: 'Cabin-SemiBold',
  },
  h2: {
    fontSize: normalize(21),
    color: '#555555',
    fontFamily: 'Cabin-SemiBold',
  },
  h3: {
    fontSize: normalize(16),
    color: '#555555',
    fontFamily: 'Cabin-SemiBold',
  },
  h4: {
    fontSize: normalize(16),
    color: '#aaaaaa',
    fontFamily: 'Cabin-Regular',
  },
  blueElipse: {
    marginTop: '10%',
  },
  submitButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: normalize(130),
  },
  rectangle: {
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  nutrients: state.nutrients,
});

export default connect(mapStateToProps)(CustomizePath);
