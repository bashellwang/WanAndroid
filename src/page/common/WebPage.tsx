import * as React from 'react';
import WebView from 'react-native-webview';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {BackHandler} from 'react-native';

export default function WebPage({route, navigation}) {
  /**
   * https://reactnavigation.org/docs/params#what-should-be-in-params
   * 直接将整个对象传过来是 anti-pattern 的，不推荐做法
   */
  const {title, url} = route.params;

  useEffect(() => {
    // 设置标题
    navigation.setOptions({title: title});
  }, [navigation, title]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        navigation.goBack();
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <WebView
      source={{
        uri: url,
        method: 'GET',
      }}
    />
  );
}
