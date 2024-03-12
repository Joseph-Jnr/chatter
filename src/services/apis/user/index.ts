/* eslint-disable no-useless-catch */
import axios from '@/services/axios'
import { CFollowerPayload } from './user.types'

/**
 * Description: Send data to add a new follower
 * @param  {CFollowerPayload} payload
 * @returns Promise
 */
export const AddFollower = async (payload: CFollowerPayload): Promise<any> => {
  try {
    const url = '/followers/add'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get profile
export const GetProfile = async () => {
  try {
    const url = '/profile'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}

// Get a Chatter user profile
export const GetUser = async () => {
  try {
    const url = '/user'
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

// Get followers
export const GetFollowers = async () => {
  try {
    const url = '/followers'
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}
