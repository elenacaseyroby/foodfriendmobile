import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import propTypes from 'prop-types';
import BackArrow from '../../assets/images/back-arrow.svg';

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
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => this.props.navigation.pop()}>
            <BackArrow />
          </TouchableOpacity>
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
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: 90,
    maxHeight: 90,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  backArrow: {
    marginTop: 39,
    marginLeft: 33,
  },
  titleContainer: {
    marginLeft: 35,
    width: 255,
    justifyContent: 'center',
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
