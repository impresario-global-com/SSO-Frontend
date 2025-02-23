import { RegisterDto, useAppControllerRegister } from '@/api/auth'
import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import { Logo } from '@/components/shared/logo'
import Routes from '@/data/routes'
import AuthLayout from '@/layouts/auth-layout'
import { formatErrorMessage } from '@/lib/utils'
import { TextInput } from '@mantine/core'
import { Button } from '@mantine/core'
import { useForm, isEmail } from '@mantine/form'
import { useNavigate } from 'react-router-dom'

export function Component() {
  const navigate = useNavigate()
  const form = useForm<RegisterDto>({
    initialValues: {
      email: '',
    },

    validate: {
      email: isEmail(),
    },
  })

  const { mutate, isPending } = useAppControllerRegister({
    mutation: {
      onSuccess(data) {
        navigate(`${Routes.VERIFY}?token=${data.verificationToken}`)
      },
      onError(error) {
        form.setErrors({ email: formatErrorMessage(error) })
      },
    },
  })

  const onRegisterFormSubmit = (values: RegisterDto) => {
    mutate({ data: values })
  }

  return (
    <AuthLayout>
      <div className="m-auto w-full max-w-xs py-6 text-center">
        <Logo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />
        <h1 className="text-xl font-medium lg:text-2xxl mb-10">
          New Here?<br/>
          Create a footprint in the world of P.U.R.P.O.S.E.
        </h1>
        <form onSubmit={form.onSubmit((values) => onRegisterFormSubmit(values))}>
          <TextInput
            autoFocus
            required
            variant="filled"
            placeholder="Enter email"
            type="email"
            size="lg"
            classNames={{
              input: 'text-base rounded-xl',
            }}
            {...form.getInputProps('email')}
          />

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
            Send Verification Code
          </Button>

          <p className="mt-2 text-xs text-white/80">
            Already have an account? {''}
            <span className="cursor-pointer underline" onClick={() => navigate(Routes.LOGIN)}>
              Login Here
            </span>
          </p>
        </form>
      </div>
      <Footer />
    </AuthLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
