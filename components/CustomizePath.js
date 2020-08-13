import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import FFStatusBar from './common/FFStatusBar';
import NutrientButton from './common/NutrientButton';
import BackArrow from './common/BackArrow';
import PathHeader from './common/PathHeader';
import BlueBottomElipse2 from './common/BlueBottomElipse2';
import FFNarrowButton from './common/FFNarrowButton';
import {connect} from 'react-redux';
import {normalize} from '../utils/deviceScaling';
import {orderNutrientsByTheme} from '../utils/nutrients';
import propTypes from 'prop-types';

class CustomizePath extends React.Component {
  static propTypes = {
    errorMessage: '',
  };
  renderNutrients = (nutrients) => {
    const orderedNutrients = orderNutrientsByTheme(nutrients);
    return (
      <View style={styles.nutrientsContainer}>
        {orderedNutrients.map((nutrient) => {
          return (
            <NutrientButton
              key={nutrient.id}
              nutrient={nutrient}
              style={styles.nutrientButton}
              navigation={this.props.navigation}
              displayAddNutrientButton={true}
            />
          );
        })}
      </View>
    );
  };
  render() {
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
          </View>
          <Text style={styles.title}></Text>
          <View style={styles.line} />
          {this.renderNutrients(nutrients)}

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
  description: {
    marginTop: '4%',
    marginBottom: '4%',
    width: normalize(340),
    alignSelf: 'center',
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#555555',
  },
  line: {
    marginTop: '1%',
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
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
  errorMessage: {
    marginTop: '7%',
    alignItems: 'center',
  },
  formContainer: {
    alignSelf: 'center',
    width: normalize(304),
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
    bottom: normalize(60),
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
  nutrients: state.nutrients,
});

export default connect(mapStateToProps)(CustomizePath);
