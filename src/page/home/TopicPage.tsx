import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import DynamicTopTabNavigator from '../../navigator/DynamicTopTabNavigator';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HttpUtil from '../../foundation/util/HttpUtil';
import {ApiUrl} from '../../foundation/network/ApiUrl';
import ApiResponse from '../../foundation/network/ApiResponse';
import LogUtil from '../../foundation/util/LogUtil';
import {ArchitectureInfo} from '../../model/bean/ArchitectureInfo';
import ArticleListPage from '../../components/ArticleListPage';
import * as _ from 'lodash';

const TAG = 'TopicPage';
const Top = createMaterialTopTabNavigator();

/**
 * 生成动态页面
 */
function _createTabs(dataList: ArchitectureInfo[]) {
  let tabPages = [];
  dataList.map((architectureInfo, index) => {
    tabPages.push(
      <Top.Screen
        // @ts-ignore
        key={_.uniqueId()}
        name={'TopicPage_' + architectureInfo.id}
        component={ArticleListPage}
        initialParams={{
          // 初始化参数传入
          id: architectureInfo.id,
        }}
        options={{
          tabBarLabel: architectureInfo.name,
        }}
      />,
    );
  });
  return tabPages;
}

export default function TopicPage(): FC<any, any> {
  const [architectureInfoList, setArchitectureInfoList] =
    useState<ArchitectureInfo[]>(null);
  useEffect(() => {
    getArchitectureTree();
  }, []);

  if (architectureInfoList) {
    return (
      <View style={{flex: 1}}>
        <DynamicTopTabNavigator
          topScreenList={_createTabs(architectureInfoList)}
        />
      </View>
    );
  } else {
    return null;
  }

  /**
   * 获取知识体系数据
   */
  function getArchitectureTree() {
    HttpUtil.sendGet(ApiUrl.getArchitectureTree()).then(
      function (rsp: ApiResponse) {
        let dataArray: ArchitectureInfo[] = rsp.data as ArchitectureInfo[];
        // 根据返回的知识体系数据构建 tab 页
        setArchitectureInfoList(dataArray);
      },
      function (error) {
        LogUtil.error({tag: TAG}, 'error: ' + error);
      },
    );
  }
}
