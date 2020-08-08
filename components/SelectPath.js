import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {normalize} from '../utils/deviceScaling';
import FFStatusBar from './common/FFStatusBar';
import PathHeader from './common/PathHeader';
import BackArrow from './common/BackArrow';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class SelectPath extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
  };
  render() {
    let navigation;
    try {
      navigation = this.props.route.params.navigation;
    } catch (error) {
      navigation = this.props.navigation;
    }
    return (
      <>
        <FFStatusBar />
        {/*scrollIndicatorInsets setting prevents bug: https://github.com/facebook/react-native/issues/26610*/}
        <ScrollView scrollIndicatorInsets={{right: 1}}>
          <PathHeader />
          <View style={styles.arrowContainer}>
            <BackArrow
              style={styles.backArrow}
              onPress={() => navigation.pop()}
            />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    width: normalize(325),
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  backArrow: {
    marginTop: normalize(41),
  },
});

const mapStateToProps = (state) => ({
  paths: state.paths,
});

export default connect(mapStateToProps)(SelectPath);
