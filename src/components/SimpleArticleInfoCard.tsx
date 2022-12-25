import * as React from 'react';
import {FC} from 'react';
import {ArticleInfo} from '../model/bean/ArticleInfo';
import {View, StyleSheet, Text} from 'react-native';

const SimpleArticleInfoCardColor = {
  dark_black: '#2e3135',
  middle_black: '#312F2F',
  light_black: '#494646',
};

interface SimpleArticleInfoCardProps {
  item: ArticleInfo;
}

export default function SimpleArticleInfoCard(
  props: SimpleArticleInfoCardProps,
): FC {
  let article: ArticleInfo = props.item as ArticleInfo;
  return (
    <View style={pageStyle.container}>
      <Text style={pageStyle.title} numberOfLines={1}>
        {article.title}
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {article.author ? (
          <Text style={pageStyle.label}>作者:{article.author}</Text>
        ) : null}

        {article.niceDate ? (
          <Text style={pageStyle.label}>时间:{article.niceDate}</Text>
        ) : null}
      </View>
    </View>
  );
}

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    marginRight: 5,
    marginBottom: 5,
    justifyContent: 'flex-start',
  },
  title: {
    color: SimpleArticleInfoCardColor.dark_black,
    fontSize: 14,
  },
  label: {
    marginTop: 5,
    color: SimpleArticleInfoCardColor.light_black,
    fontSize: 10,
  },
});
