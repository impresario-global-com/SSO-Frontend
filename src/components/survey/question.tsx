import {
  CreateResponseDto,
  QuestionDto,
  ResponseDto,
  useAppControllerUpdateScaleCurrentQuestionId,
  useSurveyControllerCreateResponse,
} from '@/api/survey'
import { If, Then, Else, When } from 'react-if'
import Options from './options'
import { useEffect, useState } from 'react'
import { debounce, isEmpty } from 'lodash-es'
import { Button, Textarea } from '@mantine/core'
import { FaArrowRightLong } from 'react-icons/fa6'
import { queryClient } from '@/api/client'
import { QueryKey } from '@tanstack/react-query'
import React from 'react'
import { AsyncImage } from 'loadable-image'
import { Fade } from 'transitions-kit'
import { PiWarningCircle } from 'react-icons/pi'

interface QuestionProps {
  question: QuestionDto
  responses: ResponseDto[]
  currentIndex: number
  goNext: () => void
  goPrevious: () => void
  responsesQueryKey: QueryKey
}

const Question = React.memo(
  ({ question, responses, goNext, goPrevious, currentIndex, responsesQueryKey }: QuestionProps) => {
    const [answer, setAnswer] = useState(0)
    const [saqAnswer, setSaqAnswer] = useState('')
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
      const storedLanguage = localStorage.getItem('selectedLanguage')
      if (storedLanguage) {
        setSearchValue(storedLanguage)
      }
    }, [])

    const { mutateAsync } = useAppControllerUpdateScaleCurrentQuestionId()
    const { mutate, isPending } = useSurveyControllerCreateResponse({
      mutation: {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: responsesQueryKey })
          goNext()
        },
      },
    })

    const debouncedMutateAsync = debounce(() => {
      mutateAsync({
        data: {
          currentQuestionId: question.id,
        },
      })
    }, 5000)

    useEffect(() => {
      debouncedMutateAsync()

      return () => debouncedMutateAsync.cancel()
    }, [question?.id])

    const getCurrentResponse = responses.find((response) => response.questionId === question.id)

    const submitAnswer = () => {
      console.log(getCurrentResponse, answer, question.id)
      //@ts-ignore
      const answerPayload: CreateResponseDto = {
        questionId: question.id,
      }
      if (question.type === 'saq' && saqAnswer !== getCurrentResponse?.saqResponse) {
        if (!isEmpty(saqAnswer)) {
          console.log(saqAnswer.length)
          if (saqAnswer.length > 25 && saqAnswer.length <= 250) {
            answerPayload['saqResponse'] = saqAnswer
            mutate({ id: question.surveyId, data: answerPayload })
          }
        }
      } else {
        if (answer !== 0 && answer !== getCurrentResponse?.optionId) {
          answerPayload['optionId'] = answer
          mutate({ id: question.surveyId, data: answerPayload })
        }
      }

      setAnswer(0)
      setSaqAnswer('')

      if (!isEmpty(getCurrentResponse)) {
        goNext()
      }
    }

    const getSelectedAnswer = answer !== 0 ? answer : getCurrentResponse?.optionId
    const getSelectedSaqAnswer = saqAnswer || getCurrentResponse?.saqResponse

    return (
      <section className={`flex flex-col gap-6 transition-opacity lg:mt-10 lg:gap-8`}>
        <h1 className="text-xl font-medium leading-normal lg:text-2xl lg:font-bold">
          <If condition={isEmpty(question.situation)}>
            <Then>
              {searchValue == 'English'
                ? question.title
                : question.multiLanguage.hindi.title || question.title}
            </Then>
            <Else>
              {searchValue == 'English' ? 'Situation' : 'परिस्थिति'}:{' '}
              {searchValue == 'English'
                ? question.situation
                : question.multiLanguage.hindi.situation || question.situation}
              <br />
              <br />
              {searchValue == 'English' ? 'Question' : 'प्रश्न'}:{' '}
              {searchValue == 'English'
                ? question.title
                : question.multiLanguage.hindi.title || question.title}
            </Else>
          </If>
        </h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg: order-0 order-1">
            <If condition={question.type === 'saq'}>
              <Then>
                <Textarea
                  key={question.id}
                  variant="unstyled"
                  value={getSelectedSaqAnswer}
                  placeholder={
                    searchValue == 'English'
                      ? 'Write down your anser here...'
                      : 'अपना उत्तर यहाँ लिखें'
                  }
                  onChange={(event) => setSaqAnswer(event.currentTarget.value)}
                  className="w-full max-w-xl rounded-lg bg-[#23201F] p-6 text-white ring-orange placeholder:text-xs focus:outline-none focus:ring-1 lg:placeholder:text-sm"
                  minRows={9}
                  maxRows={11}
                  autosize
                />
                <p className="mt-1 flex items-center text-xs font-normal">
                  <PiWarningCircle className="mr-1" size={18} />{' '}
                  {searchValue == 'English'
                    ? 'characters should be greater than 25 and less than 200'
                    : 'अक्षर 25 से अधिक और 200 से कम होने चाहिए'}
                </p>
              </Then>
              <Else>
                <Options
                  choices={question.options}
                  isSecondary={question.type === 'mcq'}
                  selected={getSelectedAnswer}
                  setSelected={setAnswer}
                />
              </Else>
            </If>
          </div>

          <figure className="order-0 relative ml-auto max-h-[300px] w-full max-w-[535px] justify-self-end rounded-lg lg:order-1">
            <AsyncImage
              key={question.imageUrl}
              src={question.imageUrl}
              className={`block h-full w-full rounded-lg object-cover`}
              alt={
                searchValue == 'English'
                  ? question.imageCaption
                  : question.multiLanguage.hindi.imageCaption || question.imageCaption
              }
              loader={<div style={{ background: '#888' }} />}
              Transition={Fade}
              style={{ width: '100%', height: 'auto', aspectRatio: 16 / 9 }}
            />
            <figcaption className="absolute bottom-0 w-full rounded-b-lg bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-sm font-semibold">
                {searchValue == 'English' ? 'Did you know?' : 'क्या आप जानते हैं?'}
              </p>
              <p className="text-xs lg:text-base">
                {searchValue == 'English'
                  ? question.imageCaption
                  : question.multiLanguage.hindi.imageCaption || question.imageCaption}{' '}
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 px-10 lg:justify-end">
          <When condition={currentIndex > 0}>
            <Button
              px={30}
              variant="outline"
              size="md"
              radius="xl"
              className="block w-full lg:inline-block lg:w-auto"
              color="white"
              onClick={goPrevious}
            >
              {searchValue == 'English' ? 'Previous' : 'पिछला प्रश्न'}
            </Button>
          </When>

          <Button
            loading={isPending}
            px={30}
            variant="white"
            size="md"
            radius="xl"
            className="block w-full lg:inline-block lg:w-auto"
            color="#101010"
            rightSection={<FaArrowRightLong />}
            onClick={submitAnswer}
          >
            {searchValue == 'English' ? 'Next Question' : 'अगला प्रश्न'}
          </Button>
        </div>
      </section>
    )
  }
)

export default Question
