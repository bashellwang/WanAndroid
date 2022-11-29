import * as React from 'react';
import {ArticleInfo} from '../../model/bean/ArticleInfo';
import {RouterConst} from '../../foundation/constants/RouterConst';
import GeneralFlatList from '../../components/GeneralFlatList';
import {useCallback, useEffect, useState} from 'react';
import HttpUtil from '../../foundation/utils/HttpUtil';
import {ApiUrl} from '../../foundation/network/ApiUrl';
import ApiResponse from '../../foundation/network/ApiResponse';
import ArticleInfoCard from '../../components/ArticleInfoCard';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {WendaResp} from '../../model/network/WendaResp';
import {WendaReq} from '../../model/network/WendaReq';
import Themes from '../../foundation/constants/Themes';
import LogUtil from '../../foundation/utils/LogUtil';
import {PaginationInfo} from '../../model/bean/PaginationInfo';
import {FOOT_STATUS} from '../../foundation/constants/FootStatus';

const TAG = 'DailyQuestionPage';
export default function DailyQuestionPage({navigation}) {
  const [articleList, setArticleList] = useState<ArticleInfo[]>(null);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [footStatus, setFootStatus] = useState(FOOT_STATUS.HIDE);

  const _refreshData = useCallback(() => {
    if (isRefreshing) {
      LogUtil.info({tag: TAG}, 'is refreshing data, return...');
      return;
    }
    setIsRefreshing(true);

    HttpUtil.sendGet(ApiUrl.getWendaArticleList()).then(
      function (rsp: ApiResponse) {
        let wendaResp: WendaResp = rsp.data as WendaResp;
        let {datas, ...info} = wendaResp;
        LogUtil.info(
          {tag: TAG},
          '_refreshData, wendaResp pagination info: ' +
            JSON.stringify({length: wendaResp.datas.length, ...info}, null, 2),
        );
        setArticleList(wendaResp.datas);
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
    if (footStatus === FOOT_STATUS.NO_MORE) {
      return (
        <View style={style.footer}>
          <Text style={{color: Themes.GreenTheme.colors.primary}}>
            没有更多数据...
          </Text>
        </View>
      );
    } else if (footStatus === FOOT_STATUS.IS_LOADING_MORE) {
      return (
        <View style={style.footer}>
          <ActivityIndicator
            size="small"
            animating={true}
            style={style.indicator}
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
      ApiUrl.getWendaArticleList(paginationInfo.curPage + 1),
    ).then(
      function (rsp: ApiResponse) {
        let wendaResp: WendaResp = rsp.data as WendaResp;
        let {datas, ...info} = wendaResp;
        LogUtil.info(
          {tag: TAG},
          '_loadMoreData, wendaResp: ' +
            JSON.stringify({length: datas.length, ...info}, null, 2),
        );
        setIsLoadingMore(false);
        setFootStatus(FOOT_STATUS.NO_MORE);
        let result: ArticleInfo[] = articleList.concat(wendaResp.datas);
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

  function _renderItem(data) {
    // let result = JSON.parse(data?.item);
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
