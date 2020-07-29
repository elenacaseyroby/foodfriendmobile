import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import FFStatusBar from './common/FFStatusBar';
import {connect} from 'react-redux';
import {normalize} from '../utils/deviceScaling';
import propTypes from 'prop-types';

class Path extends React.Component {
  static propTypes = {
    selectedPath: propTypes.object,
  };
  componentDidMount() {}
  render() {
    // const {selectedPath} = this.props.route.params;
    // const path = selectedPath || this.props.path;
    // const displayDescription = selectedPath ? true : false;
    // test
    const displayDescription = true;
    const path = {
      id: 1,
      name: 'Mood',
      description:
        'This path is designed for those seeking a natural avenue towards emotional wellbeing. By tracking active nutrients like Vitamin B6, Vitamin D, and Magnesium, this path will help you improve your mood with food!',
      notes: '',
      notesSources: '',
      createdAt: '2020-06-09T22:23:26.000Z',
      updatedAt: '2020-06-09T22:23:26.000Z',
      ownerId: 1,
      themeId: 2,
      theme: {
        id: 2,
        name: 'beach',
        header_img_path:
          'https://foodfriendapp.s3.us-east-2.amazonaws.com/paths/headerImgPath/beach.png',
        button_img_path:
          'https://foodfriendapp.s3.us-east-2.amazonaws.com/paths/buttonImgPath/beach.png',
      },
    };
    console.log(path.theme.header_img_path);
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
          <Text style={styles.title}>{path.name}</Text>
          <View style={styles.line} />
          {displayDescription ? (
            <Text style={styles.description}>{path.description}</Text>
          ) : (
            <></>
          )}
          <View style={styles.nutrientsContainer}></View>
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
    width: '100%',
    height: normalize(457),
    backgroundColor: '#36549a',
  },
  line: {
    marginTop: '1%',
    borderBottomWidth: normalize(0.5),
    color: '#d9d9d9',
    width: '100%',
    opacity: 0.25,
  },
  rectangle: {
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Path);
