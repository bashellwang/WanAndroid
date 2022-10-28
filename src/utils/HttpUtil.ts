const TAG = '[NetWork] ';
function request(
  method: string,
  url: string,
  params = {},
  config: RequestInit = {},
) {
  console.log(TAG + 'request url: ' + url);

  let requestConfig: RequestInit = {
    credentials: 'same-origin',
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors', // 用来决定是否允许跨域请求  值有 三个 same-origin，no-cors（默认）以及 cores;
    cache: 'force-cache', // 是否缓存请求资源 可选值有 default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
  };
  // 拷贝合并请求配置
  requestConfig = Object.assign(requestConfig, config);

  if (method === 'GET') {
    // 拷贝合并请求参数
    requestConfig = Object.assign(requestConfig, params);
  } else if (method === 'POST') {
    // 给 body 塞入请求参数
    requestConfig = Object.assign(requestConfig, {
      body: {
        value: JSON.stringify(params),
      },
    });
  }
  console.log(TAG + 'request params: ' + JSON.stringify(requestConfig));

  return new Promise((resolve, reject) => {
    fetch(url, requestConfig)
      .then(response => {
        console.log(TAG + 'response: ' + JSON.stringify(response));
        return response.json();
      })
      .then(responObj => {
        let errorCode = responObj.errorCode;
        let errorMsg = responObj.errorMsg;
        console.log(
          TAG + 'errorCode: ' + errorCode + ', errorMsg: ' + errorMsg,
        );
        if (errorCode !== 0) {
          reject(errorMsg);
        } else {
          resolve(responObj);
        }
      })
      .catch(err => {
        console.log(TAG + 'request error: ' + err);
        reject(err);
      });
  });
}

export default class HttpUtil {
  static sendGet(url, params = {}) {
    return request('GET', url, params);
  }

  static sendPost(url, params = {}) {
    return request('POST', url, params);
  }
}
