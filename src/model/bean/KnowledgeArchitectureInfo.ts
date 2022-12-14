import {ArticleInfo} from './ArticleInfo';
/**
 * 知识体系数据结构
 * {
 *   "children": [
 *   {
 *     "children": [],
 *     "courseId": 13,
 *     "id": 60, // id会在查看该目录下所有文章时有用
 *     "name": "Android Studio相关", // 子名称
 *     "order": 1000,
 *     "parentChapterId": 150,
 *     "visible": 1
 *   },...
 * ],
 *     "courseId": 13,
 *     "id": 150,
 *     "name": "开发环境", // 一级的名称
 *     "order": 1,
 *     "parentChapterId": 0,
 *     "visible": 1
 * }
 */
export interface KnowledgeArchitectureInfo {
  /**
   * 二级目录结构
   */
  children: KnowledgeArchitectureInfo[];
  courseId: number;
  /**
   * 分类id
   */
  id: number;
  /**
   * 分类名称
   */
  name: string;
  order: number;
  parentChapterId: number;
  visible: number;

  articleList: ArticleInfo[];
  author: string;
  cover: string;
  desc: string;
  lisense: string;
  lisenseLink: string;
  type: number;
  userControlSetTop: boolean;
}
