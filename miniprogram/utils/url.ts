// utils/url.ts
import { BASE_URL } from "../api/request";

/**
 * 拼接完整资源URL
 * @param path - 资源相对路径
 * @returns 完整URL字符串
 *
 * @example
 * resolveImageUrl('/image.jpg') => 'https://api.com/image.jpg'
 * resolveImageUrl('https://cdn.com/img.jpg') => 'https://cdn.com/img.jpg'
 */
export const resolveImageUrl = (path?: string): string => {
  if (!path) return ""; // 处理空路径情况

  // 保留已包含完整URL的情况
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  // 处理路径开头的斜线问题
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBase}${cleanPath}`;
};
