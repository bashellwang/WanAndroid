import * as React from 'react';
import {View} from 'react-native';
import DynamicTopTabNavigator from '../../navigator/DynamicTopTabNavigator';
import TopArticlesPage from './TopArticlesPage';
import DailyQuestionPage from './DailyQuestionPage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouterConst} from '../../foundation/constant/RouterConst';

const Top = createMaterialTopTabNavigator();
const TAB_PAGE_LIST = [
  <Top.Screen
    name={RouterConst.Pages.TopArticlesPage}
    component={TopArticlesPage}
    options={{
      tabBarLabel: '热门博文',
    }}
  />,
  <Top.Screen
    name={RouterConst.Pages.DailyQuestionPage}
    component={DailyQuestionPage}
    options={{
      tabBarLabel: '每日一问',
    }}
  />,
];

const screenOptions = {
  lazy: false, //屏幕懒加载
  // 当一屏显示不下时，需要左右进行滑动，当它为true时，需要设置 tabBarItemStyle 做样式调整
  tabBarScrollEnabled: false,
};

export default function RecommendPage() {
  return (
    <View style={{flex: 1}}>
      <DynamicTopTabNavigator
        topScreenList={TAB_PAGE_LIST}
        screenOptions={screenOptions}
      />
    </View>
  );
}
