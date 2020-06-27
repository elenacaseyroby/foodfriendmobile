import React from 'react';
import {View, TextInput, Text, Image, StyleSheet} from 'react-native';
import plantMascot from '../assets/images/plant-mascot-blue.png';
import Elipse from '../assets/images/bottom-elipse-blue.svg';
import SubmitButton from './common/SubmitButton';

class UpdatePassword extends React.Component {
  state = {
    password: null,
  };
  handlePassword = (password) => {
    this.setState({password: password});
  };
  handleSubmit = () => {};
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.updatePasswordContainer}>
          <Text style={styles.updateText}>Update Password</Text>
          <Image source={plantMascot} />
        </View>
        <TextInput
          style={styles.formText}
          secureTextEntry={true}
          placeholder="New Password (8+ characters)"
          onChangeText={this.handlePassword}
        />
        <View style={styles.formEmailBox} />
        <View style={styles.button}>
          <SubmitButton onClick={this.handleSubmit} />
        </View>
        <Elipse style={styles.elipse} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updatePasswordContainer: {
    marginBottom: 15,
    marginTop: 40,
    marginLeft: 33,
    marginRight: 33,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 120,
  },
  updateText: {
    marginTop: 25,
    color: '#555555',
    width: 140,
    height: 75,
    fontFamily: 'Cabin-SemiBold',
    fontSize: 30,
  },
  formText: {
    marginTop: 35,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    color: '#aaaaaa',
    width: 310,
    alignSelf: 'center',
  },
  formEmailBox: {
    marginBottom: 30,
    borderBottomWidth: 0.5,
    width: 310,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  elipse: {
    position: 'absolute',
    bottom: 0,
  },
  rectangle: {
    backgroundColor: '#ffffff',
    minHeight: '100%',
    flex: 1,
  },
});

export default UpdatePassword;
