import { LoginDto, useAppControllerLogin } from '@/api/auth'
import { Logo } from '@/components/shared/logo'
import AuthLayout from '@/layouts/auth-layout'
import { formatErrorMessage } from '@/lib/utils'
import { TextInput } from '@mantine/core'
import { Button } from '@mantine/core'
import { useForm, isEmail } from '@mantine/form'
import Routes from '@/data/routes'
import { useNavigate } from 'react-router-dom'
import AppError from '@/components/shared/app-error'
import Footer from '@/components/footer'

export function Component() {
    const navigate = useNavigate()
    const form = useForm<LoginDto>({
        initialValues: {
            email: '',
        },

        validate: {
            email: isEmail(),
        },
    })

    const { mutate, isPending } = useAppControllerLogin({
        mutation: {
            onSuccess(data) {
                navigate(`${Routes.VERIFY}?token=${data.verificationToken}`)
            },
            onError(error) {
                form.setErrors({ email: formatErrorMessage(error) })
            },
        },
    })

    const onLoginFormSubmit = (values: LoginDto) => {
        mutate({ data: values })
    }

    return (
        <AuthLayout>
            <div className="m-auto w-full max-w-xs py-6 text-center">
                <Logo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />
                <h1 className="text-xl font-medium lg:text-2xxl">Welcome back! 😇</h1>
                <p className="mb-4 mt-2 text-sm font-light opacity-80 lg:text-base">
                    Hey! good to see you again
                </p>

                <form onSubmit={form.onSubmit((values) => onLoginFormSubmit(values))}>
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
                        New here? {''}
                        <span className="cursor-pointer underline" onClick={() => navigate(Routes.REGISTER)}>
              Create an Account
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