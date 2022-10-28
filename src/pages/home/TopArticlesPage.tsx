import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {API_URLS} from '../../foundation/Apis';
import HttpUtil from '../../utils/HttpUtil';
import StorageUtil from '../../utils/StorageUtil';

export default function TopArticlesPage() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TopArticlesPage!</Text>
      <Button
        title="获取置顶文章"
        onPress={() => {
          HttpUtil.sendGet(API_URLS.TOP_ARTICLE_LIST).then(
            function (content) {
              let xx = JSON.stringify(content);
              console.log('content: ' + xx);

              StorageUtil.saveValue('home_articles', xx);
            },
            function (error) {
              console.log('error: ' + error);
            },
          );
        }}
      />
      <Button
        title="获取置顶文章"
        onPress={async () => {
          // let result = StorageUtil.getValue('home_articles', (err, cote) => {
          //   console.log('call---error: ' + err);
          //   console.log('call---result: ' + cote);
          // });
          let result = await StorageUtil.getValue(
            'home_articles',
            (err, cote) => {
              console.log('call---error: ' + err);
              console.log('call---result: ' + cote);
            },
          );
          console.log('result: ' + JSON.stringify(result));
        }}
      />
    </View>
  );
}
