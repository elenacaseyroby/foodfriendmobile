import React from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';
import {normalize} from '../../utils/sizeScaling';
import propTypes from 'prop-types';

class FFDateBox extends React.Component {
  static propTypes = {
    onChangeText: propTypes.func.isRequired,
    label: propTypes.string.isRequired,
  };
  state = {
    MM: 'MM',
    DD: 'DD',
    YYYY: 'YYYY',
  };
  handleOnChange = () => {
    const date = `${this.state.MM}/${this.state.DD}/${this.state.YYYY}`;
    this.props.onChangeText(date);
  };
  handleChangeMonth = (MM) => {
    console.log('change month');
    this.setState({MM: MM}, this.handleOnChange);
  };
  handleChangeDay = (DD) => {
    this.setState({DD: DD}, this.handleOnChange);
  };
  handleChangeYear = (YYYY) => {
    this.setState({YYYY: YYYY}, this.handleOnChange);
  };
  render() {
    return (
      <>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.formText}
            placeholder="MM"
            onChangeText={this.handleChangeMonth}
            maxLength={2}
          />
          <Text style={styles.formText}>/</Text>
          <TextInput
            style={styles.formText}
            placeholder="DD"
            onChangeText={this.handleChangeDay}
            maxLength={2}
          />
          <Text style={styles.formText}>/</Text>
          <TextInput
            style={styles.formText}
            placeholder="YYYY"
            onChangeText={this.handleChangeYear}
            maxLength={4}
          />
        </View>
        <View style={styles.formBox} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: 'row',
  },
  formText: {
    marginTop: normalize(15),
    marginBottom: normalize(8),
    fontSize: normalize(16),
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  formBox: {
    marginBottom: normalize(15),
    borderBottomWidth: normalize(0.5),
    color: '#555555',
    width: normalize(310),
  },
});

export default FFDateBox;
