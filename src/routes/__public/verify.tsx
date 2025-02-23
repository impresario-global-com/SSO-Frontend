import {
  VerifyDto,
  useAppControllerResendCode,
  useAppControllerVerify,
  useProfileControllerGetUserProfile
} from '@/api/auth'
import { Logo } from '@/components/shared/logo'
import Routes from '@/data/routes'
import { accessTokenAtom } from '@/data/store'
import AuthLayout from '@/layouts/auth-layout'
import { OTP_SIZE } from '@/lib/constants'
import { formatErrorMessage } from '@/lib/utils'
import { Button, PinInput } from '@mantine/core'
import { hasLength, useForm } from '@mantine/form'
import {useAtom, useSetAtom} from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Unless, When } from 'react-if'
import AppError from '@/components/shared/app-error'
import Footer from '@/components/footer'
import {isEmpty} from "lodash-es";

export function Component() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isDisabled, setIsDisabled] = useState(true)
  const [timer, setTimer] = useState(30)
  const [otpResendCounter, setOtpResendCounter] = useState(0)

  const { data: profileInfo } = useProfileControllerGetUserProfile({
    query: {
      enabled: !!accessToken,
    },
  })

  const form = useForm<VerifyDto>({
    initialValues: {
      otp: '',
      verificationToken: '',
    },
    validate: {
      otp: hasLength(OTP_SIZE, `OTP must be ${OTP_SIZE} digit`),
    },
  })

  const { mutate, isPending } = useAppControllerVerify({
    mutation: {
      onSuccess(data) {
        setAccessToken(data.authenticationToken)
        if(profileInfo){
          if(!isEmpty(profileInfo.pincode)){
            const redirectUrl = `${callbackUrl}?token=${encodeURIComponent(accessToken)}`;
            // Redirect user
            window.location.href = redirectUrl;
          }
          else{
            navigate(Routes.LOCATE)
          }
        }
      },
      onError(error) {
        form.setErrors({ otp: formatErrorMessage(error) })
      },
    },
  })

  const { mutate: mutateResendCode } = useAppControllerResendCode({
    mutation: {
      onSuccess() {
        setIsDisabled(true)
        setTimer(60)
        setOtpResendCounter((prev) => prev + 1)
      },
      onError(error) {
        form.setErrors({ otp: formatErrorMessage(error) })
      },
    },
  })

  const onVerifyFormSubmit = (values: VerifyDto) => {
    mutate({ data: values })
  }

  useEffect(() => {
    const token = searchParams.get('token')
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ABab][0-9a-f]{3}-[0-9a-f]{12}$/

    if (token && uuidV4Regex.test(token)) {
      form.setFieldValue('verificationToken', token)
    } else {
      navigate(Routes.LOGIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000)
    } else {
      setIsDisabled(false)
    }
  }, [timer])

  return (
    <AuthLayout>
      <div className="w-full max-w-xs py-6 text-center">
        <Logo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />
        <h1 className="text-xl font-medium lg:text-2xxl">OTP verification</h1>
        <p className="mb-4 mt-2 text-sm font-light opacity-80 lg:text-base">
          We have sent the verification code to your email
        </p>

        <form onSubmit={form.onSubmit((values) => onVerifyFormSubmit(values))}>
          <PinInput
            autoFocus
            oneTimeCode
            type="number"
            placeholder=""
            size="lg"
            radius="md"
            variant="filled"
            className="justify-center"
            {...form.getInputProps('otp')}
          />

          {form.errors.otp && (
            <p className="mt-2 whitespace-pre-line text-xs text-error">{form.errors.otp}</p>
          )}

          <Unless condition={otpResendCounter > 2}>
            <button
              type="button"
              className={`mt-2 text-sm ${isDisabled ? 'text-zinc' : 'underlined'}`}
              disabled={isDisabled}
              onClick={() =>
                mutateResendCode({ data: { verificationToken: form.values.verificationToken } })
              }
            >
              Resend OTP <When condition={isDisabled}>in {timer}s</When>{' '}
            </button>
          </Unless>

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
