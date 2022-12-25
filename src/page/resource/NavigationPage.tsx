import * as React from 'react';
import {
  FlatList,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import LogUtil from '../../foundation/util/LogUtil';
import HttpUtil from '../../foundation/util/HttpUtil';
import {ApiUrl} from '../../foundation/network/ApiUrl';
import ApiResponse from '../../foundation/network/ApiResponse';
import {WebNaviInfo} from '../../model/bean/WebNaviInfo';
import Color from '../../foundation/constant/Color';
import SimpleArticleInfoCard from '../../components/SimpleArticleInfoCard';
import {RouterConst} from '../../foundation/constant/RouterConst';

const TAG = '[NavigationPage] ';

/**
 * 网站导航页
 * 级联列表参考：
 * https://juejin.cn/post/7075971648343506975
 * https://blog.csdn.net/weixin_46025371/article/details/122517795
 */
export default function NavigationPage({navigation}) {
  const FLATLIST_ITEM_HEIGHT = 40;
  const FLATLIST_DIVIDER_HEIGHT = 1;
  const SECTION_LIST_DIVIDER_HEIGHT = 1;
  const SECTION_LIST_ITEM_HEIGHT = 60;

  const [allData, setAllData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sectionListRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    getNavigation();
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={allData}
          renderItem={data => _renderFlatListItem(data.index, data.item)}
          keyExtractor={item => item.cid}
        />
      </View>
      <View style={{flex: 2.5}}>
        <SectionList
          ref={sectionListRef}
          sections={allData}
          renderItem={data => _renderSectionListItem(data.index, data.item)}
          renderSectionHeader={({section: {name}}) =>
            _renderSectionHeader(name)
          }
          keyExtractor={item => item.id}
          onViewableItemsChanged={info => {
            sectionListOnViewableItemsChanged(info);
          }}
          onScrollToIndexFailed={() => ({
            index: 0,
            highestMeasuredFrameIndex: 0,
            averageItemLength: SECTION_LIST_ITEM_HEIGHT,
          })}
        />
      </View>
    </View>
  );

  /**
   * 在 section 列表滑动时的逻辑
   */
  function sectionListOnViewableItemsChanged(info) {
    let firstViewableItem = info?.viewableItems[0];
    if (firstViewableItem) {
      let id = firstViewableItem.section.cid;
      let index = allData.findIndex(item => {
        return id === item.cid;
      });

      // if (selectedIndex !== index) {
      // setSelectedIndex(index);
      flatListRef.current.scrollToOffset({
        animated: true,
        offset: index * FLATLIST_ITEM_HEIGHT,
      });
      // }
    }
  }

  /**
   * 渲染 flat 列表 item
   */
  function _renderFlatListItem(index, item) {
    return (
      <TouchableOpacity
        onPress={() => {
          // 左侧列表滑动,https://reactnative.cn/docs/flatlist#scrolltooffset
          // flatListRef.current.scrollToOffset({
          //   animated: true,
          //   offset: index * (FLATLIST_ITEM_HEIGHT + FLATLIST_DIVIDER_HEIGHT),
          // });

          LogUtil.info({tag: TAG}, 'selectedIndex: ' + index);
          // setSelectedIndex(index);
          // 右侧列表滑动,https://reactnative.cn/docs/sectionlist#scrolltolocation
          LogUtil.info({tag: TAG}, 'allData.length: ' + allData.length);
          sectionListRef.current.scrollToLocation({
            animated: true,
            itemIndex: 0,
            sectionIndex: index < allData.length ? index : allData.length - 1,
            viewPosition: 0,
          });
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: FLATLIST_ITEM_HEIGHT,
            backgroundColor: Color.transparent,
          }}>
          <Text
            style={{fontSize: 15, color: Color.black}}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * 渲染 section 列表 item
   */
  function _renderSectionListItem(index, item) {
    return (
      <TouchableOpacity
        style={{marginBottom: 1}}
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(RouterConst.Pages.WebPage, {
            title: item?.title,
            url: item?.link,
          });
        }}>
        <View
          style={{
            backgroundColor: Color.white,
          }}>
          <SimpleArticleInfoCard item={item} />
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * 渲染 section 列表头
   */
  function _renderSectionHeader(title: string) {
    return (
      <View
        style={{
          justifyContent: 'center',
          height: FLATLIST_ITEM_HEIGHT,
          paddingLeft: 5,
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'green',
          }}>
          {title}
        </Text>
      </View>
    );
  }

  /**
   * 获取 web 导航数据
   */
  function getNavigation() {
    HttpUtil.sendGet(ApiUrl.getWebNaviList()).then(
      function (rsp: ApiResponse) {
        let dataArray: WebNaviInfo[] = rsp.data as WebNaviInfo[];

        setAllData(
          /**
           * 转换数据格式，必须在 data 字段下，否则 sectionlist 会报错
           * https://stackoverflow.com/questions/50549460/cannot-read-property-length-of-undefined-when-using-sectionlist
           */
          dataArray.map(({articles, ...res}) => ({
            ...res,
            data: articles,
          })),
        );
      },
      function (error) {
        LogUtil.error({tag: TAG}, 'error: ' + error);
      },
    );
  }
}
