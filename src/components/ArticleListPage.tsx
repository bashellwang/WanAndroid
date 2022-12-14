import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ApiUrl} from '../foundation/network/ApiUrl';
import HttpUtil from '../foundation/util/HttpUtil';
import {useCallback, useEffect, useState} from 'react';
import {ArticleInfo} from '../model/bean/ArticleInfo';
import ApiResponse from '../foundation/network/ApiResponse';
import ArticleInfoCard from './ArticleInfoCard';
import {RouterConst} from '../foundation/constant/RouterConst';
import LogUtil from '../foundation/util/LogUtil';
import Themes from '../foundation/constant/Theme';
import GeneralFlatList from './GeneralFlatList';
import {FOOT_STATUS} from '../foundation/constant/FootStatus';
import {ArticlePaginationInfo} from '../model/network/ArticlePaginationInfo';
import {PaginationInfo} from '../model/bean/PaginationInfo';

const TAG = 'ArticleListPage';
/**
 * 文章列表页面组件
 */
export default function ArticleListPage({route, navigation}) {
  const [articleList, setArticleList] = useState<ArticleInfo[]>(null);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [footStatus, setFootStatus] = useState(FOOT_STATUS.NO_MORE);

  // 从外部传输过来的参数
  const {id} = route.params;

  const _refreshData = useCallback(() => {
    if (isRefreshing) {
      LogUtil.info({tag: TAG}, 'is refreshing data, return...');
      return;
    }
    setIsRefreshing(true);

    HttpUtil.sendGet(ApiUrl.getKnowledgeArchitectureDetail(0, id)).then(
      function (rsp: ApiResponse) {
        let articlePaginationInfoRsp: ArticlePaginationInfo =
          rsp.data as ArticlePaginationInfo;
        let {datas, ...info} = articlePaginationInfoRsp;

        LogUtil.info(
          {tag: TAG},
          '_refreshData, articlePaginationInfoRsp info: ' +
            JSON.stringify({id: id, length: datas.length, ...info}, null, 2),
        );
        setArticleList(datas);
        setPaginationInfo(info as PaginationInfo);
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
    <View style={pageStyle.container}>
      <GeneralFlatList
        data={articleList}
        refreshing={isRefreshing}
        onRefresh={() => {
          _refreshData();
        }}
        renderItem={data => _renderItem(data)}
        ListFooterComponent={() => _renderFooter()}
        onEndReached={() => {
          _loadMoreData();
        }}
      />
    </View>
  );

  function _renderFooter() {
    if (footStatus === FOOT_STATUS.NO_MORE) {
      return (
        <View style={pageStyle.footer}>
          <Text style={{color: Themes.GreenTheme.colors.primary}}>
            没有更多数据...
          </Text>
        </View>
      );
    } else if (footStatus === FOOT_STATUS.IS_LOADING_MORE) {
      return (
        <View style={pageStyle.footer}>
          <ActivityIndicator
            size="small"
            animating={true}
            style={pageStyle.indicator}
            color={Themes.GreenTheme.colors.primary}
          />

          <Text style={{color: Themes.GreenTheme.colors.primary}}>
            正在加载更多数据...
          </Text>
        </View>
      );
    } else if (footStatus === FOOT_STATUS.HIDE) {
      return null;
    } else {
      return null;
    }
  }

  function _renderItem(data) {
    let article: ArticleInfo = data?.item as ArticleInfo;
    if (article) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate(RouterConst.Pages.WebPage, {
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

  function _loadMoreData() {
    if (isLoadingMore) {
      LogUtil.info({tag: TAG}, 'is loading more data, return...');
      return;
    }
    if (paginationInfo.curPage >= paginationInfo.pageCount) {
      // 没有更多数据
      return;
    }
    setIsLoadingMore(true);
    setFootStatus(FOOT_STATUS.IS_LOADING_MORE);

    HttpUtil.sendGet(
      ApiUrl.getKnowledgeArchitectureDetail(paginationInfo.curPage, id),
    ).then(
      function (rsp: ApiResponse) {
        let articlePaginationInfoRsp: ArticlePaginationInfo =
          rsp.data as ArticlePaginationInfo;
        let {datas, ...info} = articlePaginationInfoRsp;
        LogUtil.info(
          {tag: TAG},
          '_loadMoreData, articlePaginationInfoRsp info: ' +
            JSON.stringify({id: id, length: datas.length, ...info}, null, 2),
        );
        setIsLoadingMore(false);
        setFootStatus(FOOT_STATUS.NO_MORE);
        let result: ArticleInfo[] = articleList.concat(datas);
        setArticleList(result);
        setPaginationInfo(info as PaginationInfo);
      },
      function (error) {
        LogUtil.error({tag: TAG}, 'error: ' + error);
        setIsLoadingMore(false);
        setFootStatus(FOOT_STATUS.HIDE);
      },
    );
  }
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
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
