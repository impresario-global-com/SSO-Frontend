import { ErrorType } from '@/api/auth.axios'
import { QuestionDto, ResponseDto, ScaleDto } from '@/api/survey'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  shuffle,
  differenceBy,
  filter,
  concat,
  uniqBy,
  every,
  findKey,
  some,
  pick,
  sum,
  values,
  maxBy,
  map,
  minBy,
} from 'lodash-es'
import { KARMA_ATTRIBUTES, TOTAL_QUESTIONS } from './constants'

interface Dictionary<T> {
  [index: string]: T
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatErrorMessage(error: ErrorType<unknown>): string {
  const messages = (error.response?.data as { message?: string })?.message || error.message
  if (Array.isArray(messages)) {
    return messages.join(' & ')
  }
  return messages
}

export function getOrderedQuestions(
  questions: QuestionDto[],
  responses: ResponseDto[],
  currentQuestionId?: number
) {
  // Filter out undefined questions first
  const validQuestions = questions || []

  // Step 1: Match Questions with Responses
  const matchedQuestions = validQuestions.filter((question) =>
    responses.some((response) => response.questionId === question.id)
  )

  // Step 2: Find the Current Question
  // Ensure the currentQuestion is not undefined
  const currentQuestion = validQuestions.find((question) => question.id === currentQuestionId)

  // Step 3: Shuffle Remaining Questions
  const remainingQuestions = differenceBy(
    validQuestions,
    [...matchedQuestions, currentQuestion].filter(Boolean),
    'id'
  )
  const shuffledRemainingQuestions = shuffle(remainingQuestions)

  // Step 4: Concatenate Arrays
  const orderedQuestions = concat(
    matchedQuestions,
    filter([currentQuestion], Boolean), // Use Boolean as the identity function to filter out undefined
    shuffledRemainingQuestions
  )

  return uniqBy(orderedQuestions, 'id')
}
export function findNotFullyAnsweredQuestionType(
  questionGroups: Dictionary<QuestionDto[]>,
  responses: ResponseDto[]
) {
  return findKey(questionGroups, (questions) => {
    return !every(questions, (question) => some(responses, { questionId: question.id }))
  })
}

export function calculateTotalScore(scale: ScaleDto) {
  return sum(values(pick(scale, KARMA_ATTRIBUTES)))
}

export function getHighestAttribute(scale: ScaleDto) {
  const pickedAttr = pick(scale, KARMA_ATTRIBUTES)
  const scoresArray = map(pickedAttr, (value, key) => ({ attribute: key, score: value }))
  return maxBy(scoresArray, 'score')
}

export function getLowestAttribute(scale: ScaleDto) {
  const pickedAttr = pick(scale, KARMA_ATTRIBUTES)
  const scoresArray = map(pickedAttr, (value, key) => ({ attribute: key, score: value }))
  return minBy(scoresArray, 'score')
}

function capValue(value: number, decimals: number) {
  const multiplier = Math.pow(10, decimals)
  return Math.floor(value * multiplier) / multiplier
}

export function getMeanScore(totalScore: number) {
  const value = totalScore / TOTAL_QUESTIONS
  return capValue(value, 1)
}
