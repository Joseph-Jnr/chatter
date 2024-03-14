'use client'

import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton'
import { GetProfile } from '@/services/apis'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

// Define the shape of user data
interface UserData {
  id: string
  first_name: string
  last_name: string
  user_name: string
  email: string
  role: string
  created_at: string
  imageUrl: string
}

// Create a context to store user information
const UserContext = createContext<UserData | null>(null)

// Custom hook to access user information from the context
export const useUser = (): UserData | null => useContext(UserContext)

// Provider component to wrap your app and provide the user context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Fetching profile
  //Fetching profile
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: GetProfile,
  })

  const profileData = profile?.data

  const userData: UserData = {
    id: profileData?.id,
    first_name: profileData?.first_name,
    last_name: profileData?.last_name,
    user_name: profileData?.user_name,
    email: profileData?.email,
    role: profileData?.role,
    created_at: profileData?.created_at,
    imageUrl: profileData?.imageUrl,
  }

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}
