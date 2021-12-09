const handleResponse = (res) => {
  if (!res.ok) throw new Error(`request failed`);
  return res.json();
};

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  return fetch(url).then(handleResponse);
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: file,
  }).then(handleResponse);
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export { fetchJSON, sendFile, sendJSON };
