import * as React from 'react';
import {RouterConst} from '../foundation/constant/RouterConst';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopArticlesPage from '../page/home/TopArticlesPage';
import DailyQuestionPage from '../page/home/DailyQuestionPage';

const Top = createMaterialTopTabNavigator();

/**
 * @deprecated
 * 路由跳转不再单独一个文件定义，直接放到推荐页里实现
 * 参考：RecommendPage
 */
export default function RecommendPageTopTabsNavigator() {
  return (
    <Top.Navigator
      screenOptions={{
        lazy: true, //屏幕懒加载

        // tab 中文本样式
        tabBarLabelStyle: {
          fontsize: 20,
          fontWeight: 'bold',
          // color: 'red',
          // backgroundColor: 'green',
        },
        // tab 中下滑指示线样式
        tabBarIndicatorStyle: {
          height: 2,
          width: 40,
          left: 75,
          // backgroundColor: 'blue',
        },
        // ----------下面三个样式优先级逐渐升高-------------
        // tabbar 布局样式
        tabBarStyle: {
          // backgroundColor: 'orange',
          // justifyContent: true, //默认为false
        },
        // tab 中内容所在布局容器的样式
        tabBarContentContainerStyle: {
          // backgroundColor: 'purple',
          // justifyContent: true, //默认为true
        },
        tabBarItemStyle: {
          // backgroundColor: 'black',
          // justifyContent: true, //默认为true
        },
        // ----------上面三个样式优先级逐渐升高-------------
      }}>
      <Top.Screen
        name={RouterConst.Pages.TopArticlesPage}
        component={TopArticlesPage}
        options={{
          tabBarLabel: '热门博文',
        }}
      />
      <Top.Screen
        name={RouterConst.Pages.DailyQuestionPage}
        component={DailyQuestionPage}
        options={{
          tabBarLabel: '每日一问',
        }}
      />
    </Top.Navigator>
  );
}
