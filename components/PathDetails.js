import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class PathDetails extends React.Component {
  static propTypes = {
    path: propTypes.object,
  };
  render() {
    const path = this.props.route.params.path;
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

export default connect(mapStateToProps)(PathDetails);
