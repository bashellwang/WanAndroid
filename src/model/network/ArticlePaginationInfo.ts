import {ArticleInfo} from '../bean/ArticleInfo';
import {PaginationInfo} from '../bean/PaginationInfo';

export type ArticlePaginationInfo = {
  datas: ArticleInfo[];
} & PaginationInfo;
