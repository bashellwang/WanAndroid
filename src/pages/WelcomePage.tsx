import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Button, StyleSheet, Text, View} from 'react-native';
import Constants from '../foundation/Constants';

interface IState {
  timer: number;
}

export default class WelcomePage extends Component<IState> {
  private navigation: any;

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  state = {
    timer: 0,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome </Text>
        <Button
          title="Go Home"
          onPress={() =>
            this.navigation.navigate(
              Constants.Navigators.AppBottomTabsNavigator,
            )
          }
        />
      </View>
    );
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    this.state.timer = window.setTimeout(() => {
      console.log('1秒后关闭闪屏');
      SplashScreen.hide();
    }, 100);
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
