import React from 'react';
import {View} from 'react-native';
import StaticTextScreen from './common/StaticTextScreen';
import {connect} from 'react-redux';

class TermsAndConditions extends React.Component {
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
