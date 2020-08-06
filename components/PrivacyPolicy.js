import React from 'react';
import {View} from 'react-native';
import StaticTextScreen from './common/StaticTextScreen';
import {connect} from 'react-redux';

class PrivacyPolicy extends React.Component {
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
