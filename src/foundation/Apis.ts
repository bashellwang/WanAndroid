export const BASE_URL = 'https://www.wanandroid.com';
export const API_URLS = {
  /**
   * https://www.wanandroid.com/article/list/0/json
   *
   * 首页文章列表
   * 方法：GET
   * 参数：页码，拼接在连接中，从0开始。
   */
  HOME_ARTICLE_LIST: BASE_URL + '/article/list/0/json',

  /**
   * 置顶文章列表
   */
  TOP_ARTICLE_LIST: BASE_URL + '/article/top/json',
};
