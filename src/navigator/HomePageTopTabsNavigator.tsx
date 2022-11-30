import * as React from 'react';
import {RouterConst} from '../foundation/constant/RouterConst';
import {Platform} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useEffect} from 'react';
import TopicPageTopTabsNavigator from './TopicPageTopTabsNavigator';
import RecommendPageTopTabsNavigator from './RecommendPageTopTabsNavigator';

const Top = createMaterialTopTabNavigator();

export default function HomePageTopTabsNavigator({navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabLongPress', e => {
      navigation.navigate(RouterConst.Debug.DebugPage);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Top.Navigator
      screenOptions={{
        lazy: true, //屏幕懒加载
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: {
          height: 2,
          // backgroundColor: 'tomato',
        },
        tabBarStyle: {
          marginTop: Platform.OS === 'ios' ? 50 : 0,
          height: 50,
        },
      }}>
      <Top.Screen
        name={RouterConst.Navigators.RecommendPageTopTabsNavigator}
        component={RecommendPageTopTabsNavigator}
        options={{
          tabBarLabel: '推荐',
          title: 'Recommend',
        }}
      />
      <Top.Screen
        name={RouterConst.Navigators.TopicPageTopTabsNavigator}
        component={TopicPageTopTabsNavigator}
        options={{
          tabBarLabel: '专题',
          title: 'Topic',
        }}
      />
    </Top.Navigator>
  );
}
