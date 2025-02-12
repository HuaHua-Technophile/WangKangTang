// 在工具文件 utils/date.ts 中
/**
 * 将ISO时间转换为本地化格式字符串
 * @param isoTime - ISO 8601格式时间字符串
 * @returns 格式化后的时间字符串，格式：YYYY年MM月DD日 HH:mm
 */
export const formatTime = (isoTime?: string): string => {
  if (!isoTime) return "暂无时间";

  try {
    const date = new Date(isoTime);
    // 处理iOS系统兼容性问题，替换中间的T和时区部分
    const fixedDate = new Date(
      date.toISOString().replace("T", " ").split(".")[0]
    );
    return fixedDate
      .toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\//g, "-");
  } catch {
    return "时间格式错误";
  }
};

/**
 * 获取两个时间中较晚的时间
 * @param timeA - 第一个时间字符串
 * @param timeB - 第二个时间字符串
 * @returns 较晚的时间字符串，若都无效则返回空字符串
 */
export const getLatestTime = (timeA?: string, timeB?: string): string => {
  const timeStampA = timeA ? new Date(timeA).getTime() : 0;
  const timeStampB = timeB ? new Date(timeB).getTime() : 0;

  if (timeStampA > timeStampB) return timeA || "";
  return timeB || "";
};
