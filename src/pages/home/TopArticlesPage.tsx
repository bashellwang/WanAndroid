import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ApiUrl} from '../../foundation/ApiUrl';
import HttpUtil from '../../utils/HttpUtil';
import {useCallback, useEffect, useState} from 'react';
import {ArticleInfo} from '../../model/ArticleInfo';
import ApiResponse from '../../foundation/ApiResponse';
import ArticleInfoCard from '../../components/ArticleInfoCard';
import Constants from '../../foundation/Constants';
import LogUtil from '../../utils/LogUtil';
import Themes from '../../foundation/Themes';
import GeneralFlatList from '../../components/GeneralFlatList';

const FOOT_STATUS = {
  HIDE: 0,
  NO_MORE: 1,
  IS_LOADING_MORE: 2,
};

const TAG = 'TopArticlesPage';

export default function TopArticlesPage({navigation}) {
  const [articleList, setArticleList] = useState<ArticleInfo[]>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [footStatus, setFootStatus] = useState(FOOT_STATUS.NO_MORE);

  const _refreshData = useCallback(() => {
    if (isRefreshing) {
      LogUtil.info({tag: TAG}, 'is refreshing data, return...');
      return;
    }
    setIsRefreshing(true);

    HttpUtil.sendGet(ApiUrl.getTopArticleList()).then(
      function (rsp: ApiResponse) {
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
    <View style={pageStyle.container}>
      <GeneralFlatList
        data={articleList}
        refreshing={isRefreshing}
        onRefresh={() => {
          _refreshData();
        }}
        renderItem={data => _renderItem(data)}
        ListFooterComponent={() => _renderFooter()}
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
    // LogUtil.debug(
    //   {tag: TAG},
    //   '_renderItem:' + JSON.stringify(article, null, 2),
    // );
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
