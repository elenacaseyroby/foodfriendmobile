import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
import FFStatusBar from '../common/FFStatusBar';
import PathButton from './PathButton';
import PathHeader from '../common/PathHeader';
import BackArrow from '../common/BackArrow';
import OfflineNotificationBanner from '../common/OfflineNoticeBanner';
import SelectPathButton from '../common/SelectPathButton';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import BlueBottomElipse2 from '../common/BlueBottomElipse2';
import {TouchableOpacity} from 'react-native-gesture-handler';

class SelectPath extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
  };
  state = {
    selectedPath: null,
  };
  handleSelectPath = (path) => {
    this.setState({selectedPath: path});
  };
  renderPathButtons() {
    return this.props.paths.list.map((path) => {
      const selected =
        this.state.selectedPath && this.state.selectedPath.id === path.id;
      return (
        <PathButton
          key={path.id}
          path={path}
          style={styles.pathButton}
          navigation={this.props.navigation}
          selected={selected}
          onPress={this.handleSelectPath}
        />
      );
    });
  }
  render() {
    let navigation;
    try {
      navigation = this.props.route.params.navigation;
    } catch (error) {
      navigation = this.props.navigation;
    }
    const paths = this.props.paths.list;
    return (
      <>
        <FFStatusBar />
        {/*scrollIndicatorInsets setting prevents bug: https://github.com/facebook/react-native/issues/26610*/}
        <ScrollView scrollIndicatorInsets={{right: 1}}>
          <PathHeader style={styles.header} />
          <View style={styles.arrowContainer}>
            <BackArrow
              style={styles.backArrow}
              onPress={() => navigation.pop()}
            />
          </View>
          <Text style={[styles.h1, styles.textContainer]}>
            Choose a new path
          </Text>
          <Text style={[styles.h2, styles.textContainer]}>
            Choose a nutrient path that’s right for you.
          </Text>
          <Text style={[styles.h3, styles.textContainer]}>
            Tap the path name to select it. Tap the arrow to learn more.
          </Text>
          {this.renderPathButtons(paths)}
          <SelectPathButton
            style={styles.selectPathButton}
            path={this.state.selectedPath}
            navigation={this.props.navigation}
          />
          <Text style={styles.grayText}>Looking for something different?</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Customize Path');
            }}>
            <Text style={styles.orangeText}>Customize your path</Text>
          </TouchableOpacity>
          <BlueBottomElipse2 style={styles.elipse} />
        </ScrollView>
        <OfflineNotificationBanner />
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: '3%',
  },
  arrowContainer: {
    position: 'absolute',
    width: normalize(300),
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    marginTop: normalize(41),
  },
  textContainer: {
    width: normalize(300),
    alignSelf: 'center',
  },
  h1: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(30),
    color: '#555555',
  },
  h2: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#555555',
    marginBottom: '1%',
  },
  h3: {
    fontFamily: 'Cabin-Regular',
    fontSize: normalize(16),
    color: '#aaaaaa',
    marginBottom: '1%',
  },
  pathButton: {
    marginTop: '3%',
  },
  selectPathButton: {
    marginTop: '5%',
  },
  grayText: {
    marginTop: '3%',
    alignSelf: 'center',
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#b7b7b7',
  },
  orangeText: {
    alignSelf: 'center',
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#ed762c',
  },
  elipse: {
    marginTop: '3%',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
  paths: state.paths,
});

export default connect(mapStateToProps)(SelectPath);
