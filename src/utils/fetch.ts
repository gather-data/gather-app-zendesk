import * as querystring from 'querystring';

const BASE = 'https://api.gatherdata.co';

const getUrl = (url: string, query = {}) => {
  let fullUrl = url;
  if (!url.startsWith('http')) {
    fullUrl = `${BASE}${url}`;
  }

  const stringifiedQuery = querystring.stringify(query);
  if (stringifiedQuery) {
    fullUrl = `${fullUrl}?${stringifiedQuery}`;
  }

  return fullUrl;
};

const getAuthorization = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return `Token ${token}`;
  }

  return null;
};

interface IHeaders {
  Accept: string;
  'Content-Type': string;
  Authorization?: string;
}

const getHeaders = (contentType = 'application/json') => {
  const auth = getAuthorization();

  const headers: IHeaders = {
    Accept: 'application/json',
    'Content-Type': contentType,
  };

  if (auth) {
    headers.Authorization = auth;
  }

  return headers;
};

const handleResponse = async (requestData: any, response: any) => {
  if (response.ok) {
    if (response.status === 204) {
      // No content, so return an immediately resolving promise
      return Promise.resolve();
    }
    return response.json();
  }

  let message;
  try {
    message =
      response.status < 500
        ? await response.json()
        : { detail: 'Server error' };
  } catch (error) {
    message = { detail: 'Server error' };
  }

  // Reject with Error-like Immutalbe object (we can't serialise an actaul Error object)
  return Promise.reject({
    message,
    meta: {
      ok: response.ok,
      requestData,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    },
    name: 'ApiError',
  });
};

const getPostBody = (data: any, formData = false) => {
  let body: any;
  if (formData) {
    body = new FormData();
    Object.keys(data).forEach(key => {
      body.append(key, data[key] || '');
    });
  } else {
    body = JSON.stringify(data);
  }

  return body;
};

interface IRequestOptions {
  data?: any;
  formData?: any;
  headers?: any;
  query?: any;
}

interface IFetchOptions {
  method: string;
  formData?: any;
  headers?: any;
  query?: any;
  data?: any;
  body?: any;
  credentials?: 'omit' | 'same-origin' | 'include';
}

const fetchUrl = (url: string, options: IFetchOptions) =>
  fetch(url, options).then(response => handleResponse(options, response));

const get = (
  url: string,
  { query, headers, ...rest }: IRequestOptions = {},
) => {
  const fullUrl = getUrl(url, query);
  const newHeaders = headers || getHeaders();
  return fetchUrl(fullUrl, {
    headers: newHeaders,
    method: 'GET',
    ...rest,
  });
};

const post = (
  url: string,
  { data, formData = false, query = null }: IRequestOptions = {},
) => {
  const fullUrl = getUrl(url, query);
  const headers = getHeaders(
    formData ? 'multipart/FormData' : 'application/json',
  );
  const body = getPostBody(data, formData);
  return fetchUrl(fullUrl, {
    body,
    credentials: 'include',
    headers,
    method: 'POST',
  });
};

const del = (url: string) => {
  const fullUrl = getUrl(url);
  const headers = getHeaders();
  return fetchUrl(fullUrl, {
    headers,
    method: 'DELETE',
  });
};

const put = (
  url: string,
  { data, formData = false }: { data?: any; formData?: any } = {},
) => {
  const fullUrl = getUrl(url);
  const headers = getHeaders(
    formData ? 'multipart/FormData' : 'application/json',
  );
  const body = getPostBody(data, formData);
  return fetchUrl(fullUrl, {
    body,
    headers,
    method: 'PUT',
  });
};

const patch = (url: string, { data, query = null }: IRequestOptions = {}) => {
  const fullUrl = getUrl(url, query);
  const headers = getHeaders();
  const body = getPostBody(data);
  return fetchUrl(fullUrl, {
    body,
    headers,
    method: 'PATCH',
  });
};

export { get, post, del, put, patch, BASE };
