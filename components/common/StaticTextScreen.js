import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';
import BackArrow from './BackArrow';

class StaticTextScreen extends React.Component {
  static propTypes = {
    title: propTypes.string.isRequired,
    text: propTypes.string,
    error: propTypes.string,
    loading: propTypes.bool,
    navigation: propTypes.object.isRequired,
  };
  renderError = () => {
    if (!this.props.error) return;
    return (
      <Text>Oops! There was an error loading our terms and conditions.</Text>
    );
  };
  renderLoading = () => {
    if (!this.props.loading) return;
    return <Text>Loading...</Text>;
  };
  renderText = () => {
    if (!this.props.text) return;
    return <Text style={styles.body}>{this.props.text}</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        <View style={styles.header}>
          <View style={styles.backArrow}>
            <BackArrow onPress={() => this.props.navigation.pop()} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
        <ScrollView>
          {this.renderError()}
          {this.renderLoading()}
          {this.renderText()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minHeight: 90,
    maxHeight: 90,
    borderBottomWidth: 0.5,
    alignItems: 'flex-end',
    paddingBottom: 12,
  },
  backArrow: {
    maxHeight: 35,
    maxWidth: 35,
  },
  titleContainer: {
    maxHeight: 40,
    minWidth: 260,
  },
  title: {
    fontSize: 25,
    color: '#555555',
    fontFamily: 'Cabin-SemiBold',
  },
  body: {
    marginTop: 40,
    marginRight: 33,
    marginLeft: 33,
    fontSize: 16,
    fontFamily: 'Cabin-Regular',
    color: '#555555',
  },
  rectangle: {
    backgroundColor: '#FFFFFF',
    minHeight: '100%',
    flex: 1,
  },
});

export default StaticTextScreen;
