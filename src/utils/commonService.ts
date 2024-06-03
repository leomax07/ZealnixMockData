import request from "./interceptor";

export const getRequest = async (url: string, params?: object) => {
  const res = await request.get(url, { params });
  return res;
};

export const postRequest = async (
  url: string,
  payload?: object,
  params?: object,
) => {
  const res = await request.post(url, payload, {
    params,
  });
  return res;
};

export const putRequest = async (
  url: string,
  payload?: object,
  params?: object,
) => {
  const res = await request.put(url, payload, { params });
  return res;
};

export const deleteRequest = async (url: string, params?: object) => {
  const res = await request.delete(url, { params });
  return res;
};

export const patchRequest = async (
  url: string,
  payload?: object,
  params?: object,
) => {
  const res = await request.patch(url, payload, { params });
  return res;
};
