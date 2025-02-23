import { useProfileControllerGetUserProfile } from '@/api/auth'
import { Outlet } from 'react-router-dom'

export function Component() {
  const { data } = useProfileControllerGetUserProfile({
    query: {
      refetchOnWindowFocus: false,
    },
  })
  return <Outlet />
}
