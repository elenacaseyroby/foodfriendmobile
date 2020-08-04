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
import {fetchNutrients} from '../../redux/actions/nutrientsActionCreator';
import {normalize} from '../../utils/deviceScaling';
import topFlag from './assets/top-flag.png';
import bottomFlag from './assets/bottom-flag.png';
import blueElipse from '../../assets/images/bottom-elipse-blue-2.png';
import FFWideButton from '../common/FFWideButton';
import propTypes from 'prop-types';

class Path extends React.Component {
  static propTypes = {
    selectedPath: propTypes.object,
  };
  componentDidMount() {
    // Fetch data if not yet in state.
    if (
      this.props.nutrients &&
      !this.props.nutrients.list &&
      !this.props.nutrients.loading &&
      !this.props.nutrients.error
    ) {
      this.props.dispatch(fetchNutrients());
    }
  }
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
  renderNote(path) {
    if (!path.notes) return;
    return (
      <View style={styles.notesContainer}>
        <View style={styles.topTextContainer}>
          <Image style={styles.topFlag} source={topFlag} />
          <Text style={styles.notesLabel}>Some notes about this path...</Text>
        </View>
        <View style={styles.bottomTextContainer}>
          <Image style={styles.bottomFlag} source={bottomFlag} />
          <Text style={styles.notesText}>{path.notes}.</Text>
        </View>
        <View style={styles.blueLine} />
      </View>
    );
  }
  render() {
    // const {selectedPath} = this.props.route.params;
    // const path = selectedPath || this.props.path;
    // const displayDescription = selectedPath ? true : false;
    // test
    const displayDescription = true;
    const path = {
      id: 3,
      name: 'Energy For Menstruation',
      description:
        'This path is designed for those looking to add a natural energy boost to their daily routine. By tracking active nutrients like Vitamin B12, Vitamin D, and Magnesium, this path will help you to stay energized!',
      notes:
        'We recommend trying to spend 10-30 minutes in the sun daily to get your recommended daily value of Vitamin D. The time needed for proper absorption varies by season, geolocation and skin complexion. We reccommend kjhlaks lkjfs ksf lkjlkafsjd kjasl kajsflkj lkajflkjad kljafdlkjlkadsf lkajsdflkjlks.',
      notesSources: '',
      createdAt: '2020-06-09T22:23:26.000Z',
      updatedAt: '2020-06-09T22:23:26.000Z',
      ownerId: 1,
      themeId: 5,
      theme: {
        id: 5,
        name: 'city',
        header_img_path:
          'https://foodfriendapp.s3.us-east-2.amazonaws.com/paths/headerImgPath/city.png',
        footer_img_path:
          'https://foodfriendapp.s3.us-east-2.amazonaws.com/paths/footerImgPath/city.png',
        button_img_path:
          'https://foodfriendapp.s3.us-east-2.amazonaws.com/paths/buttonImgPath/city.png',
      },
      nutrients: [{id: 3}, {id: 12}, {id: 13}],
    };
    const displayName = path.name.split(' ')[0];
    const nutrients = this.getNutrients(path.nutrients);
    console.log(nutrients);

    return (
      <>
        <FFStatusBar
          barStyle={'dark-content'}
          backgroundColorStyle={styles.statusBarBackgroundColor}
        />
        <ScrollView style={styles.rectangle}>
          <Image
            style={styles.headerImg}
            source={{
              uri: path.theme.header_img_path,
            }}
          />
          <Text style={styles.title}>{displayName}</Text>
          <View style={styles.line} />
          {displayDescription ? (
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
            <View style={styles.blueLine} />
          </View>
          {this.renderNote(path)}
          <Image
            style={styles.footerImg}
            source={{
              uri: path.theme.footer_img_path,
            }}
          />
          <View style={styles.submitButton}>
            <FFWideButton
              label={'Choose This Path'}
              textStyle={styles.submitButtonText}
              onClick={() => {}}
            />
          </View>
          <View style={styles.selectDifferentPathContainer}>
            <Text style={styles.grayText}>
              Looking for something different?
            </Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => {
                  /*this.props.navigation.navigate('Select Path')*/ return;
                }}>
                <Text style={styles.orangeText}>select a different path</Text>
              </TouchableOpacity>
              <Text style={styles.grayText}>{' or '}</Text>
              <TouchableOpacity
                onPress={() => {
                  /*this.props.navigation.navigate('Customize Path')*/ return;
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
    marginTop: '2%',
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
    height: normalize(457),
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
  blueLine: {
    position: 'absolute',
    bottom: 0,
    borderBottomWidth: normalize(1),
    color: '#1a2955',
    width: '100%',
  },
  notesContainer: {
    width: '100%',
    height: normalize(250),
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
  nutrients: state.nutrients,
});

export default connect(mapStateToProps)(Path);
