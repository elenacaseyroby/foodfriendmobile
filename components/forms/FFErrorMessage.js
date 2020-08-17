import React from 'react';
import {Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';
import {normalize} from '../../utils/deviceScaling';

class FFErrorMessage extends React.Component {
  static propTypes = {
    errorMessage: propTypes.string,
    textStyle: propTypes.object,
  };
  renderError = () => {
    if (!this.props.errorMessage) return;
    return (
      <Text style={[styles.errorText, this.props.textStyle]}>
        {this.props.errorMessage}
      </Text>
    );
  };
  render() {
    return <>{this.renderError()}</>;
  }
}

const styles = StyleSheet.create({
  errorText: {
    marginBottom: '3%',
    fontSize: normalize(14),
    fontFamily: 'Cabin-Regular',
    color: '#ea1313',
  },
});

export default FFErrorMessage;
