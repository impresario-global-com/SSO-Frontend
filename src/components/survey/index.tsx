import ProgressBar from '../shared/progress-bar'
import CommonLayout from '@/layouts/common-layout'
import Navbar from '../shared/navbar'
import { QuestionDto, ResponseDto } from '@/api/survey'
import { getOrderedQuestions } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Question from './question'
import { QueryKey } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Routes from '@/data/routes'
import { If, Then } from 'react-if'
import { debounce } from 'lodash-es'

interface SurveyProps {
  questions: QuestionDto[]
  responses: ResponseDto[]
  currentQuestionId?: number
  responseQueryKey: QueryKey
  totalQuestionLength: number
}

const Survey = ({
  questions,
  responses,
  currentQuestionId,
  responseQueryKey,
  totalQuestionLength,
}: SurveyProps) => {
  const getShuffledQuestions = getOrderedQuestions(questions, responses, currentQuestionId)
  const initialIndex = getShuffledQuestions.findIndex(
    //@ts-ignore
    (question) => question?.id === currentQuestionId
  )
  const [currentIndex, setCurrentIndex] = useState(initialIndex === -1 ? 0 : initialIndex)
  const navigate = useNavigate()

  const handleGoNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      navigate(`${Routes.SECTION_COMPLETE}?id=${questions[0].surveyId}&view=${responses.length}`)
    }
  }

  const handleGoPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const getCurrentQuestion = getShuffledQuestions[currentIndex] as QuestionDto

  return (
    <CommonLayout noiseEnabled gradientVariant={getCurrentQuestion ? 'primary-alt' : 'multicolor'}>
      <div className="m-auto max-w-7xl p-4">
        <Navbar />

        <If condition={getCurrentQuestion !== undefined}>
          <Then>
            <div className="my-8">
              <ProgressBar max={totalQuestionLength} value={responses.length} />
            </div>

            <Question
              question={getCurrentQuestion}
              responses={responses}
              goNext={handleGoNext}
              goPrevious={handleGoPrevious}
              currentIndex={currentIndex}
              responsesQueryKey={responseQueryKey}
            />
          </Then>
        </If>
      </div>
    </CommonLayout>
  )
}

export default Survey
