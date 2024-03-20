export default function extractUsernameFromEmail(email: string) {
  // Split the email by "@" symbol
  const parts = email.split('@')
  // Return the first part of the split array, which is the username
  return parts[0]
}
