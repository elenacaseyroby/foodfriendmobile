import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import LoadingScreen from './LoadingScreen';
import propTypes from 'prop-types';

class MyPath extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
  };
  getUserPath = () => {
    const customPath = this.props.customPath;
    const user = this.props.user;
    if (customPath && user && customPath.id === user.activePathId) {
      return customPath;
    }
    if (!this.props.paths.list) return;
    const activePathId = this.props.user.activePathId;
    let userPath;
    this.props.paths.list.map((path) => {
      if (activePathId === path.id) {
        userPath = path;
      }
    });
    return userPath;
  };
  render() {
    const path = this.getUserPath();
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
  user: state.user,
  paths: state.paths,
  customPath: state.customPath,
});

export default connect(mapStateToProps)(MyPath);
