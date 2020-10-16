import React from 'react';
import {StyleSheet} from 'react-native';
import Path from './Path';
import {connect} from 'react-redux';
import OfflineNotificationBanner from './common/OfflineNotificationBanner';
import {normalize} from '../utils/deviceScaling';
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
      <>
        <Path
          path={path}
          selectingPath={true}
          navigation={this.props.navigation}
          showBackArrow={showBackArrow}
        />
        <OfflineNotificationBanner style={styles.offlineBanner} />
      </>
    );
  }
}
const styles = StyleSheet.create({
  offlineBanner: {
    position: 'absolute',
    bottom: normalize(5),
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PathDetail);
