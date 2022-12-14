import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs/lib/typescript/src/types';

const Top = createMaterialTopTabNavigator();

// 默认 TopTabNavigator ScreenOptions 参数
let defaultScreenOptions = {
  lazy: true, //屏幕懒加载

  // tab 中文本样式
  tabBarLabelStyle: {
    fontsize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    // backgroundColor: Theme.GreenTheme.colors.primary,
  },
  // tab 中下滑指示线样式
  tabBarIndicatorStyle: {
    height: 2,
    width: 180,
  },
  // 当一屏显示不下时，需要左右进行滑动，当它为true时，需要设置 tabBarItemStyle 做样式调整
  tabBarScrollEnabled: true,
  tabBarItemStyle: {
    minWidth: 120,
  },
  // tabBarStyle: {
  //   color: Theme.GreenTheme.colors.primary,
  //   backgroundColor: Theme.GreenTheme.colors.primary,
  // },
};

// 获取数据类型
type TopScreen = typeof Top.Screen;

function _createTopTabs(tabs: TopScreen[]) {
  let allPages: TopScreen[] = [].concat(tabs);
  return allPages;
}

// 类型扩展
type DynamicTopTabNavigatorProps = MaterialTopTabNavigationOptions & {
  topScreenList?: TopScreen[];
  screenOptions?: MaterialTopTabNavigationOptions;
};

/**
 * 动态 TabNavigator，可生成不同数量的 tab 页
 */
export default function DynamicTopTabNavigator(
  props: DynamicTopTabNavigatorProps,
) {
  return (
    <Top.Navigator
      screenOptions={() => {
        // 解构 接收使用方传入的参数
        let {screenOptions} = props;

        /**
         * 合并参数，https://juejin.cn/post/7159203405787987981
         * 后面同名字段值会覆盖前面同名字段,比如 tabBarLabelStyle，tabBarIndicatorStyle 这一级，以外部传入的对象为准，被外部对象给覆盖掉。
         * 因此：
         * tabBarLabelStyle: {
         *     fontsize: 10,
         *     fontWeight: 'bold',
         *     textTransform: 'capitalize',
         *     backgroundColor: Theme.GreenTheme.colors.primary,
         *   },
         * 会被外部的
         * tabBarStyle: {
         *    color: Theme.TomatoTheme.colors.primary,
         *  },
         *  给覆盖掉，背景色 backgroundColor 也无，因为外部的 tabBarStyle 中 backgroundColor 值就是空
         */
        return {...defaultScreenOptions, ...screenOptions};
      }}>
      {/*使用外部传进来的页面*/}
      {_createTopTabs(props.topScreenList)}
    </Top.Navigator>
  );
}
