import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RouterConst} from '../foundation/constant/RouterConst';
import DynamicTopTabNavigator from './DynamicTopTabNavigator';
import ProjectPage from '../page/project/ProjectPage';

const Top = createMaterialTopTabNavigator();

export default function TopicPageTopTabsNavigator() {
  return (
    <DynamicTopTabNavigator
      topScreenList={[
        <Top.Screen
          name={RouterConst.Pages.ProjectPage + 'index'}
          component={ProjectPage}
          options={{
            tabBarLabel: 'test' + 'index',
          }}
        />,
      ]}
      // screenOptions={{
      //   // tab 中文本样式
      //   tabBarLabelStyle: {
      //     fontsize: 10,
      //     fontWeight: 'bold',
      //     textTransform: 'capitalize',
      //   },
      //   // tab 中下滑指示线样式
      //   tabBarIndicatorStyle: {
      //     height: 2,
      //     width: 40,
      //     left: 60,
      //   },
      //   // 当一屏显示不下时，需要左右进行滑动，当它为true时，需要设置 tabBarItemStyle 做样式调整
      //   tabBarScrollEnabled: true,
      //   tabBarItemStyle: {
      //     minWidth: 120,
      //   },
      // }}
    />
  );
}
