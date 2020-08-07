import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Progress from './Progress';
import MyPath from './MyPath';

class Dashboard extends React.Component {
  state = {
    activeScreen: 'progress',
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
      <>
        {/*add OfflineNotification */}
        {this.renderActiveScreen()}
        {/*add NavBar-- pass through activeScreen prop */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  rectangle: {
    height: '100%',
    flex: 1,
  },
});

export default Dashboard;