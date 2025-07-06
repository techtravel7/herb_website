/**
 * @file utils.ts
 * @description Provides common utility functions for the application,
 * including URL creation.
 */

/**
 * Generates a formatted URL for internal application pages.
 * This function is used to ensure consistent URL structures across the application.
 *
 * @param path The path or page name to generate the URL for.
 * This can be a simple page name (e.g., "Dashboard", "Search")
 * or a path with query parameters (e.g., "HerbDetail?id=123").
 * @returns The full URL for the specified path within the application.
 */
export function createPageUrl(path: string): string {
  // Define a base path for your application if it's deployed under a sub-directory.
  // For a root-level deployment, this can be an empty string or just "/".
  // Example: If your app is at 'https://yourdomain.com/botanical-app/', use '/botanical-app/'.
  const BASE_URL_PATH = '/'; // Adjust this if your React app is not hosted at the root

  // Ensure the base path ends with a slash if it's not empty, and the given path doesn't start with one
  const normalizedBasePath = BASE_URL_PATH.endsWith('/') && path.startsWith('/')
    ? BASE_URL_PATH.slice(0, -1) // Remove trailing slash from base if path has leading slash
    : BASE_URL_PATH;

  // Construct the full URL.
  // This assumes your React Router setup handles paths relative to the root.
  // For example, if path is "Dashboard", it becomes "/Dashboard".
  // If path is "HerbDetail?id=123", it becomes "/HerbDetail?id=123".
  return `${normalizedBasePath}${path}`;
}

// You can add other utility functions here as needed, for example:
/**
 * Formats a date string into a more readable format.
 * @param dateString The date string to format.
 * @returns A formatted date string.
 */
export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  try {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Invalid Date';
  }
}

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
