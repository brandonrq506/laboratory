const CONTENT_TYPE_HEADER = "content-type";

interface HeaderWithGetter {
  get: (header: string) => unknown;
}

const hasGetter = (headers: unknown): headers is HeaderWithGetter => {
  return (
    typeof headers === "object" &&
    headers !== null &&
    "get" in headers &&
    typeof headers.get === "function"
  );
};

const getHeaderValue = (
  headers: Record<string, unknown>,
  targetHeader: string,
): unknown => {
  const matchedHeader = Object.entries(headers).find(([headerName]) => {
    return headerName.toLowerCase() === targetHeader;
  });

  return matchedHeader?.[1];
};

const getContentType = (
  headers: Record<string, unknown>,
): string | undefined => {
  const contentType = hasGetter(headers)
    ? headers.get("Content-Type")
    : getHeaderValue(headers, CONTENT_TYPE_HEADER);

  return typeof contentType === "string"
    ? contentType.toLowerCase()
    : undefined;
};

/**
 * Checks if a response has HTML content type.
 *
 * Header names are case-insensitive in HTTP, and axios may expose headers either
 * as a key-value map or via a `get()` API.
 */
export const isHtmlResponse = (headers: Record<string, unknown>): boolean => {
  const contentType = getContentType(headers);
  return Boolean(contentType?.includes("text/html"));
};
