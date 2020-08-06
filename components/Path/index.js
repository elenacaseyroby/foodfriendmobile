import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import FFStatusBar from '../common/FFStatusBar';
import NutrientButton from '../NutrientButton';
import {connect} from 'react-redux';
import {fetchUser} from '../../redux/actions/userActionCreator';
import api from '../../services/api';
import {normalize} from '../../utils/deviceScaling';
import topFlag from './assets/top-flag.png';
import bottomFlag from './assets/bottom-flag.png';
import blueElipse from '../../assets/images/bottom-elipse-blue-2.png';
import FFWideButton from '../common/FFWideButton';
import FFErrorMessage from '../forms/FFErrorMessage';
import propTypes from 'prop-types';

class Path extends React.Component {
  static propTypes = {
    path: propTypes.object,
    selectingPath: propTypes.bool,
    navigation: propTypes.object,
  };
  state = {
    errorMessage: null,
  };
  getNutrients = (nutrientsWithIds) => {
    const allNutrients = this.props.nutrients.list;
    if (!allNutrients) return [];
    if (allNutrients.length < 1) return [];
    const nutrientIds = [];
    nutrientsWithIds.map((nutrient) => {
      nutrientIds.push(nutrient.id);
    });
    const nutrientsWithAllProperties = [];
    allNutrients.map((nutrient) => {
      if (nutrientIds.includes(nutrient.id)) {
        nutrientsWithAllProperties.push(nutrient);
      }
    });
    return nutrientsWithAllProperties;
  };
  handleSelectPath = async (path) => {
    const body = {
      activePathId: path.id,
    };
    const userRequest = await api.putUser(this.props.auth.userId, body);
    if (userRequest.status !== 200) {
      return this.setState({
        errorMessage:
          "Oops! Something's gone wrong. Please try selecting your path again.",
      });
    }
    // Update user state after updating activePathId.
    this.props.dispatch(fetchUser(this.props.auth.userId));
    //navigate to path page
    this.props.navigation.navigate('My Path');
  };
  renderNote(path) {
    if (!path.notes) return;
    return (
      <View style={styles.notesContainer}>
        <View style={styles.topBlueLine} />
        <View style={styles.topTextContainer}>
          <Image style={styles.topFlag} source={topFlag} />
          <Text style={styles.notesLabel}>Some notes about this path...</Text>
        </View>
        <View style={styles.bottomTextContainer}>
          <Image style={styles.bottomFlag} source={bottomFlag} />
          <Text style={styles.notesText}>{path.notes}.</Text>
        </View>
        <View style={styles.bottomBlueLine} />
      </View>
    );
  }
  renderErrorMessage() {
    if (!this.state.errorMessage) return;
    return (
      <View style={styles.errorMessage}>
        <FFErrorMessage errorMessage={this.state.errorMessage} />
      </View>
    );
  }
  render() {
    const {path} = this.props;
    const selectingPath = this.props.selectingPath;
    const displayName = path.name.split(' ')[0];
    const nutrients = this.getNutrients(path.nutrients);
    return (
      <>
        <FFStatusBar
          barStyle={'dark-content'}
          backgroundColorStyle={styles.statusBarBackgroundColor}
        />
        {/*scrollIndicatorInsets setting prevents bug: https://github.com/facebook/react-native/issues/26610*/}
        <ScrollView style={styles.rectangle} scrollIndicatorInsets={{right: 1}}>
          <Image
            style={styles.headerImg}
            source={{
              uri: path.theme.header_img_path,
            }}
          />
          <Text style={styles.title}>{displayName}</Text>
          <View style={styles.line} />
          {selectingPath ? (
            <Text style={styles.description}>{path.description}</Text>
          ) : (
            <></>
          )}
          <View style={styles.nutrientsContainer}>
            {nutrients.map((nutrient) => {
              return (
                <NutrientButton
                  key={nutrient.id}
                  nutrient={nutrient}
                  style={styles.nutrientButton}
                />
              );
            })}
          </View>
          {this.renderNote(path)}
          <Image
            style={styles.footerImg}
            source={{
              uri: path.theme.footer_img_path,
            }}
          />
          {this.renderErrorMessage()}
          {selectingPath ? (
            <View style={styles.submitButton}>
              <FFWideButton
                label={'Choose this Path'}
                textStyle={styles.submitButtonText}
                onClick={() => this.handleSelectPath(path)}
              />
            </View>
          ) : (
            <></>
          )}

          <View style={styles.selectDifferentPathContainer}>
            <Text style={styles.grayText}>
              Looking for something different?
            </Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Select Path');
                }}>
                <Text style={styles.orangeText}>select a different path</Text>
              </TouchableOpacity>
              <Text style={styles.grayText}>{' or '}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Customize Path');
                }}>
                <Text style={styles.orangeText}>create a custom path</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Image style={styles.blueElipse} source={blueElipse} />
        </ScrollView>
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
  title: {
    marginTop: '1%',
    marginBottom: '1%',
    width: normalize(340),
    alignSelf: 'center',
    fontFamily: 'Bellota-Regular',
    fontSize: normalize(30),
    color: '#000000',
  },
  description: {
    marginTop: '4%',
    marginBottom: '4%',
    width: normalize(340),
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#555555',
  },
  nutrientsContainer: {
    justifyContent: 'center',
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '10%',
    backgroundColor: '#36549a',
  },
  nutrientButton: {
    marginTop: '1%',
    marginBottom: '1%',
  },
  line: {
    marginTop: '1%',
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
  },
  topBlueLine: {
    position: 'absolute',
    bottom: 0,
    borderBottomWidth: 1,
    color: '#1a2955',
    width: '100%',
  },
  bottomBlueLine: {
    position: 'absolute',
    top: 0,
    borderBottomWidth: 1,
    color: '#1a2955',
    width: '100%',
  },
  notesContainer: {
    width: '100%',
    height: normalize(243),
    backgroundColor: '#36549a',
  },
  topTextContainer: {
    justifyContent: 'center',
  },
  topFlag: {
    marginTop: normalize(15),
    width: normalize(347),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 347 / 91,
  },
  notesLabel: {
    paddingTop: normalize(20),
    marginLeft: '6%',
    position: 'absolute',
    fontFamily: 'Cabin-Bold',
    fontSize: normalize(16),
    color: '#ffffff',
  },
  bottomTextContainer: {
    marginTop: normalize(10),
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: normalize(345),
  },
  bottomFlag: {
    width: normalize(345),
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 345 / 100,
  },
  notesText: {
    textAlign: 'right',
    width: normalize(290),
    paddingRight: '5%',
    alignSelf: 'flex-end',
    position: 'absolute',
    fontFamily: 'Cabin-Bold',
    fontSize: normalize(12),
    color: '#ffffff',
  },
  footerImg: {
    alignSelf: 'center',
    width: '102%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 279,
  },
  errorMessage: {
    marginTop: '7%',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: '5%',
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Bellota-Bold',
    fontSize: normalize(29),
    color: '#ffffff',
  },
  selectDifferentPathContainer: {
    marginTop: '2%',
    alignItems: 'center',
    // borderColor: '#aaaaaa',
    // borderWidth: 0.5,
  },
  grayText: {
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#b7b7b7',
  },
  orangeText: {
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  blueElipse: {
    marginTop: '5%',
    width: '100%',
    height: undefined,
    // aspectRatio: width / height,
    aspectRatio: 375 / 90,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rectangle: {
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  paths: state.paths,
  nutrients: state.nutrients,
});

export default connect(mapStateToProps)(Path);
