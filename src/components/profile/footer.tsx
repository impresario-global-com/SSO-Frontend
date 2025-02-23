import {
  CreateFeedbackDto,
  useSurveyControllerCreateFeedback,
  useSurveyControllerGetFeedback,
} from '@/api/survey'
import { SURVEY_ID } from '@/lib/constants'
import { Button, Modal, Rating, Textarea, Divider } from '@mantine/core'
import { isInRange, useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { delay } from 'lodash-es'
import { useEffect } from 'react'

const ProfileFooter = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const {
    data: feedbackData,
    isLoading,
    error,
  } = useSurveyControllerGetFeedback(SURVEY_ID, {
    query: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  })
  const form = useForm<CreateFeedbackDto>({
    initialValues: {
      rating: 0,
    },
    validate: {
      rating: isInRange({ min: 1, max: 5 }, 'Please provide a rating'),
    },
  })

  const { mutate, isPending } = useSurveyControllerCreateFeedback({
    mutation: {
      onSuccess() {
        close()
      },
    },
  })

  const onFeedbackSubmit = (values: CreateFeedbackDto) => {
    mutate({ id: SURVEY_ID, data: values })
  }

  useEffect(() => {
    if (!isLoading) {
      if (error?.response?.status === 404) {
        console.log('Survey not found')
        delay(open, 5000)
      }
    }
  }, [error?.response?.status, feedbackData, isLoading, open])

  return (
    <div
      style={{
        background: "url('/thanks.png')",
      }}
      className="mt-10 py-20 text-center lg:py-20"
    >
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-2xl font-bold lg:text-5xl">Thank you for DoBe-ing with us!</h1>
        <p className="mt-4 text-center text-xs lg:text-base">
          You have successfully completed the survey.
          <br />
          To view your complete result details and access additional information, please check your{' '}
          <span className="underline">email</span>.
        </p>
      </div>

      <Modal
        opened={opened}
        onClose={() => {}}
        withCloseButton={false}
        closeOnEscape={false}
        closeOnClickOutside={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        className="bg-black"
      >
        <form
          className="flex flex-col p-4 lg:p-8"
          onSubmit={form.onSubmit((values) => onFeedbackSubmit(values))}
        >
          <h1 className="text-center text-lg font-semibold lg:text-2xl">
            What would you like to rate this survey?
          </h1>
          <div className="mt-4 flex flex-col items-center justify-center">
            <Rating size={'lg'} {...form.getInputProps('rating')} />

            {form.errors.rating && (
              <p className="mt-2 text-center text-xs text-error">{form.errors.rating}</p>
            )}
          </div>
          <Divider my="md" />
          <p className="text-base font-semibold lg:text-lg">Leave a comment </p>
          <Textarea
            variant="filled"
            placeholder="Add your comment here..."
            autosize
            minRows={4}
            maxRows={6}
            {...form.getInputProps('comment')}
          />
          <p className="mt-1 text-xs font-normal">Maximum 250 characters</p>
          <div className="px-8">
            <Button
              className="mt-4"
              px={30}
              variant="white"
              size="md"
              radius="xl"
              color="#101010"
              type="submit"
              fullWidth
              loading={isPending}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ProfileFooter
