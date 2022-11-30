import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {RouterConst} from '../foundation/constant/RouterConst';
import LogUtil from '../foundation/util/LogUtil';
interface IState {
  timer: number;
}

const TAG = 'WelcomePage';

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
        {/*<Image*/}
        {/*  // style={{flex: 1}}*/}
        {/*  resizeMode="cover"*/}
        {/*  source={require('../../android/app/src/main/res/drawable/launch_screen.png')}*/}
        {/*  style={{width: 400, height: 240}}*/}
        {/*/>*/}
      </View>
    );
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    this.state.timer = window.setTimeout(() => {
      LogUtil.debug({tag: TAG}, '1秒后关闭闪屏');
      SplashScreen.hide();
      this.navigation.navigate(RouterConst.Pages.HomePage);
    }, 0);
  }

  componentWillUnmount() {
    this.state.timer && window.clearTimeout(this.state.timer);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
