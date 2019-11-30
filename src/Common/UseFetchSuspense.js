import LRU from "lru-cache";
import md5 from "md5";

const cache = new LRU(50);
if (process.env.NODE_ENV === "development") {
  window.useFetchCache = cache;
}

const useFetch = (
  url,
  fetchOptions = {},
  processResponse = handleResponse
) => {
  // Generate cache key
  const key = `${url}.${md5(JSON.stringify(fetchOptions))}`;
  // Load value from cache or initiate
  const value = cache.get(key) || { status: "new", data: null };

  if (value.status === "resolved") {
    return value.data;
  }

  const promise = fetch(url, fetchOptions)
    .then(response =>
      processResponse(response)
  );

  promise
    .then(data => {
      value.status = "resolved";
      value.data = data;
      cache.set(key, value);
     })
    .catch(error => {return error;} );

  throw promise;
};

export default useFetch;

function handleResponse (response) {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response)
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}

function handleJSONResponse (response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }))
      }
    })
}

function handleTextResponse (response) {
  return response.text()
    .then(text => {
      if (response.ok) {
        return text
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          err: text
        })
      }
    })
}