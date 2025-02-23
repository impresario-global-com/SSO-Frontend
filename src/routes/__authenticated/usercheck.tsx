import { useProfileControllerGetUserProfile } from '@/api/auth'
import Routes from '@/data/routes'
import { accessTokenAtom, callbackUrlAtom } from '@/data/store'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '@mantine/core'
import { isEmpty } from 'lodash-es'

export function Component() {
    const [accessToken] = useAtom(accessTokenAtom)
    const [callbackUrl] = useAtom(callbackUrlAtom)
    const navigate = useNavigate()

    // Fetch user profile **ONLY IF accessToken EXISTS**
    const { data: profileInfo, isFetched } = useProfileControllerGetUserProfile({
        query: { enabled: !!accessToken },
    })

    // Redirect logic
    useEffect(() => {
        if (isFetched) {

            if (profileInfo?.pincode) {
                if (callbackUrl) {
                    // Redirect to external callback URL with token
                    const redirectUrl = `${callbackUrl}?token=${encodeURIComponent(accessToken)}`
                    window.location.href = redirectUrl
                }
            } else {
                navigate(Routes.LOCATE) // Redirect to Locate if profile is incomplete
            }
        }
    }, [profileInfo, isFetched, navigate, callbackUrl, accessToken])

    return (
        <div className="flex h-screen items-center justify-center">
            <Loader size="xl" color="blue" />
        </div>
    )
}
