import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Progress from './Progress';
import MyPath from './MyPath';
import OfflineNotificationBanner from './common/OfflineNoticeBanner';

class Dashboard extends React.Component {
  state = {
    activeScreen: 'path',
  };
  renderActiveScreen = () => {
    if (this.state.activeScreen === 'progress') return <Progress />;
    if (this.state.activeScreen === 'food')
      return <Text>Food and Recipes</Text>;
    if (this.state.activeScreen === 'path') return <MyPath />;
    if (this.state.activeScreen === 'journal') return <Text>Add Food</Text>;
    if (this.state.activeScreen === 'account') return <Text>Account</Text>;
  };
  render() {
    return (
      <View style={styles.rectangle}>
        {this.renderActiveScreen()}
        <OfflineNotificationBanner />
        {/*add NavBar-- pass through activeScreen prop */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    height: '100%',
    flex: 1,
  },
});

export default Dashboard;
