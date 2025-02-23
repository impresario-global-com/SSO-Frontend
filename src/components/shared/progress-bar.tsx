import * as Slider from '@radix-ui/react-slider'

const ProgressBar = ({ value = 1, max = 48 }) => {
  const percentage = Math.round((value / max) * 100)

  return (
    <Slider.Root
      className="relative flex h-8 w-full touch-none select-none items-center rounded-full bg-white/10 px-3 lg:h-10 lg:px-5"
      defaultValue={[1]}
      value={[value]}
      max={max}
      min={1}
      step={1}
    >
      <Slider.Track className="relative h-2 grow rounded-full bg-[#535353] lg:h-3">
        <Slider.Range
          className="absolute h-full rounded-full"
          style={{
            background:
              'linear-gradient(90deg, #EC1380 0%, #FAAE2A 28.23%, #CAABD1 47.5%, #90D1BD 73.02%, #F7ED56 95.94%)',
          }}
        >
          <div className="flex h-full flex-col items-end justify-end rounded-full">
            <div className="relative mb-3 flex flex-col items-center justify-center">
              <div className="absolute flex flex-col items-center justify-center lg:-top-10 -top-7">
                <div
                  className="mb-1 flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-medium lg:h-9 lg:w-9 lg:text-xs"
                  style={{
                    background: 'linear-gradient(180deg, #EC1380 0%, #FAAE2A 100%)',
                  }}
                >
                  {percentage}%
                </div>
              </div>
              <div
                className="h-1 w-1 rounded-full lg:mb-1"
                style={{
                  background: 'linear-gradient(180deg, #EC1380 0%, #FAAE2A 100%)',
                }}
              ></div>
            </div>
          </div>
        </Slider.Range>
      </Slider.Track>
    </Slider.Root>
  )
}

export default ProgressBar
