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

  /**
   * https://wanandroid.com/wenda/list/1/json
   *
   * 请求:GET
   * 参数：
   *    pageId,拼接在链接上，pageId 从 1 开始。
   *
   * 注：该接口支持传入 page_size 控制分页数量，取值为[1-40]，不传则使用默认值，一旦传入了 page_size，后续该接口分页都需要带上，否则会造成分页读取错误。
   */
  DAILY_QUESTION_ARTICLE_LIST: BASE_URL + '/wenda/list/1/json',

  /**
   * https://www.wanandroid.com/tree/json
   *
   * 方法：GET
   * 参数：无
   * 主要标识的网站内容的体系结构，二级目录。
   *
   * {
   *     "children": [
   *         {
   *             "children": [],
   *             "courseId": 13,
   *             "id": 60, // id会在查看该目录下所有文章时有用
   *             "name": "Android Studio相关", // 子名称
   *             "order": 1000,
   *             "parentChapterId": 150,
   *             "visible": 1
   *         },...
   *     ],
   *     "courseId": 13,
   *     "id": 150,
   *     "name": "开发环境", // 一级的名称
   *     "order": 1,
   *     "parentChapterId": 0,
   *     "visible": 1
   * }
   */
  ARCHITECTURE: BASE_URL + '/tree/json',
  /**
   * https://wanandroid.com/article/listproject/0/json
   *
   * 方法：GET
   * 参数：页码，拼接在连接中，从0开始。
   *
   *
   * 按时间分页展示所有项目。
   * 注：该接口支持传入 page_size 控制分页数量，取值为[1-40]，不传则使用默认值，一旦传入了 page_size，后续该接口分页都需要带上，否则会造成分页读取错误。
   */
  PROJECT_LIST: BASE_URL + '/article/listproject/0/json',
};
