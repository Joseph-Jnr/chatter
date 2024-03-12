/* eslint-disable no-useless-catch */
import axios from '@/services/axios'
import {
  CBookmarksPayload,
  CCommentsPayload,
  CLikesPayload,
  CPostPayload,
  CSearchPayload,
} from './posts.types'

/**
 * Description: Send post data
 * @param  {CPostPayload} payload
 * @param  {CLikesPayload} payload
 * @param  {CCommentsPayload} payload
 * @param  {CBookmarksPayload} payload
 * @param  {CSearchPayload} payload
 * @returns Promise
 */
export const CreateNewPost = async (payload: CPostPayload): Promise<any> => {
  try {
    const url = '/post/new'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const LikePost = async (payload: CLikesPayload): Promise<any> => {
  try {
    const url = '/post/like'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const BookmarkPost = async (
  payload: CBookmarksPayload
): Promise<any> => {
  try {
    const url = '/post/bookmark'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const CommentPost = async (payload: CCommentsPayload): Promise<any> => {
  try {
    const url = '/post/comment'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const SearchChatter = async (payload: CSearchPayload): Promise<any> => {
  try {
    const url = '/post/search'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get posts
export const GetPosts = async () => {
  try {
    const url = '/post'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}
