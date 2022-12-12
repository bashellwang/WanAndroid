import * as React from 'react';
import TopicPageTopTabsNavigator from '../../navigator/TopicPageTopTabsNavigator';
import {FC} from 'react';
import {Text, View} from 'react-native';
import GeneralFlatList from '../../components/GeneralFlatList';

export default function TopicPage(): FC<any, any> {
  const Tab = TopicPageTopTabsNavigator;
  return (
    <View style={{flex: 1}}>
      <Tab />
    </View>
  );
}
