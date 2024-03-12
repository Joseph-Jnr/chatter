export type CLoginPayload = {
  email: string
  password: string
}

export type CRegisterPayload = {
  first_name: string
  last_name: string
  role: string
  email: string
  username: string
  password: string
}

export type CVerifyOtpPayload = {
  otp: string
}
