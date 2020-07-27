import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

class SurveyLanding extends React.Component {
  static propTypes = {
    path: propTypes.object,
  };
  componentDidMount() {}
  render() {
    const {path} = this.props.route.params;
    return (
      <View style={styles.rectangle}>
        <Text>You've been matched with the following path: {path.name}</Text>
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
});

export default connect(mapStateToProps)(SurveyLanding);
