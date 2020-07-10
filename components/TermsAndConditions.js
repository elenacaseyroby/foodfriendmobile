import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchTermsAndConditions} from '../redux/actions/termsAndConditionsActionCreator';
import BackArrow from '../assets/images/back-arrow.svg';

class TermsAndConditions extends React.Component {
  componentDidMount() {
    // Fetch data if not yet in state.
    if (
      this.props.termsAndConditions &&
      !this.props.termsAndConditions.id &&
      !this.props.termsAndConditions.loading &&
      !this.props.termsAndConditions.error
    ) {
      this.props.dispatch(fetchTermsAndConditions());
    }
  }
  renderError = () => {
    if (!this.props.termsAndConditions.error) return;
    return (
      <Text>Oops! There was an error loading our terms and conditions.</Text>
    );
  };
  renderLoading = () => {
    if (!this.props.termsAndConditions.loading) return;
    return <Text>Loading...</Text>;
  };
  renderText = () => {
    if (!this.props.termsAndConditions.text) return;
    return (
      <Text style={styles.body}>{this.props.termsAndConditions.text}</Text>
    );
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
          <Text style={styles.title}>Terms And Conditions</Text>
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
  backArrow: {
    marginTop: 45,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minHeight: 90,
    maxHeight: 90,
    borderBottomWidth: 0.5,
  },
  title: {
    marginTop: 32,
    fontSize: 30,
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

const mapStateToProps = (state) => ({
  termsAndConditions: state.termsAndConditions,
});

export default connect(mapStateToProps)(TermsAndConditions);
