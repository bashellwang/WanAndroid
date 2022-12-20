import * as React from 'react';
import {FC} from 'react';
import {ArticleInfo, ArticleTag} from '../model/bean/ArticleInfo';
import {View, StyleSheet, Text, Image} from 'react-native';
import OutlineTextList, {ItemInfo} from './OutlineTextList';
import OutlineText, {OutlineTextColorTheme} from './OutlineText';
import Icon from 'react-native-vector-icons/Ionicons';
import ArrayUtil from '../foundation/util/ArrayUtil';

const ArticleInfoCardColor = {
  dark_black: '#2e3135',
  middle_black: '#312F2F',
  light_black: '#494646',
};
const TAG = '[ArticleInfoCard] ';

interface ArticleInfoCardProps {
  item: ArticleInfo;
}

export default function ArticleInfoCard(props: ArticleInfoCardProps): FC {
  let article: ArticleInfo = props.item as ArticleInfo;
  let hasEnvelopePic = !!article.envelopePic;
  let picWidthFlex = 0;
  if (hasEnvelopePic) {
    picWidthFlex = 0.3;
  }
  return (
    <View style={pageStyle.item.container}>
      <Image
        style={{
          flex: picWidthFlex,
        }}
        source={{
          uri: hasEnvelopePic ? article.envelopePic : null,
        }}
      />
      <View
        style={{
          flex: 1 - picWidthFlex,
          marginLeft: hasEnvelopePic ? 5 : 0,
        }}>
        <Text style={pageStyle.item.title} numberOfLines={1}>
          {article.title}
        </Text>
        {article.desc ? (
          <Text style={pageStyle.item.content} numberOfLines={3}>
            {article.desc}
          </Text>
        ) : null}
        <Text style={pageStyle.item.label} numberOfLines={1}>
          分类:{article.superChapterName}/{article.chapterName}
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {article.author ? (
            <Text style={pageStyle.item.label}>作者:{article.author}</Text>
          ) : null}

          {article.niceDate ? (
            <Text style={pageStyle.item.label}>时间:{article.niceDate}</Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {_renderTags(article)}
          <Text />
          {article.collect ? (
            <Icon name={'heart'} size={22} color="red" />
          ) : (
            <Icon name={'heart-outline'} size={22} color="red" />
          )}
        </View>
      </View>
    </View>
  );
}

function _renderTags(article: ArticleInfo) {
  let tagList: ArticleTag[] = article.tags;
  if (ArrayUtil.isEmpty(tagList)) {
    return null;
  }
  let wrapData: ItemInfo[] = tagList.map(item => {
    return {text: item.name, color: OutlineTextColorTheme.green};
  });
  let targetData: ItemInfo[];
  if (article.isTop) {
    targetData = [
      {text: '置顶', color: OutlineTextColorTheme.red},
      ...wrapData,
    ];
  } else {
    targetData = wrapData;
  }
  return ArrayUtil.isEmpty(targetData) ? null : (
    <OutlineTextList dataList={targetData} />
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  item: {
    container: {
      padding: 5,
      backgroundColor: 'white',
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    title: {
      color: ArticleInfoCardColor.dark_black,
      fontSize: 16,
      // fontWeight: 'bold',
    },
    content: {
      paddingTop: 5,
      paddingBottom: 5,
      color: ArticleInfoCardColor.middle_black,
      fontSize: 12,
    },
    label: {
      marginTop: 5,
      color: ArticleInfoCardColor.light_black,
      fontSize: 10,
    },
  },
});
