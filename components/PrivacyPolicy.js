import React from 'react';
import {View} from 'react-native';
import StaticTextScreen from './common/StaticTextScreen';
import {connect} from 'react-redux';
import {fetchPrivacyPolicy} from '../redux/actions/privacyPolicyActionCreator';

class PrivacyPolicy extends React.Component {
  componentDidMount() {
    // Fetch data if not yet in state.
    if (
      this.props.privacyPolicy &&
      !this.props.privacyPolicy.id &&
      !this.props.privacyPolicy.loading &&
      !this.props.privacyPolicy.error
    ) {
      this.props.dispatch(fetchPrivacyPolicy());
    }
  }
  render() {
    return (
      <View>
        {this.props.privacyPolicy ? (
          <StaticTextScreen
            title={'Privacy Policy'}
            text={this.props.privacyPolicy.text}
            error={this.props.privacyPolicy.error}
            loading={this.props.privacyPolicy.loading}
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
  privacyPolicy: state.privacyPolicy,
});

export default connect(mapStateToProps)(PrivacyPolicy);
