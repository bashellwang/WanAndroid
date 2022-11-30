import * as React from 'react';
import {RouterConst} from '../foundation/constant/RouterConst';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import InterviewRelatedPage from '../page/home/InterviewRelatedPage';
import PerformanceOptimizationPage from '../page/home/PerformanceOptimizationPage';
import FrameworkPage from '../page/home/FrameworkPage';
import SourceCodePage from '../page/home/SourceCodePage';
import BigFactorySharePage from '../page/home/BigFactorySharePage';

const Top = createMaterialTopTabNavigator();

export default function TopicPageTopTabsNavigator() {
  return (
    <Top.Navigator
      screenOptions={{
        lazy: true, //屏幕懒加载

        // tab 中文本样式
        tabBarLabelStyle: {
          fontsize: 10,
          fontWeight: '200',
          textTransform: 'capitalize',
        },
        // tab 中下滑指示线样式
        tabBarIndicatorStyle: {
          height: 2,
          width: 40,
          left: 60,
        },
        // 当一屏显示不下时，需要左右进行滑动，当它为true时，需要设置 tabBarItemStyle 做样式调整
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          minWidth: 120,
        },
      }}>
      <Top.Screen
        name={RouterConst.Pages.InterviewRelatedPage}
        component={InterviewRelatedPage}
        options={{
          tabBarLabel: '面试相关',
        }}
      />
      <Top.Screen
        name={RouterConst.Pages.PerformanceOptimizationPage}
        component={PerformanceOptimizationPage}
        options={{
          tabBarLabel: '性能优化',
        }}
      />
      <Top.Screen
        name={RouterConst.Pages.FrameworkPage}
        component={FrameworkPage}
        options={{
          tabBarLabel: 'framework',
        }}
      />
      <Top.Screen
        name={RouterConst.Pages.SourceCodePage}
        component={SourceCodePage}
        options={{
          tabBarLabel: '开源库源码',
        }}
      />
      <Top.Screen
        name={RouterConst.Pages.BigFactorySharePage}
        component={BigFactorySharePage}
        options={{
          tabBarLabel: '大厂分享',
        }}
      />
    </Top.Navigator>
  );
}
