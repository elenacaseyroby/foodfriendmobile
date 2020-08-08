import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class PathDetail extends React.Component {
  static propTypes = {
    path: propTypes.object,
  };
  render() {
    const path = this.props.route.params.path;
    console.log(`hey: ${this.props.navigation}`);
    return (
      <Path
        path={path}
        selectingPath={true}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  paths: state.paths,
});

export default connect(mapStateToProps)(PathDetail);