import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import LoadingScreen from './LoadingScreen';
import OfflineNoticeScreen from './OfflineNoticeScreen';

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
    const noConnection = false;
    if (noConnection) {
      return <OfflineNoticeScreen />;
    } else if (!path) {
      return <LoadingScreen />;
    }
    return <Path path={path} selectingPath={false} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  paths: state.paths,
});

export default connect(mapStateToProps)(MyPath);
