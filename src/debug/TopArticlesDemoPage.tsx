import * as React from 'react';
import {ArticleBean} from '../pages/home/ArticleBean';
import Constants from '../foundation/Constants';
import GeneralFlatListDemo from './GeneralFlatListDemo';

export default function TopArticlesDemoPage({navigation}) {
  return (
    <GeneralFlatListDemo
      onClick={(data: ArticleBean) => {
        navigation.navigate(Constants.Pages.WebPage, {
          title: data.title,
          url: data.link,
        });
      }}
    />
  );
}
