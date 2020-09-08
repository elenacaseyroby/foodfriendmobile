import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import {getUserPath} from '../utils/users';
import LoadingScreen from './LoadingScreen';
import propTypes from 'prop-types';

class MyPath extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
  };
  render() {
    const {customPath, paths, user} = this.props;
    const path = getUserPath(user, customPath, paths);
    if (!path) {
      return <LoadingScreen />;
    }
    return (
      <Path
        path={path}
        selectingPath={false}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  customPath: state.customPath,
  paths: state.paths,
  user: state.user,
});

export default connect(mapStateToProps)(MyPath);
