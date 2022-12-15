import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MaterialTopTabNavigationOptions} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {Dimensions} from 'react-native';
import * as _ from 'lodash';

const Top = createMaterialTopTabNavigator();

// 默认 TopTabNavigator ScreenOptions 参数
let defaultScreenOptions = {
  lazy: true, //屏幕懒加载

  // tab 中文本样式
  tabBarLabelStyle: {
    fontsize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  // tab 中下滑指示线样式
  tabBarIndicatorStyle: {
    height: 2,
  },
  // 当一屏显示不下时，需要左右进行滑动，当它为true时，需要设置 tabBarItemStyle 做样式调整
  tabBarScrollEnabled: true,
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
  let numOfScreen = props.topScreenList.length;
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
   *
   * ----------------------------------------------------------------------
   * 延展运算符 ... 具有深拷贝和浅拷贝两种性质，因此这里需要对对象做深拷贝处理
   * 参考：https://blog.csdn.net/weixin_43925630/article/details/111299038
   *
   * ----------------------------------------------------------------------
   * https://juejin.cn/post/6882549580559777800
   * https://www.lodashjs.com/docs/lodash.merge
   * 最终使用 lodash 库进行数据合并（深拷贝）
   */
  // let finalScreenOptions = {...defaultScreenOptions, ...screenOptions};
  // 上面这行使用，会导致首次调用场景，在 tabBarScrollEnabled 为ture 时，给defaultScreenOptions 的 left 赋值，会影响到其他调用场景的 left 值处理
  // 深拷贝调用方设置
  // let deepCopy = screenOptions
  //   ? {...JSON.parse(JSON.stringify(screenOptions))}
  //   : screenOptions;
  // let finalScreenOptions = {
  //   ...JSON.parse(JSON.stringify(defaultScreenOptions)),
  //   ...deepCopy,
  // };

  // 深拷贝赋值
  let finalScreenOptions = {
    ...JSON.parse(JSON.stringify(defaultScreenOptions)),
  };
  _.merge(finalScreenOptions, screenOptions);

  /**
   * tabBarScrollEnabled=false, 即一屏放得下时自动适配获取 left 值
   */
  if (!finalScreenOptions.tabBarScrollEnabled) {
    finalScreenOptions.tabBarIndicatorStyle.width = 40;
    finalScreenOptions.tabBarIndicatorStyle.left = getLeftValue(
      numOfScreen,
      finalScreenOptions.tabBarIndicatorStyle.width,
    );
  }

  return (
    <Top.Navigator
      screenOptions={finalScreenOptions}
      initialLayout={{width: Dimensions.get('window').width}}>
      {/*使用外部传进来的页面*/}
      {_createTopTabs(props.topScreenList)}
    </Top.Navigator>
  );
}

/**
 * 获取 tabBarIndicator 居中时的 left 值
 * @param numOfTab tab 数量
 * @param widthOfIndicator tabBarIndicator 宽度
 */
function getLeftValue(numOfTab: number, widthOfIndicator: number): number {
  let result = 0;
  let windowWidth = Dimensions.get('window').width;
  if (numOfTab === 0) {
    return result;
  }
  result = (windowWidth / numOfTab - widthOfIndicator) / 2;
  return result > 0 ? result : 0;
}
