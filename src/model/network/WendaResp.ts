import {ArticleInfo} from '../bean/ArticleInfo';

export interface WendaResp {
  curPage: number;
  datas: ArticleInfo[];
  offset: number;
  over: boolean;
  pageCount: number;
  size: number;
  total: number;
}
