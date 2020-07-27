import React from 'react';
import {StyleSheet, Text} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
import SlideThree from './SlideThree';
import SlideFour from './SlideFour';
import SlideFive from './SlideFive';

class OnboardingSlides extends React.Component {
  state = {
    activeSlideNumber: 1,
  };
  onSwipeLeft(gestureState) {
    if (this.state.activeSlideNumber > 4) return;
    this.setState({activeSlideNumber: this.state.activeSlideNumber + 1});
  }

  onSwipeRight(gestureState) {
    if (this.state.activeSlideNumber < 2) return;
    this.setState({activeSlideNumber: this.state.activeSlideNumber - 1});
  }
  onSwipe(gestureName, gestureState) {}
  renderActiveSlide = () => {
    if (this.state.activeSlideNumber === 1) return <SlideOne />;
    if (this.state.activeSlideNumber === 2) return <SlideTwo />;
    if (this.state.activeSlideNumber === 3) return <SlideThree />;
    if (this.state.activeSlideNumber === 4) return <SlideFour />;
    if (this.state.activeSlideNumber === 5)
      return <SlideFive navigate={this.props.navigation.navigate} />;
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={styles.rectangle}>
        {this.renderActiveSlide()}
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  rectangle: {
    height: '100%',
    flex: 1,
  },
});

export default OnboardingSlides;
