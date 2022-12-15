import * as React from 'react';
import WebView from 'react-native-webview';
import {useEffect} from 'react';

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

  return (
    <WebView
      source={{
        uri: url,
        method: 'GET',
      }}
    />
  );
}
