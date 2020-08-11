import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchUser} from '../../redux/actions/userActionCreator';
import api from '../../services/api';
import {normalize} from '../../utils/deviceScaling';
import FFWideButton from '../common/FFWideButton';
import FFErrorMessage from '../forms/FFErrorMessage';
import propTypes from 'prop-types';

class SelectPathButton extends React.Component {
  static propTypes = {
    path: propTypes.object.isRequired,
    onClick: propTypes.func,
    style: propTypes.object,
  };
  state = {
    errorMessage: 'test error message',
  };
  handleSelectPath = async (path) => {
    const body = {
      activePathId: path.id,
    };
    const userRequest = await api.putUser(this.props.auth.userId, body);
    if (userRequest.status !== 200) {
      return this.setState({
        errorMessage:
          "Oops! Something's gone wrong. Please try selecting your path again.",
      });
    }
    // Update user state after updating activePathId.
    this.props.dispatch(fetchUser(this.props.auth.userId));
    //navigate to path page
    this.props.navigation.navigate('Dashboard');
  };
  renderErrorMessage() {
    if (!this.state.errorMessage) return;
    return (
      <View style={styles.errorMessage}>
        <FFErrorMessage errorMessage={this.state.errorMessage} />
      </View>
    );
  }
  render() {
    const {path} = this.props;
    return (
      <View style={this.props.style}>
        {this.state.errorMessage ? (
          <View style={styles.errorMessage}>
            <FFErrorMessage errorMessage={this.state.errorMessage} />
          </View>
        ) : (
          ''
        )}
        <FFWideButton
          label={'Choose this Path'}
          textStyle={styles.submitButtonText}
          onClick={() => this.handleSelectPath(path)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  errorMessage: {},
});
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(SelectPathButton);
