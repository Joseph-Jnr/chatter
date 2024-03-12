/* eslint-disable no-useless-catch */
import axios from '@/services/axios'

// Get all users bookmarks
export const GetAllBookmarks = async () => {
  try {
    const url = '/bookmarks/all'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}
