export const BASE_URL = 'https://www.wanandroid.com';

export class ApiUrl {
  /**
   * 置顶文章列表
   */
  static getTopArticleList() {
    return BASE_URL + '/article/top/json';
  }

  /**
   * 首页文章列表
   * @param pageId 页码，拼接在连接中，从0开始。
   */
  static getHomeArticleList(pageId = 0) {
    return BASE_URL + '/article/list/' + pageId + '/json';
  }

  /**
   * 问答文章列表
   * @param pageId 拼接在链接上，pageId 从 1 开始。
   */
  static getWendaArticleList(pageId = 1) {
    return BASE_URL + '/wenda/list/' + pageId + '/json';
  }

  /**
   * 按时间分页展示所有项目。
   * @param pageId 页码，拼接在连接中，从0开始。
   */
  static getProjectList(pageId = 0) {
    return BASE_URL + '/article/listproject/' + pageId + '/json';
  }

  /**
   * 主要标识的网站内容的体系结构，二级目录。
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
  static getArchitecture() {
    return BASE_URL + '/tree/json';
  }
}
