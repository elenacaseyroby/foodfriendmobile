import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/sizeScaling';
import propTypes from 'prop-types';

class FFTextBox extends React.Component {
  static propTypes = {
    onChangeText: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
    maxLength: propTypes.number.isRequired,
    autoCapitalize: propTypes.string.isRequired,
    autoCompleteType: propTypes.string,
    textContentType: propTypes.string,
    secureTextEntry: propTypes.bool,
  };
  render() {
    return (
      <>
        <TextInput
          style={styles.formText}
          placeholder={this.props.placeholder}
          autoCapitalize={this.props.autoCapitalize}
          onChangeText={this.props.onChangeText}
          maxLength={this.props.maxLength}
          secureTextEntry={
            this.props.secureTextEntry ? this.props.secureTextEntry : false
          }
          autoCompleteType={
            this.props.autoCompleteType ? this.props.autoCompleteType : 'off'
          }
          textContentType={
            this.props.textContentType ? this.props.textContentType : 'none'
          }
        />
        <View style={styles.formBox} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  formText: {
    marginTop: '5%',
    marginBottom: '3%',
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: normalize(310),
  },
  formBox: {
    marginBottom: '5%',
    borderBottomWidth: normalize(0.5),
    color: '#aaaaaa',
    width: normalize(310),
  },
});

export default FFTextBox;
