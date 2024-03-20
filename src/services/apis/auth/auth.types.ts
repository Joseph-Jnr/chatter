export type CLoginPayload = {
  email: string
  password: string
}

export type CRegisterPayload = {
  first_name: string
  last_name: string
  email: string
  user_name: string
  password: string
}

export type CGoogleAuthPayload = {
  first_name: string
  last_name: string
  email: string
  user_name: string
  imageUrl: string
}

export type CVerifyOtpPayload = {
  otp: string
}
