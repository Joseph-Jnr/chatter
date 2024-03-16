/* eslint-disable no-useless-catch */
import axios from '@/services/axios'
import { CFollowerPayload, CProfilePayload } from './user.types'

/**
 * Description: Send data to add a new follower
 * @param  {CFollowerPayload} payload
 * @param  {CProfilePayload} payload
 * @returns Promise
 */
export const FollowUser = async (
  userId: string,
  payload: CFollowerPayload
): Promise<any> => {
  try {
    const url = `/followers/follow/${userId}`
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const UnfollowUser = async (
  userId: string,
  payload: CFollowerPayload
): Promise<any> => {
  try {
    const url = `/followers/unfollow/${userId}`
    const res = await axios.delete(url, { data: payload })
    return res.data
  } catch (err) {
    throw err
  }
}

// Get followers
export const GetAllFollowers = async () => {
  try {
    const url = '/followers/followers-list'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get following
export const GetAllFollowing = async () => {
  try {
    const url = '/followers/following-list'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get profile
export const GetProfile = async () => {
  try {
    const url = '/user/profile'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}

export const UpdateProfilePicture = async (
  payload: CProfilePayload
): Promise<any> => {
  try {
    const url = '/user/profile/image-update'
    const res = await axios.put(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get a Chatter user profile
export const GetUser = async (username: string) => {
  try {
    const url = `/user/profile/username?q=${username}`
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get a random Chatter users profile
export const GetUsers = async () => {
  try {
    const url = '/user/all'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}
