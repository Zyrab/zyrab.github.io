export const fetchJson = async (url) => {
  try {
    const encodedUrl = encodeURIComponent(url);
    const local = sessionStorage.getItem(encodedUrl);
    if (local) {
      return JSON.parse(local);
    }
    const response = await fetch(url);
    const data = await response.json();
    sessionStorage.setItem(encodedUrl, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
};
