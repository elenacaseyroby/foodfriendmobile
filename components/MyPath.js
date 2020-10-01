import React from 'react';
import Path from './Path';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Loader from './common/Loader';
import FFStatusBar from './common/FFStatusBar';
import PathHeader from './common/PathHeader';
import propTypes from 'prop-types';

class MyPath extends React.Component {
  static propTypes = {
    navigation: propTypes.object,
  };
  render() {
    const {user} = this.props;
    if (user && !user.id) {
      return (
        <>
          <FFStatusBar />
          <View style={styles.container}>
            <PathHeader />
            <View style={styles.loader}>
              <Loader />
            </View>
          </View>
        </>
      );
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
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  loader: {
    width: '100%',
    height: '45%',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(MyPath);
