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
    path: propTypes.object,
    style: propTypes.object,
    navigation: propTypes.object.isRequired,
  };
  state = {
    errorMessage: null,
  };
  handleSelectPath = async (path) => {
    if (!path) {
      return this.setState({
        errorMessage:
          'Please select a path before clicking "Choose this Path."',
      });
    }
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
    //navigate to dashboard
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
          <></>
        )}
        <FFWideButton
          style={styles.button}
          label={'Choose this Path'}
          textStyle={styles.textStyle}
          onClick={() => this.handleSelectPath(path)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },
  textStyle: {
    fontFamily: 'Bellota-Bold',
    fontSize: normalize(29),
    color: '#ffffff',
  },
  errorMessage: {
    alignSelf: 'center',
    width: normalize(320),
  },
});
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps)(SelectPathButton);
