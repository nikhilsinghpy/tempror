import { getHandler } from "./api.services";

let controller = null;
let debounceTimeout = null;
/**
 * Performs an optimized search API call with debounce & request canceling
 * @param {string} query - The search keyword
 * @param {string} endpoint - The API endpoint (e.g., "/api/users/search")
 * @param {number} delay - Debounce delay in ms (default 400)
 */
export async function searchApi(query, endpoint, delay = 400) {
  return new Promise((resolve, reject) => {
    // Cancel previous debounce timer
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      // Cancel previous API request (important for fast typing)
      if (controller) controller.abort();
      controller = new AbortController();

      if (!query.trim() || query.length < 3) return resolve([]);
      try {
        const response = await getHandler(
          `${endpoint}?search=${encodeURIComponent(query)}`,
          { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
          {},
          {
            signal: controller.signal,
          }
        );
        if (!response) throw new Error("Failed to fetch search results");
        resolve(response);
      } catch (err) {
        if (err.name === "AbortError") return;
        reject(err);
      }
    }, delay);
  });
}
