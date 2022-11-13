import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {API_URLS} from '../../foundation/Apis';
import HttpUtil from '../../utils/HttpUtil';
import {useCallback, useEffect, useState} from 'react';
import {ArticleBean} from './ArticleBean';
import ApiResponse from '../../foundation/ApiResponse';
import ArticleInfoCard from '../../components/ArticleInfoCard';

const FOOT_STATUS = {
  HIDE: 0,
  NO_MORE: 1,
  IS_LOADING_MORE: 2,
};

const initData: ArticleBean[] = null;

export default function TopArticlesPage() {
  const [articleList, setArticleList] = useState(initData);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // const [mounted, setMounted] = useState(false);
  const [showFoot, setShowFoot] = useState(FOOT_STATUS.HIDE);

  const _refreshData = useCallback(() => {
    if (isRefreshing) {
      console.debug('is refreshing data, return...');
      return;
    }
    setIsRefreshing(true);

    HttpUtil.sendGet(API_URLS.TOP_ARTICLE_LIST).then(
      function (rsp: ApiResponse) {
        console.debug('code: ' + rsp.errorCode);
        console.debug('msg: ' + rsp.errorMsg);
        console.debug('content: ' + rsp.data);
        let dataArray: ArticleBean[] = rsp.data as ArticleBean[];
        setArticleList(dataArray);
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
    <View style={pageStyle.container}>
      <FlatList
        data={articleList}
        renderItem={data => _renderItem(data)}
        refreshControl={
          <RefreshControl
            title={'xxx'}
            colors={['red']}
            tintColor={'blue'}
            refreshing={isRefreshing}
            onRefresh={() => {
              _refreshData();
            }}
          />
        }
        ListFooterComponent={() => _renderFooter()}
        onEndReached={() => {
          _loadMoreData();
        }}
      />
    </View>
  );

  function _loadMoreData() {
    if (isLoadingMore) {
      console.debug('is loading more data, return...');
      return;
    }
    setIsLoadingMore(true);
    setShowFoot(FOOT_STATUS.IS_LOADING_MORE);

    HttpUtil.sendGet(API_URLS.TOP_ARTICLE_LIST).then(
      function (rsp: ApiResponse) {
        console.debug('code: ' + rsp.errorCode);
        console.debug('msg: ' + rsp.errorMsg);
        console.debug('content: ' + rsp.data);
        let dataArray: ArticleBean[] = rsp.data as ArticleBean[];
        setIsLoadingMore(false);
        setShowFoot(FOOT_STATUS.NO_MORE);
        let result: ArticleBean[] = articleList.concat(dataArray);
        setArticleList(result);
      },
      function (error) {
        console.error('error: ' + error);
        setIsLoadingMore(false);
        setShowFoot(FOOT_STATUS.HIDE);
      },
    );
  }

  function _renderFooter() {
    if (showFoot === FOOT_STATUS.NO_MORE) {
      return (
        <View style={pageStyle.footer}>
          <Text style={{color: 'red'}}>没有更多数据...</Text>
        </View>
      );
    } else if (showFoot === FOOT_STATUS.IS_LOADING_MORE) {
      return (
        <View style={pageStyle.footer}>
          <ActivityIndicator
            size="small"
            animating={true}
            style={pageStyle.indicator}
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

  function _renderItem(data) {
    // let result = JSON.parse(data?.item);
    let article: ArticleBean = data?.item as ArticleBean;
    console.log('_renderItem:' + JSON.stringify(article, null, 2));
    return article && <ArticleInfoCard item={article} />;
  }
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  item: {
    container: {
      padding: 5,
      backgroundColor: '#969494FF',
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
      justifyContent: 'flex-start', //内容居中
      alignItems: 'flex-start', //布局对齐方式
    },
    title: {
      color: 'black',
      fontSize: 16,
      // fontWeight: 'bold',
    },
    content: {
      paddingTop: 5,
      paddingBottom: 5,
      color: 'black',
      fontSize: 12,
    },
    label: {
      marginTop: 5,
      color: 'orange',
      fontSize: 10,
    },
  },
  text: {
    color: 'white',
    fontSize: 10,
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
