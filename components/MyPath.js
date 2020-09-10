import React from 'react';
import Path from './Path';
import {connect} from 'react-redux';
import LoadingScreen from './LoadingScreen';
import propTypes from 'prop-types';

class MyPath extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
  };
  render() {
    const {user} = this.props;
    if (!user.id) {
      return <LoadingScreen />;
    }
    const {activePath} = user;
    return (
      <Path
        path={activePath}
        selectingPath={false}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(MyPath);
