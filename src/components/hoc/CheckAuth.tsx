import { isAuthenticated } from '@/utils/Auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const CheckAuthStatus = (WrappedComponent: React.FC<any>) => {
  const AuthChecker: React.FC<any> = (props) => {
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/sign-in')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return AuthChecker
}

export default CheckAuthStatus
