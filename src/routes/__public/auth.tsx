import AuthLayout from '@/layouts/auth-layout'
import { LinkButton } from '@/components/shared/buttons'
import Routes from '@/data/routes'
import AppError from '@/components/shared/app-error'
import Footer from '@/components/footer'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/shared/logo'
import { useAtom } from 'jotai'
import { accessTokenAtom, callbackUrlAtom } from '@/data/store'
import { Loader } from '@mantine/core' // Import Mantine's Loader (or use Tailwind alternative)

export function Component() {
  const [callbackUrl, setCallbackUrl] = useAtom(callbackUrlAtom)
  const [accessToken] = useAtom(accessTokenAtom)
  const [loading, setLoading] = useState(true) // Track loading state

  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const queryCallback = params.get('callback')

    if (accessToken) {
      const redirectUrl = `${callbackUrl}?token=${encodeURIComponent(accessToken)}`
      window.location.href = redirectUrl
    } else {
      setLoading(false) // Stop loading if no token is found
    }

    if (queryCallback) {
      setCallbackUrl(queryCallback)
    }
  }, [location.search, accessToken, setCallbackUrl, callbackUrl])

  // Show loader while checking for accessToken
  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader size="xl" color="blue" />
        </div>
    )
  }

  return (
      <AuthLayout>
        <div className="m-auto max-w-xl py-6 text-center">
          <Logo className="mx-auto mb-20 w-20 lg:h-auto lg:w-auto" />
          <h1 className="text-xl font-medium lg:text-2xxl">Do you have a P.U.R.P.O.S.E. account?</h1>
          <div className="max-w-xs m-auto">
            <p className="mt-2 text-sm font-light opacity-80 lg:text-base"></p>
            <LinkButton href={Routes.LOGIN} fullWidth className="mt-6 mb-3">
              Yes, I am a Pro!
            </LinkButton>
            <div className="relative my-4">
            <span className="absolute -top-2 left-1/2 block w-12 -translate-x-1/2 bg-[#161616] text-xs text-white/50">
              or
            </span>
              <hr className="w-full text-white/20" />
            </div>
            <LinkButton href={Routes.REGISTER} variant="white" fullWidth className="mt-3 mb-5">
              No, can't wait to sign up!
            </LinkButton>
          </div>
        </div>
        <Footer />
      </AuthLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
