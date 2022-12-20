export const BASE_URL = 'https://www.wanandroid.com';

export class ApiUrl {
  /**
   * 置顶文章列表
   * https://www.wanandroid.com/article/top/json
   */
  static getTopArticleList() {
    return BASE_URL + '/article/top/json';
  }

  /**
   * 首页文章列表
   * https://www.wanandroid.com/article/list/0/json
   *
   * @param pageId 页码，拼接在连接中，从0开始。
   */
  static getHomeArticleList(pageId = 0) {
    return BASE_URL + '/article/list/' + pageId + '/json';
  }

  /**
   * 问答文章列表
   * https://wanandroid.com/wenda/list/1/json
   *
   * @param pageId 拼接在链接上，pageId 从 1 开始。
   */
  static getWendaArticleList(pageId = 1) {
    return BASE_URL + '/wenda/list/' + pageId + '/json';
  }

  /**
   * 知识体系
   * https://www.wanandroid.com/tree/json
   *
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
  static getArchitectureTree(): string {
    return BASE_URL + '/tree/json';
  }

  /**
   * 知识体系下的文章
   * https://www.wanandroid.com/article/list/0/json?cid=60
   *
   * @param pageId 页码：拼接在链接上，从0开始。
   * @param cid 分类的 id
   *
   * 注意：这里返回结果 rsp 的 curPage 会比传入的大1；比如你传入pageId=0，则返回结果的 curPage=1；因此使用时需要小心
   */
  static getArchitectureDetail(pageId: number = 0, cid: number): string {
    return BASE_URL + '/article/list/' + pageId + '/json?cid=' + cid;
  }

  /**
   * 按照作者昵称搜索文章
   * https://wanandroid.com/article/list/0/json?author=鸿洋
   *
   * @param pageId 页码：拼接在链接上，从0开始。
   * @param author 作者昵称，不支持模糊匹配。
   */
  static getArticlesByAuthor(pageId: number = 0, author: string): string {
    return BASE_URL + '/article/list/' + pageId + '/json?author=' + author;
  }

  /**
   * 项目分类
   * https://www.wanandroid.com/project/tree/json
   * [
   *     {
   *         "children": [],
   *         "courseId": 13,
   *         "id": 294, // 该id在获取该分类下项目时需要用到
   *         "name": "完整项目", // 该分类名称
   *         "order": 145000,
   *         "parentChapterId": 293,
   *         "visible": 0
   *     }
   * ]
   */
  static getProjectCategory(): string {
    return BASE_URL + '/project/tree/json';
  }

  /**
   * 某一个分类下项目列表数据
   * https://www.wanandroid.com/project/list/1/json?cid=294
   *
   * @param cid 分类id
   * @param pageId 页码，从1开始
   */
  static getProjectListInCategory(cid: number, pageId: number = 1) {
    return BASE_URL + '/project/list/' + pageId + '/json?cid=' + cid;
  }

  /**
   * 按时间分页展示所有项目。
   * @param pageId 页码，拼接在连接中，从0开始。
   */
  static getProjectList(pageId = 0) {
    return BASE_URL + '/article/listproject/' + pageId + '/json';
  }
}
