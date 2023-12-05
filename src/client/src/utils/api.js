/**
 *
 * @param {string} type
 * @param {string} path
 * @returns json data send from backend or null if an error occurs
 */
export const serverFetch = async (type, path, body = null) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: type
    }).catch((reason) => {
      console.warn(reason);
      return null;
    });

    const data = await response.json();

    return data;
  } catch (e) {
    return null;
  }
};

export const serverPost = async (type, path, body = null) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: type,
      body: JSON.stringify(body)
    }).catch((reason) => {
      console.warn(reason);
      return null;
    });

    const data = await response.json();

    return data;
  } catch (e) {
    return null;
  }
};
