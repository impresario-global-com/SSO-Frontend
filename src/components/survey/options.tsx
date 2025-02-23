import { OptionDto } from '@/api/survey'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useEffect, useState } from 'react'

interface OptionProps {
  choices: OptionDto[]
  isSecondary: boolean
  selected?: number
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

const Options = ({ choices = [], selected, setSelected, isSecondary }: OptionProps) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage')
    if (storedLanguage) {
      setSearchValue(storedLanguage)
    }
  }, [])
  return (
    <RadioGroup.Root
      className={`z-50 flex flex-col gap-4 ${isSecondary ? 'w-full' : 'max-w-80'}`}
      onValueChange={(value) => setSelected(parseInt(value))}
      required
      value={selected?.toString()}
    >
      {choices.map((choice: any) => (
        <RadioGroup.Item
          key={choice.id}
          className={`flex items-center justify-start gap-4 rounded-full px-4 outline-none ${
            isSecondary
              ? 'py-1 [&>div]:data-[state=checked]:bg-gradient-to-b [&>div]:data-[state=checked]:from-pink [&>div]:data-[state=checked]:to-orange [&>div]:data-[state=unchecked]:ring-2'
              : 'from-[#F8785E] to-[#FAAE2A] py-3 data-[state=unchecked]:bg-white/10 data-[state=checked]:bg-gradient-to-r'
          }
          `}
          id={`r${choice.id}`}
          value={choice.id.toString()}
        >
          <div
            className={`flex min-h-4 min-w-4  items-center justify-center rounded-full ring-white ${
              !isSecondary && 'ring-2'
            }`}
          >
            <RadioGroup.Indicator
              className={`after:block after:h-2 after:w-2 after:rounded-[50%]  after:content-[''] ${
                isSecondary
                  ? 'rounded-full border-[3px] border-gray after:bg-pink '
                  : 'after:bg-white'
              }`}
            />
          </div>
          <label
            className={`flex-0 cursor-pointer text-left text-sm text-white lg:text-lg ${
              !isSecondary && 'lg:font-medium'
            }`}
            htmlFor={`r${choice.id}`}
          >
            {searchValue === 'English'
              ? choice.description
              : choice?.multiLanguage?.hindi?.description || choice.description}
          </label>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  )
}

export default Options
