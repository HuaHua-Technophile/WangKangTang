/**
 * @fileoverview 药品相关的类型定义文件
 * @module types/product
 * @description 包含药品SKU、药品信息以及列表查询参数等接口定义
 */

/**
 * @interface SKUItem
 * @description 药品SKU项目接口定义
 */
export interface SKUItem {
  /** 主键ID */
  id?: number;
  /** 关联的药品ID */
  productId?: number;
  /** SKU唯一编码 */
  skuCode: string;
  /** SKU当前销售价格 */
  price: number;
  /** SKU规格参数JSON字符串 */
  spData: string;
  /** 当前库存数量 */
  stock?: number;
  /** 销售数量 */
  sale?: number;
}

/**
 * @interface ProductItem
 * @description 药品信息接口定义
 */
export interface ProductItem {
  /** 主键ID */
  id?: number;
  /** 药品名称 */
  name: string;
  /** 药品主图URL地址 */
  imageUrl: string;
  /** 药品缩略图URL地址 */
  miniImg: string;
  /** 运费金额 */
  freightTemplateId: number;
  /** 所属分类ID */
  categoryId?: number;
  /** 总销量 */
  sale: number;
  /** 最低价 */
  price?: number;
  /** 药品备注信息 */
  note: string;
  /** 推荐状态: 0-不推荐, 1-推荐 */
  recommendStatus?: 0 | 1;
  /** 处方药标识: 0-非处方药, 1-处方药 */
  isPrescription?: 0 | 1;
  /** 药品详细说明(富文本格式) */
  illustrate: string;
  /**
   * 药品说明图片列表
   * @type {Array<{imageUrl: string, sort: number}>}
   */
  instructionImagesList: {
    /** 图片URL地址 */
    imageUrl: string;
    /** 图片排序序号 */
    sort: number;
  }[];
  /** 药品SKU列表 */
  skuStockList: SKUItem[];
}
