import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class PathDetail extends React.Component {
  static propTypes = {
    path: propTypes.object,
    showBackArrow: propTypes.bool,
  };
  render() {
    const path = this.props.route.params.path || this.props.path;
    const showBackArrow =
      this.props.route.params.showBackArrow || this.props.showBackArrow;
    return (
      <Path
        path={path}
        selectingPath={true}
        navigation={this.props.navigation}
        showBackArrow={showBackArrow}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  paths: state.paths,
});

export default connect(mapStateToProps)(PathDetail);
