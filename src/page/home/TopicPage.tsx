import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import DynamicTopTabNavigator from '../../navigator/DynamicTopTabNavigator';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HttpUtil from '../../foundation/util/HttpUtil';
import {ApiUrl} from '../../foundation/network/ApiUrl';
import ApiResponse from '../../foundation/network/ApiResponse';
import LogUtil from '../../foundation/util/LogUtil';
import {KnowledgeArchitectureInfo} from '../../model/bean/KnowledgeArchitectureInfo';
import ArticleListPage from '../../components/ArticleListPage';

const TAG = 'TopicPage';
const Top = createMaterialTopTabNavigator();

/**
 * 生成动态页面
 */
function _createTabs(dataList: KnowledgeArchitectureInfo[]) {
  let tabPages = [];
  dataList.map((knowledgeArchitectureInfo, index) => {
    tabPages.push(
      <Top.Screen
        name={'TopicPage_' + knowledgeArchitectureInfo.id}
        component={ArticleListPage}
        initialParams={{
          // 初始化参数传入
          id: knowledgeArchitectureInfo.id,
        }}
        options={{
          tabBarLabel: knowledgeArchitectureInfo.name,
        }}
      />,
    );
  });
  return tabPages;
}

export default function TopicPage(): FC<any, any> {
  const [knowledgeArchitectureInfoList, setKnowledgeArchitectureInfoList] =
    useState<KnowledgeArchitectureInfo[]>(null);
  useEffect(() => {
    getKnowledgeArchitecture();
  }, []);

  if (knowledgeArchitectureInfoList) {
    return (
      <View style={{flex: 1}}>
        <DynamicTopTabNavigator
          topScreenList={_createTabs(knowledgeArchitectureInfoList)}
        />
      </View>
    );
  } else {
    return null;
  }

  /**
   * 获取知识体系数据
   */
  function getKnowledgeArchitecture() {
    HttpUtil.sendGet(ApiUrl.getKnowledgeArchitecture()).then(
      function (rsp: ApiResponse) {
        let dataArray: KnowledgeArchitectureInfo[] =
          rsp.data as KnowledgeArchitectureInfo[];
        // 根据返回的知识体系数据构建 tab 页
        setKnowledgeArchitectureInfoList(dataArray);
      },
      function (error) {
        LogUtil.error({tag: TAG}, 'error: ' + error);
      },
    );
  }
}
