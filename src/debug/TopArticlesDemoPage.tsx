import * as React from 'react';
import {ArticleInfo} from '../model/ArticleInfo';
import Constants from '../foundation/Constants';
import GeneralFlatListDemo from './GeneralFlatListDemo';

export default function TopArticlesDemoPage({navigation}) {
  return (
    <GeneralFlatListDemo
      onClick={(data: ArticleInfo) => {
        navigation.navigate(Constants.Pages.WebPage, {
          title: data.title,
          url: data.link,
        });
      }}
    />
  );
}
