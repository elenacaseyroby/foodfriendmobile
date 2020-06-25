import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Text>Welcome, {this.props.user.first_name}!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {},
  rectangle: {
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
