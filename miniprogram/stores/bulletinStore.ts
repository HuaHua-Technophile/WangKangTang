// store/bulletin.store.ts
import { observable, action } from "mobx-miniprogram";
import { BulletinItem } from "../types/index";

export const bulletinStore = observable({
  bulletins: [] as BulletinItem[], // 使用类型断言，确保初始类型正确

  /**
   * 设置公告列表
   * @param newBulletins - 新的公告列表
   */
  setBulletins: action(function (
    this: typeof bulletinStore,
    newBulletins: BulletinItem[]
  ) {
    this.bulletins = newBulletins;
  }),

  /**
   * 根据 ID 查找公告
   * @param id - 公告的 ID
   * @returns 找到的公告，如果没找到则返回 undefined
   */
  findBulletinById: function (id: number): BulletinItem | undefined {
    return this.bulletins.find((bulletin) => bulletin.id === id);
  },
});
