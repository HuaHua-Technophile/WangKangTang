// index.ts
// 获取应用实例

Page({
  data: {
    themeClass: "bs-theme-light", // 默认主题类名
  },
  /**
   * 检测暗色模式并修改页面类名
   */
  detectDarkMode() {
    try {
      // 获取基础信息
      const appBaseInfo = wx.getAppBaseInfo();
      console.log("getAppBaseInfo=>", appBaseInfo);
      const isDarkMode = appBaseInfo.theme === "dark";

      // 根据暗色模式状态动态设置类名
      this.setData({
        themeClass: isDarkMode ? "bs-theme-dark" : "bs-theme-light",
      });

      console.log(`当前主题为: ${isDarkMode ? "暗色模式" : "亮色模式"}`);
    } catch (error) {
      console.error("获取设备主题信息失败:", error);
    }
  },
  onLoad() {
    this.detectDarkMode();
  },
});
