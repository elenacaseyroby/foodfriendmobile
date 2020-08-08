import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import LoadingScreen from './LoadingScreen';

class MyPath extends React.Component {
  getUserPath = () => {
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
});

export default connect(mapStateToProps)(MyPath);
