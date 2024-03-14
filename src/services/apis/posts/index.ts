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
    const url = '/bookmark/save-bookmark'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const DeleteBookmark = async (
  postId: string,
  payload: CBookmarksPayload
): Promise<any> => {
  try {
    const url = `/bookmark/remove-bookmark/${postId}`
    const res = await axios.delete(url, { data: payload })
    return res.data
  } catch (err) {
    throw err
  }
}
export const CommentPost = async (
  payload: CCommentsPayload,
  postId?: string
): Promise<any> => {
  try {
    const url = `/comment/add-comment/${postId}`
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const DeleteComment = async (
  postId: string,
  payload: CCommentsPayload
): Promise<any> => {
  try {
    const url = `/comment/remove-comment/${postId}`
    const res = await axios.delete(url, { data: payload })
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

// Get author posts
export const GetAuthorPosts = async () => {
  try {
    const url = '/post/author-posts'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get posts
export const GetSinglePost = async (postId: string) => {
  try {
    const url = `/post/${postId}`
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}
