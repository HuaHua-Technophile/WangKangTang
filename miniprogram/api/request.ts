// utils/request.ts

/**
 * 请求配置接口
 */
interface RequestOptions {
  url: string; // 请求的路径（会拼接到baseURL后面）
  method?: "GET" | "POST" | "PUT" | "DELETE"; // 请求方法
  data?: Record<string, any>; // 请求体
  header?: Record<string, string>; // 自定义请求头
  needToken?: boolean; // 是否需要携带token
}

interface ApiResponse<T = any> {
  msg: string;
  data: T;
  code: number;
}

/**
 * 默认配置
 */
export const BASE_URL = "http://117.72.77.4:12759";
// 修改后的 DEFAULT_HEADERS 和 headers 定义
const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

/**
 * 获取本地存储的Token
 * @returns token字符串
 */
const getToken = (): string | null => {
  return wx.getStorageSync("token") || null;
};

/**
 * 封装的网络请求方法
 * @param options 请求配置
 * @returns Promise封装的请求结果，符合 ApiResponse 类型
 */
export const request = <T = any>(
  options: RequestOptions
): Promise<ApiResponse<T>> => {
  const {
    url,
    method = "GET",
    data = {},
    header = {},
    needToken = false,
  } = options;

  // 合并请求头
  const headers: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...header,
  };

  // 如果需要携带token，动态添加到请求头
  if (needToken) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("请求需要Token，但未找到Token，请检查！");
    }
  }

  // 返回Promise封装的请求
  return new Promise((resolve, reject) => {
    wx.request<ApiResponse<T>>({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: headers,
      success: (res) => {
        if (res.statusCode === 200) {
          const responseData = res.data;
          // 根据 code 约定判断是否成功
          if (responseData && responseData.code === 200) {
            resolve(responseData);
          } else {
            // 如果 code 不为 200，则认为是业务错误，返回 reject
            reject({
              msg: responseData.msg || "服务器业务错误",
              code: responseData.code,
              data: responseData.data,
            });
          }
        } else {
          // 处理非 200 状态码的情况
          reject({
            msg: res.data.msg || "请求失败",
            code: res.statusCode,
            data: res.data || null,
          });
        }
      },
      fail: (err) => {
        // 网络错误或其他问题
        reject({
          msg: err.errMsg || "网络请求错误",
          code: -1, // 自定义的错误码，表示请求未发送成功
          data: null,
        });
      },
    });
  });
};
