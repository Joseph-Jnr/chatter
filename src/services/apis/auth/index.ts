/* eslint-disable no-useless-catch */
import axios from '@/services/axios'
import {
  CLoginPayload,
  CRegisterPayload,
  CVerifyOtpPayload,
} from './auth.types'

/**
 * Description: Send authentication data
 * @param  {CLoginPayload} payload
 * @param  {CRegisterPayload} payload
 * @param  {CVerifyOtpPayload} payload
 * @returns Promise
 */
export const Login = async (payload: CLoginPayload): Promise<any> => {
  try {
    const url = '/user/login'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const AuthRegister = async (payload: CRegisterPayload): Promise<any> => {
  try {
    const url = '/user/register'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
export const AuthGoogle = async (payload: CRegisterPayload): Promise<any> => {
  try {
    const url = '/user/google/register'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}

export const VerifyOtp = async (payload: CVerifyOtpPayload): Promise<any> => {
  try {
    const url = '/otp-verification'
    const res = await axios.post(url, payload)
    return res.data
  } catch (err) {
    throw err
  }
}
