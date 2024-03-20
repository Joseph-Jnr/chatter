// Auth.ts

// Check if localStorage is available (for server-side rendering)
const isLocalStorageAvailable =
  typeof window !== 'undefined' && window.localStorage

// Function to retrieve the bearer token from local storage
export const isAuthenticated =
  isLocalStorageAvailable && !!localStorage.getItem('chatterAuthToken')
