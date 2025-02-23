import { Button } from '@mantine/core'
import React from 'react'
// @ts-ignore
import i18n from '@/i18n'

type Props = {
  header: string
  title: string
  children: React.ReactNode
  onClick: () => void
  nextButtonText?: string
}

const SectionDivider = (props: Props) => {

  const currentLanguage = i18n.language
  
  return (
    <section className="m-auto grid max-w-5xl gap-4 text-center">
      <h1 className="text-3xl font-medium uppercase lg:text-5xl">{props.header}</h1>
      <p className={`bg-gradient-to-b from-orange to-pink bg-clip-text text-3xl font-bold text-transparent lg:text-5xl ${currentLanguage === 'hi' ? 'leading-12 lg:leading-16' : ''}`}>
        {props.title}
      </p>
      {props.children}
      <div>
        <Button
          px={30}
          variant="white"
          size="md"
          radius="xl"
          className="inline-block"
          color="#101010"
          onClick={props.onClick}
        >
          {props.nextButtonText || 'Next Step' }
        </Button>
      </div>
    </section>
  )
}

export default SectionDivider
