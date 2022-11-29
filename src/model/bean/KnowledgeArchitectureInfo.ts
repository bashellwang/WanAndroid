/**
 * "children": [],
 * "courseId": 13,
 * "id": 60, // id会在查看该目录下所有文章时有用
 * "name": "Android Studio相关",
 * "order": 1000,
 * "parentChapterId": 150,
 * "visible": 1
 */
export interface KnowledgeArchitectureInfo {
  children: KnowledgeArchitectureInfo[];
  courseId: number;
  id: number;
  name: string;
  order: number;
  parentChapterId: number;
  visible: number;
}
