import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import HttpUtil from '../utils/HttpUtil';
import {API_URLS} from '../foundation/Apis';
import ApiResponse from '../foundation/ApiResponse';
import {ArticleBean} from '../pages/home/ArticleBean';
import ArticleInfoCard from './ArticleInfoCard';

const FOOT_STATUS = {
  HIDE: 0,
  NO_MORE: 1,
  IS_LOADING_MORE: 2,
};

interface GeneralFlatListProps {
  onClick?: (data: any) => void;
}

/**
 * TODO 暂不可使用
 * @constructor
 * @param props
 */

export default function GeneralFlatList(props: GeneralFlatListProps): React.FC {
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

    HttpUtil.sendGet(API_URLS.TOP_ARTICLE_LIST).then(
      function (rsp: ApiResponse) {
        console.debug('code: ' + rsp.errorCode);
        console.debug('msg: ' + rsp.errorMsg);
        console.debug('content: ' + rsp.data);
        let dataArray: ArticleBean[] = rsp.data as ArticleBean[];
        dataArray.map(data => {
          // 从置顶接口里返回的，全部设置为true
          data.isTop = true;
        });
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
    <View style={style.container}>
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
              _refreshData(isRefreshing);
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

    HttpUtil.sendGet(API_URLS.TOP_ARTICLE_LIST).then(
      function (rsp: ApiResponse) {
        console.debug('code: ' + rsp.errorCode);
        console.debug('msg: ' + rsp.errorMsg);
        console.debug('content: ' + rsp.data);
        let dataArray: ArticleBean[] = rsp.data as ArticleBean[];
        setIsLoadingMore(false);
        setShowFoot(FOOT_STATUS.NO_MORE);
        let result: ArticleBean[] = articleList.concat(dataArray);
        result.map(data => {
          // 从置顶接口里返回的，全部设置为true
          data.isTop = true;
        });
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
    let article: ArticleBean = data?.item as ArticleBean;
    console.log('_renderItem:' + JSON.stringify(article, null, 2));
    if (article) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            props.onClick(article);
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
