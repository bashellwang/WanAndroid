export interface WendaReq {
  pageId: number; //pageId,拼接在链接上，pageId 从 1 开始。
  pageSize?: number; //支持传入 page_size 控制分页数量，取值为[1-40]，不传则使用默认值，一旦传入了 page_size，后续该接口分页都需要带上，否则会造成分页读取错误。
}
