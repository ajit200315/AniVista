export function fetchWithRetry(
  url,
  options = {},
  retries = 3,
  delay = 500
) {
  return fetch(url, options)
    .then(res => {
      if (!res.ok && retries > 0) {
        // wait for `delay` ms, then retry
        return new Promise(resolve => setTimeout(resolve, delay))
          .then(() =>
            fetchWithRetry(url, options, retries - 1, delay * 2)
          );
      }
      if (!res.ok) {
        // out of retries or non-retriable status
        return Promise.reject(new Error(`API error ${res.status}`));
      }
      return res;
    })
    .catch(err => {
      if (retries > 0) {
        // network error or other, back off and retry
        return new Promise(resolve => setTimeout(resolve, delay))
          .then(() =>
            fetchWithRetry(url, options, retries - 1, delay * 2)
          );
      }
      return Promise.reject(err);
    });
}