import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet, Text, View} from 'react-native';

interface IState {
  timer: number;
}

export default class WelcomePage extends Component<IState> {
  state = {
    timer: 0,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome </Text>
      </View>
    );
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    this.state.timer = window.setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    console.log('2秒后关闭闪屏');
  }

  componentWillUnmount() {
    this.state.timer && window.clearTimeout(this.state.timer);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
