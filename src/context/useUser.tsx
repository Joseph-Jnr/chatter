'use client'

import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetProfile } from '@/services/apis'

// Define the shape of user data
export interface UserData {
  followers: []
  following: []
  posts: Post[]
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

interface Post {
  id: string
  title: string
  content: string
  imageUrl: string
  likes: any[] | null
  authorId: string
  comments: any[] | null
  views: number
  duration: number
  slug: string
  bookmarks: any[] | null
  created_at: string
  updated_at: string
  tags: string[]
  excerpt: string
  category: string
}

// Create a context to store user information
interface UserContextData {
  userData: UserData | null
}

// Create a context to store fetching related information
interface FetchingContextData {
  isFetching: boolean
  refetch: () => void
}

export const UserContext = createContext<UserContextData | null>(null)
export const FetchingContext = createContext<FetchingContextData | null>(null)

// Provider component to wrap your app and provide the user context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // Fetching profile
  const {
    data: profile,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: GetProfile,
  })

  const profileData = profile?.data

  const userData: UserData = {
    followers: profileData?.followers,
    following: profileData?.following,
    posts: profileData?.posts,
    userInfo: profileData?.author,
  }

  return (
    <UserContext.Provider value={{ userData }}>
      <FetchingContext.Provider value={{ isFetching, refetch }}>
        {children}
      </FetchingContext.Provider>
    </UserContext.Provider>
  )
}

// Custom hook to access user information from the context
export const useUser = (): UserData | null => {
  const userContextData = useContext(UserContext)
  return userContextData ? userContextData.userData : null
}

// Custom hook to access fetching related information from the context
export const useFetching = (): FetchingContextData | null => {
  const fetchingContextData = useContext(FetchingContext)
  return fetchingContextData
}
