import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import FFStatusBar from './common/FFStatusBar';
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
        <ScrollView scrollIndicatorInsets={{right: 1}}></ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
  paths: state.paths,
});

export default connect(mapStateToProps)(SelectPath);
