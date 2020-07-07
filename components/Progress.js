import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../redux/actions/userActionCreator';

class Progress extends React.Component {
  componentDidMount() {
    // Fetch user data if not yet in state.
    if (
      this.props.user &&
      !this.props.user.id &&
      !this.props.user.loading &&
      !this.props.user.error
    ) {
      this.props.dispatch(fetchUser(this.props.auth.userId));
    }
  }
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
