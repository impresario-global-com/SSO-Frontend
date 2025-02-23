import { VerifyDto, useAppControllerVerify } from '@/api/auth'
import { Logo } from '@/components/shared/logo'
import Routes from '@/data/routes'
import { accessTokenAtom } from '@/data/store'
import AuthLayout from '@/layouts/auth-layout'
import { OTP_SIZE } from '@/lib/constants'
import { formatErrorMessage } from '@/lib/utils'
import { Button, PinInput } from '@mantine/core'
import { hasLength, useForm } from '@mantine/form'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AppError from '@/components/shared/app-error'
import Footer from '@/components/footer'

export function Component() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isDisabled, setIsDisabled] = useState(true)
  const [timer, setTimer] = useState(30)

  const form = useForm<VerifyDto>({
    initialValues: {
      otp: '',
      verificationToken: '',
    },
    validate: {
      otp: hasLength(OTP_SIZE, `OTP must be ${OTP_SIZE} digits`),
    },
  })

  // Mutation: Verify OTP
  const { mutate, isPending } = useAppControllerVerify({
    mutation: {
      onSuccess(data) {
        setAccessToken(data.authenticationToken) // Store token
        navigate(Routes.USER_CHECK) // Redirect to UserCheck page
      },
      onError(error) {
        form.setErrors({ otp: formatErrorMessage(error) })
      },
    },
  })

  // Capture token from URL
  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      form.setFieldValue('verificationToken', token)
    } else {
      navigate(Routes.LOGIN)
    }
  }, [searchParams])

  // OTP Resend Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(timeout)
    } else {
      setIsDisabled(false)
    }
  }, [timer])

  return (
      <AuthLayout>
        <div className="w-full max-w-xs py-6 text-center">
          <Logo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />
          <h1 className="text-xl font-medium lg:text-2xxl">OTP Verification</h1>
          <p className="mb-4 mt-2 text-sm font-light opacity-80 lg:text-base">
            We have sent the verification code to your email
          </p>

          <form onSubmit={form.onSubmit((values) => mutate({ data: values }))}>
            <PinInput
                autoFocus
                oneTimeCode
                type="number"
                size="lg"
                radius="md"
                variant="filled"
                className="justify-center"
                {...form.getInputProps('otp')}
            />
            {form.errors.otp && (
                <p className="mt-2 text-xs text-error">{form.errors.otp}</p>
            )}

            <Button
                loading={isPending}
                type="submit"
                variant="white"
                size="lg"
                radius="xl"
                color="#101010"
                fullWidth
                className="mt-8 text-gray"
            >
              Verify
            </Button>
          </form>
        </div>
        <Footer />
      </AuthLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
