import * as React from 'react';
import {ArticleInfo} from '../../model/ArticleInfo';
import Constants from '../../foundation/Constants';
import GeneralFlatList from '../../components/GeneralFlatList';
import {useCallback, useEffect, useState} from 'react';
import HttpUtil from '../../utils/HttpUtil';
import {ApiUrl} from '../../foundation/ApiUrl';
import ApiResponse from '../../foundation/ApiResponse';
import ArticleInfoCard from '../../components/ArticleInfoCard';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {WendaResp} from '../../model/WendaResp';
import {WendaReq} from '../../model/WendaReq';

const FOOT_STATUS = {
  HIDE: 0,
  NO_MORE: 1,
  IS_LOADING_MORE: 2,
};

export default function DailyQuestionPage({navigation}) {
  const [articleList, setArticleList] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showFoot, setShowFoot] = useState(FOOT_STATUS.HIDE);

  const _refreshData = useCallback(() => {
    if (isRefreshing) {
      console.debug('is refreshing data, return...');
      return;
    }
    setIsRefreshing(true);

    let req: WendaReq = {pageId: 2};
    HttpUtil.sendGet(ApiUrl.getWendaArticleList(req.pageId)).then(
      function (rsp: ApiResponse) {
        console.debug('code: ' + rsp.errorCode);
        console.debug('msg: ' + rsp.errorMsg);
        console.debug('content: ' + rsp.data);
        let wendaResp: WendaResp = rsp.data as WendaResp;
        setArticleList(wendaResp.datas);
        setIsRefreshing(false);
      },
      function (error) {
        console.error('error: ' + error);
        setIsRefreshing(false);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    _refreshData();
  }, [_refreshData]);

  return (
    <GeneralFlatList
      refreshing={isRefreshing}
      onRefresh={() => {
        _refreshData();
      }}
      renderItem={data => _renderItem(data)}
      ListFooterComponent={() => _renderFooter()}
      onEndReached={() => {
        _loadMoreData();
      }}
      data={articleList}
    />
  );

  function _renderFooter() {
    if (showFoot === FOOT_STATUS.NO_MORE) {
      return (
        <View style={style.footer}>
          <Text style={{color: 'red'}}>没有更多数据...</Text>
        </View>
      );
    } else if (showFoot === FOOT_STATUS.IS_LOADING_MORE) {
      return (
        <View style={style.footer}>
          <ActivityIndicator
            size="small"
            animating={true}
            style={style.indicator}
            color={'red'}
          />

          <Text style={{color: 'red'}}>正在加载更多数据...</Text>
        </View>
      );
    } else if (showFoot === FOOT_STATUS.HIDE) {
      return null;
    } else {
      return null;
    }
  }

  function _loadMoreData() {
    if (isLoadingMore) {
      console.debug('is loading more data, return...');
      return;
    }
    setIsLoadingMore(true);
    setShowFoot(FOOT_STATUS.IS_LOADING_MORE);

    HttpUtil.sendGet(ApiUrl.getWendaArticleList(2)).then(
      function (rsp: ApiResponse) {
        console.debug('code: ' + rsp.errorCode);
        console.debug('msg: ' + rsp.errorMsg);
        console.debug('content: ' + rsp.data);
        let wendaRep: WendaResp = rsp.data as WendaResp;
        setIsLoadingMore(false);
        setShowFoot(FOOT_STATUS.NO_MORE);
        let result: ArticleInfo[] = articleList.concat(wendaRep.datas);
        setArticleList(result);
      },
      function (error) {
        console.error('error: ' + error);
        setIsLoadingMore(false);
        setShowFoot(FOOT_STATUS.HIDE);
      },
    );
  }

  function _renderItem(data) {
    // let result = JSON.parse(data?.item);
    let article: ArticleInfo = data?.item as ArticleInfo;
    console.log('_renderItem:' + JSON.stringify(article, null, 2));
    if (article) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate(Constants.Pages.WebPage, {
              title: article.title,
              url: article.link,
            });
          }}>
          <ArticleInfoCard item={article} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
    backgroundColor: 'grey',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    alignItems: 'center', //布局对齐方式
    justifyContent: 'center', //内容居中
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
