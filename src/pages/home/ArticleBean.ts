export interface ArticleTag {
  name: string;
  url: string;
}

export interface ArticleBean {
  adminAdd: boolean;
  apkLink: string;
  audit: number;
  canEdit: boolean;
  author: string;
  chapterId: number;
  chapterName: string;
  collect: boolean;
  courseId: number;
  desc: string;
  descMd: string;
  envelopePic: string;
  fresh: boolean;
  host: string;
  id: number;
  isAdminAdd: boolean;
  link: string;
  niceDate: string;
  niceShareDate: string;
  origin: string;
  prefix: string;
  projectLink: string;
  publishTime: number;
  realSuperChapterId: number;
  selfVisible: number;
  shareDate: number;
  shareUser: string;
  superChapterId: number;
  superChapterName: string;
  tags: ArticleTag[];
  title: string;
  type: number;
  userId: number;
  visible: number;
  zan: number;
}
