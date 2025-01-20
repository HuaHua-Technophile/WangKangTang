// index.ts
// 获取应用实例

import { BASE_URL, request } from "../../api/request";

import { AdvertiseItem, ProductItem } from "../../types/index";

Page({
  data: {
    banners: [] as AdvertiseItem[], // 初始化轮播图数据
    BASE_URL,
    hotProducts: [] as ProductItem[],
  },
  /**
   * 获取轮播图数据
   */
  async fetchBannerData() {
    try {
      // 请求后端接口获取数据
      const res = await request<AdvertiseItem[]>({
        url: "/wx/home/noToken/showIndexBanner",
      });
      console.log("首页轮播图数据=>", res.data);
      if (res.code == 200)
        // 更新小程序页面数据
        this.setData({
          banners: res.data,
        });
    } catch (error) {
      console.error("获取轮播图数据失败：", error);
    }
  },
  /**
   * 点击轮播图图片的事件处理
   * @param e 事件对象
   */
  onBannerClick(e: WechatMiniprogram.BaseEvent) {
    const url = e.currentTarget.dataset.url;
    const startTime = e.currentTarget.dataset.starttime;
    const endTime = e.currentTarget.dataset.endtime;
    // 获取当前时间（ISO 8601 格式）
    const now = new Date().toISOString();

    // 判断活动是否在有效期内
    if (startTime && endTime) {
      if (now < startTime) {
        wx.showToast({
          title: "活动尚未开始",
          icon: "none",
        });
        return;
      }
      if (now > endTime) {
        wx.showToast({
          title: "活动已结束",
          icon: "none",
        });
        return;
      }
    }

    if (url) {
      // 跳转到指定链接
      /* wx.navigateTo({
        url,
      }); */
    } else {
      wx.showToast({
        title: "暂无链接",
        icon: "none",
      });
    }
  },

  /**
   * 获取热销商品数据并随机添加“必备药品”标签
   */
  async fetchHotProducts() {
    try {
      // 发送请求获取商品数据
      const res = await request<ProductItem[]>({
        url: "/wx/home/noToken/getProductBySale",
      });

      console.log("热销商品=>", res);

      if (res.code === 200) {
        // 对返回的数据进行处理，随机添加 isEssential 属性
        const processedProducts = res.data.map((product) => {
          return {
            ...product,
            // 30% 的概率添加“必备药品”标识
            isEssential: Math.random() < 0.3,
          };
        });

        // 更新 hotProducts 数据
        this.setData({ hotProducts: processedProducts });
      } else {
        console.error("获取热销商品失败：", res.msg);
      }
    } catch (error) {
      console.error("请求热销商品数据时出错：", error);
    }
  },
  async onLoad() {
    await this.fetchBannerData();
    await this.fetchHotProducts();
  },
});
