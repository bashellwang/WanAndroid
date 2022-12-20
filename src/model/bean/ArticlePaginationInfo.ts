import {ArticleInfo} from './ArticleInfo';
import {PaginationInfo} from './PaginationInfo';

export type ArticlePaginationInfo = {
  datas: ArticleInfo[];
} & PaginationInfo;
