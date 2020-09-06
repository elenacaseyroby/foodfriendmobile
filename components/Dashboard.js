import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import Progress from './Progress';
import MyPath from './MyPath';
import NavBar from './common/NavBar';
import AccountMenu from './AccountMenu';
import NutrientJournal from './NutrientJournal';
import OfflineNotificationBanner from './common/OfflineNoticeBanner';
import {normalize} from '../utils/deviceScaling';

class Dashboard extends React.Component {
  state = {
    activeScreen: 'path',
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
    const userNotHasOnboarded =
      !this.props.user.activePathId && !this.props.user.birthday;
    const userHasNotSelectedPath = !this.props.user.activePathId;
    if (userNotHasOnboarded) {
      return this.props.navigation.navigate('Onboarding Slides');
    }
    if (userHasNotSelectedPath) {
      return this.props.navigation.navigate('Select Path');
    }
    if (this.state.activeScreen === 'progress')
      return <Progress navigation={this.props.navigation} />;
    if (this.state.activeScreen === 'food')
      return <Text style={styles.test}>Food and Recipes</Text>;
    if (this.state.activeScreen === 'path')
      return <MyPath navigation={this.props.navigation} />;
    if (this.state.activeScreen === 'account')
      return <AccountMenu navigation={this.props.navigation} />;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        {this.renderActiveScreen()}
        <OfflineNotificationBanner />
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
