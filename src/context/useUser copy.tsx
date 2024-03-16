'use client'

import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton'
import { GetProfile } from '@/services/apis'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

// Define the shape of user data
interface UserData {
  followers: []
  following: []
  posts: []
  userInfo: {
    id: string
    first_name: string
    last_name: string
    user_name: string
    email: string
    role: string
    imageUrl: string
  }
}

// Create a context to store user information
const UserContext = createContext<UserData | null>(null)

// Custom hook to access user information from the context
export const useUser = (): UserData | null => useContext(UserContext)

// Provider component to wrap your app and provide the user context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Fetching profile
  //Fetching profile
  const { data: profile, isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: GetProfile,
  })

  const profileData = profile?.data

  const userData: UserData = {
    followers: profileData?.followers,
    following: profileData?.following,
    posts: profileData?.posts,
    userInfo: profileData?.exists,
  }

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}
