import * as React from 'react';
import WebView from 'react-native-webview';

export default function ArticleDetailPage({route, navigation}) {
  /**
   * https://reactnavigation.org/docs/params#what-should-be-in-params
   * 直接将整个对象传过来是 anti-pattern 的，不推荐做法
   */
  // const {article} = route.params;
  const {title, url} = route.params;

  // 设置标题
  navigation.setOptions({title: title});
  return (
    <WebView
      source={{
        uri: url,
        method: 'GET',
      }}
    />
  );
}
