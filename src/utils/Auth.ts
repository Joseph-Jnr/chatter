// Check if localStorage is available (for server-side rendering)
const isLocalStorageAvailable =
  typeof window !== 'undefined' && window.localStorage

// Function to retrieve the bearer token from local storage
export const isAuthenticated = () => {
  // Initially assume the user is authenticated
  let authenticated = true

  // If localStorage is available and the token is not set, the user is not authenticated
  if (isLocalStorageAvailable && !localStorage.getItem('chatterAuthToken')) {
    authenticated = false
  }

  return authenticated
}
