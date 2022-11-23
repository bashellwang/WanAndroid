/**
 * 分页信息
 */
export interface PaginationInfo {
  curPage: number;
  offset: number;
  over: boolean;
  pageCount: number;
  size: number;
  total: number;
}
