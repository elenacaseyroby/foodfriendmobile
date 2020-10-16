import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import Progress from './Progress';
import MyPath from './MyPath';
import FoodSection from './FoodSection';
import NavBar from './common/NavBar';
import AccountMenu from './AccountMenu';
import NutrientJournal from './NutrientJournal';
import OfflineNotificationBanner from './common/OfflineNotificationBanner';
import {normalize} from '../utils/deviceScaling';

class Dashboard extends React.Component {
  state = {
    activeScreen: 'progress',
    displayNutrientJournal: false,
  };
  updateActiveScreen = (screenName) => {
    if (screenName === 'journal') {
      this.setState({displayNutrientJournal: true});
    } else {
      this.setState({activeScreen: screenName});
    }
  };
  renderActiveScreen = () => {
    const {user} = this.props;
    // Had to add user&&user.id so that it won't start on the onboarding
    // slides when the user is already onboarded.
    const userHasNotOnboarded =
      user && user.id && !user.activePathId && !user.birthday;
    const userHasNotSelectedPath = user && user.id && !user.activePathId;
    if (userHasNotOnboarded) {
      return this.props.navigation.navigate('Onboarding Slides');
    }
    if (userHasNotSelectedPath) {
      return this.props.navigation.navigate('Select Path');
    }
    // do not allow user to access the following pages without selecting a path.
    if (this.state.activeScreen === 'progress')
      return <Progress navigation={this.props.navigation} />;
    if (this.state.activeScreen === 'food') return <FoodSection />;
    if (this.state.activeScreen === 'path')
      return <MyPath navigation={this.props.navigation} />;
    if (this.state.activeScreen === 'account')
      return <AccountMenu navigation={this.props.navigation} />;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        {this.renderActiveScreen()}
        <OfflineNotificationBanner style={styles.offlineBanner} />
        <NavBar
          updateActiveScreen={this.updateActiveScreen}
          activeScreen={this.state.activeScreen}
        />
        <NutrientJournal
          isVisible={this.state.displayNutrientJournal}
          onClose={() => this.setState({displayNutrientJournal: false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  offlineBanner: {
    height: normalize(50),
  },
  test: {
    alignSelf: 'center',
    marginTop: normalize(330),
  },
  rectangle: {
    position: 'relative',
    height: '100%',
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard);
