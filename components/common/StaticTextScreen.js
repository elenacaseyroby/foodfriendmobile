import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {normalize} from '../../utils/deviceScaling';
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
          <View style={styles.headerContent}>
            <BackArrow onPress={() => this.props.navigation.pop()} />
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
        <ScrollView style={styles.bodyContainer}>
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
    marginTop: normalize(20, 20),
    height: normalize(70),
    borderBottomWidth: normalize(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    width: normalize(310),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: normalize(250),
    fontSize: normalize(25),
    color: '#555555',
    fontFamily: 'Cabin-SemiBold',
    alignSelf: 'flex-start',
    // borderColor: '#aaaaaa',
    // borderWidth: 0.5,
  },
  bodyContainer: {
    marginTop: '5%',
    width: normalize(310),
    alignSelf: 'center',
  },
  body: {
    fontSize: normalize(16),
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
