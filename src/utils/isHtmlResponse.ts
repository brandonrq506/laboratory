/**
 * Checks if a response has HTML content type
 * @param headers - The response headers object
 * @returns true if the response contains HTML content, false otherwise
 */
export const isHtmlResponse = (headers: Record<string, unknown>): boolean => {
  const contentType = headers["Content-Type"]?.toString().toLowerCase();
  return Boolean(contentType && contentType.includes("text/html"));
};
