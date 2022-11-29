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
import HttpUtil from '../foundation/utils/HttpUtil';
import {ApiUrl} from '../foundation/network/ApiUrl';
import ApiResponse from '../foundation/network/ApiResponse';
import {ArticleInfo} from '../model/bean/ArticleInfo';
import ArticleInfoCard from '../components/ArticleInfoCard';
import LogUtil from '../foundation/utils/LogUtil';
import {FOOT_STATUS} from '../foundation/constants/FootStatus';

interface GeneralFlatListDemoProps {
  onClick?: (data: any) => void;
}
const TAG = 'GeneralFlatListDemo';
/**
 * 所有逻辑和 UI 在一个组件中，一个组件即可成为一个页面。
 * 灵活性和扩展性不高，demo 试试
 */
export default function GeneralFlatListDemo(
  props: GeneralFlatListDemoProps,
): React.FC {
  const [articleList, setArticleList] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showFoot, setShowFoot] = useState(FOOT_STATUS.HIDE);

  const _refreshData = useCallback(() => {
    if (isRefreshing) {
      LogUtil.debug({tag: TAG}, 'is refreshing data, return...');
      return;
    }
    setIsRefreshing(true);

    HttpUtil.sendGet(ApiUrl.getTopArticleList()).then(
      function (rsp: ApiResponse) {
        LogUtil.debug({tag: TAG}, 'code: ' + rsp.errorCode);
        LogUtil.debug({tag: TAG}, 'msg: ' + rsp.errorMsg);
        LogUtil.debug({tag: TAG}, 'content: ' + rsp.data);
        let dataArray: ArticleInfo[] = rsp.data as ArticleInfo[];
        dataArray.map(data => {
          // 从置顶接口里返回的，全部设置为true
          data.isTop = true;
        });
        setArticleList(dataArray);
        setIsRefreshing(false);
      },
      function (error) {
        LogUtil.error({tag: TAG}, 'error: ' + error);
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
      LogUtil.debug({tag: TAG}, 'is loading more data, return...');
      return;
    }
    setIsLoadingMore(true);
    setShowFoot(FOOT_STATUS.IS_LOADING_MORE);

    HttpUtil.sendGet(ApiUrl.getTopArticleList()).then(
      function (rsp: ApiResponse) {
        LogUtil.debug({tag: TAG}, 'code: ' + rsp.errorCode);
        LogUtil.debug({tag: TAG}, 'msg: ' + rsp.errorMsg);
        LogUtil.debug({tag: TAG}, 'content: ' + rsp.data);
        let dataArray: ArticleInfo[] = rsp.data as ArticleInfo[];
        setIsLoadingMore(false);
        setShowFoot(FOOT_STATUS.NO_MORE);
        let result: ArticleInfo[] = articleList.concat(dataArray);
        result.map(data => {
          // 从置顶接口里返回的，全部设置为true
          data.isTop = true;
        });
        setArticleList(result);
      },
      function (error) {
        LogUtil.error({tag: TAG}, 'error: ' + error);
        setIsLoadingMore(false);
        setShowFoot(FOOT_STATUS.HIDE);
      },
    );
  }

  function _renderItem(data) {
    // let result = JSON.parse(data?.item);
    let article: ArticleInfo = data?.item as ArticleInfo;
    LogUtil.debug(
      {tag: TAG},
      '_renderItem:' + JSON.stringify(article, null, 2),
    );
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
