// pages/bulletin-detail/bulletin-detail.ts
import { bulletinStore } from "../../stores/bulletinStore";
import { BulletinItem } from "../../types/index";
import { formatTime, getLatestTime } from "../../utils/data";
import { resolveImageUrl } from "../../utils/url";

Page({
  data: {
    bulletinDetail: null as
      | (BulletinItem & {
          displayTime?: string;
          fullImageUrl?: string;
        })
      | null,
  },

  onLoad(options) {
    const bulletinId = Number(options.id);

    if (bulletinId) {
      const bulletin = bulletinStore.findBulletinById(bulletinId);
      if (bulletin) {
        this.processTimeDisplay(bulletin);
        console.log("当前公告为=>", bulletin);
      } else {
        console.warn(`未找到 ID 为 ${bulletinId} 的公告`);
      }
    }
  },

  /**
   * 处理时间显示和图片URL拼接
   */
  processTimeDisplay(bulletin: BulletinItem) {
    const latestTime = getLatestTime(bulletin.updateTime, bulletin.createTime);
    const displayTime = formatTime(latestTime);

    // 处理图片URL
    const fullImageUrl = bulletin.imgUrl
      ? resolveImageUrl(bulletin.imgUrl)
      : undefined;

    this.setData({
      bulletinDetail: {
        ...bulletin,
        displayTime: displayTime || "暂无时间信息",
        fullImageUrl,
      },
    });
  },
});
