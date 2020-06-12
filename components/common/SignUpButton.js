import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

class SignUpButton extends React.Component {
  static propTypes = {
    onClick: propTypes.func.isRequired,
  };
  renderLogoComponent = () => {
    if (!this.props.logoComponent) return;
    return this.props.logoComponent;
  };
  render() {
    return (
      <TouchableOpacity onPress={this.props.onClick} style={styles.button}>
        {this.renderLogoComponent}
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Cabin-Regular',
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    width: 309,
    height: 57,
    paddingTop: 17,
    borderRadius: 28.5,
    // boxShadow: '0 1px 1px 0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: '#5f7ec6',
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default SignUpButton;
