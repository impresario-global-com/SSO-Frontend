import { useId } from 'react'
import { If, Then, Else, When } from 'react-if'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label?: string
  isSelect?: boolean
  name: string
  options?: { label: string; value: string }[]
  error?: Error
}

const Input = ({ label, isSelect = false, name, options = [], ...props }: InputProps) => {
  const dynamicId = useId()

  return (
    <div className="px-3">
      <When condition={label}>
        <label htmlFor={dynamicId} className=" mb-1 block text-xs capitalize text-zinc lg:text-lg">
          {label} :
        </label>
      </When>
      <If condition={isSelect}>
        <Then>
          <select
            id={dynamicId}
            name={name || label}
            className="block w-full rounded-lg border-r-[12px] border-transparent bg-black py-3 pl-3 text-sm text-white/90 accent-orange outline-none focus:ring-1 focus:ring-orange lg:text-lg"
            {...props}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Then>
        <Else>
          <input
            id={dynamicId}
            name={name || label}
            className="block w-full rounded-xl bg-white bg-opacity-20 px-3 py-3 text-sm text-white outline-none placeholder:text-xs focus:ring-1 focus:ring-white lg:text-base"
            {...props}
          />
        </Else>
      </If>
    </div>
  )
}

export default Input
