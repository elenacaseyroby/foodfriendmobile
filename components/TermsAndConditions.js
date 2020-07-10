import React from 'react';
import {View} from 'react-native';
import StaticTextScreen from './common/StaticTextScreen';
import {connect} from 'react-redux';
import {fetchTermsAndConditions} from '../redux/actions/termsAndConditionsActionCreator';

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
  render() {
    return (
      <View>
        {this.props.termsAndConditions ? (
          <StaticTextScreen
            title={'Terms And Conditions'}
            text={this.props.termsAndConditions.text}
            error={this.props.termsAndConditions.error}
            loading={this.props.termsAndConditions.loading}
            navigation={this.props.navigation}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  termsAndConditions: state.termsAndConditions,
});

export default connect(mapStateToProps)(TermsAndConditions);
