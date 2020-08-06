import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class Progress extends React.Component {
  render() {
    return (
      <View style={styles.rectangle}>
        <Text>Welcome, {this.props.user.firstName}!</Text>
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
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(Progress);
