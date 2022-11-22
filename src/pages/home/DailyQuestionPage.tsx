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
import Themes from '../../foundation/Themes';
import LogUtil from '../../utils/LogUtil';

const FOOT_STATUS = {
  HIDE: 0,
  NO_MORE: 1,
  IS_LOADING_MORE: 2,
};

const TAG = 'DailyQuestionPage';
export default function DailyQuestionPage({navigation}) {
  const [articleList, setArticleList] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [footStatus, setFootStatus] = useState(FOOT_STATUS.HIDE);

  const _refreshData = useCallback(() => {
    if (isRefreshing) {
      LogUtil.debug({tag: TAG}, 'is refreshing data, return...');
      return;
    }
    setIsRefreshing(true);

    HttpUtil.sendGet(ApiUrl.getWendaArticleList()).then(
      function (rsp: ApiResponse) {
        let wendaResp: WendaResp = rsp.data as WendaResp;
        let simpleRsp = (({curPage, offset, over, pageCount, size, total}) => ({
          curPage,
          offset,
          over,
          pageCount,
          size,
          total,
        }))(wendaResp);
        LogUtil.debug(
          {tag: TAG},
          '_refreshData, wendaResp: ' + JSON.stringify(simpleRsp, null, 2),
        );
        setArticleList(wendaResp.datas);
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
      LogUtil.debug({tag: TAG}, 'is loading more data, return...');
      return;
    }
    setIsLoadingMore(true);
    setFootStatus(FOOT_STATUS.IS_LOADING_MORE);

    HttpUtil.sendGet(ApiUrl.getWendaArticleList(2)).then(
      function (rsp: ApiResponse) {
        let wendaResp: WendaResp = rsp.data as WendaResp;
        // let simpleRsp = (({curPage, offset, over, pageCount, size, total}) => ({
        //   curPage,
        //   offset,
        //   over,
        //   pageCount,
        //   size,
        //   total,
        // }))(wendaResp);
        let {datas, ...xx} = wendaResp;
        LogUtil.debug(
          {tag: TAG},
          '_loadMoreData, wendaResp: ' + JSON.stringify(xx, null, 2),
        );
        setIsLoadingMore(false);
        setFootStatus(FOOT_STATUS.NO_MORE);
        let result: ArticleInfo[] = articleList.concat(wendaResp.datas);
        setArticleList(result);
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
