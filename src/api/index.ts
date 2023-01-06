import HttpRequest from "./request"

const apiKey = 'xJ2cIK5dcdd7f3de4e25af6dc59578af05b17eee4e58bdc';

export const getDags = async (data: any) => {
  data.append('apiKey', apiKey)
  return HttpRequest({
    url: '/common/dogFamily/queryDogList',
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    interceptors: {
      requestInterceptors(res) {
        return res;
      },
      responseInterceptors(result) {
        return result;
      },
    },
  });
}
