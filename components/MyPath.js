import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';

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
      // path loading page
      return <></>;
    }
    return <Path path={path} selectingPath={false} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  paths: state.paths,
});

export default connect(mapStateToProps)(MyPath);
