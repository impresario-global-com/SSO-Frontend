import noise from '@/assets/images/noise.png'
import { ReactNode } from 'react'
import { Unless, When } from 'react-if'

interface Props {
  children: ReactNode
  disableLightEffect?: boolean
  noiseEnabled?: boolean
  gradientVariant?: 'primary' | 'multicolor' | 'dual' | 'primary-alt'
}

function CommonLayout({
  children,
  disableLightEffect = false,
  noiseEnabled = false,
  gradientVariant = 'primary',
}: Props) {
  return (
    <>
      <Unless condition={disableLightEffect}>
        <div className="relative">
          <When condition={gradientVariant === 'primary' || gradientVariant === 'dual'}>
            <div className="fixed -right-96 -top-20 z-0 h-[400px] w-[400px] overflow-hidden rounded-full bg-[#F8785E] blur-[200px] filter"></div>
          </When>
          <When condition={gradientVariant === 'multicolor'}>
            <div className="fixed bottom-20 right-20 z-0 h-[300px] w-[300px] overflow-hidden rounded-full bg-[url('/muticolor.png')] bg-cover bg-no-repeat opacity-40 blur-[80px] filter lg:bottom-24 lg:right-80"></div>
          </When>
          <When condition={gradientVariant === 'dual'}>
            <div className="fixed -left-10 bottom-0 z-0 h-[300px] w-[300px] overflow-hidden rounded-full bg-[url('/muticolor.png')] bg-cover bg-no-repeat opacity-40 blur-[80px] filter"></div>
          </When>
          <When condition={gradientVariant === 'primary-alt'}>
            <div className="fixed bottom-96 right-20 z-0 h-64 w-64 overflow-hidden rounded-full bg-[#F8785E] bg-cover bg-no-repeat opacity-20 blur-[80px] filter lg:bottom-16 lg:right-10 lg:h-[300px] lg:w-[300px] lg:opacity-40"></div>
          </When>
        </div>
      </Unless>
      <main className="mx-auto max-w-screen-2xl">{children}</main>
      {noiseEnabled && (
        <div
          className="pointer-events-none fixed top-0 h-screen w-full opacity-10"
          style={{ backgroundImage: `url(${noise})`, backgroundSize: '94px' }}
        ></div>
      )}
    </>
  )
}

export default CommonLayout
