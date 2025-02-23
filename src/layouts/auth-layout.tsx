import CommonLayout from '@/layouts/common-layout'
import authAside from '@/assets/images/auth-aside.jpg'
import Logo from '@/components/shared/logo'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <CommonLayout>
      <div className="grid h-screen grid-rows-12 lg:grid-cols-2 lg:grid-rows-none">
        <section className="relative row-span-4 overflow-hidden lg:row-span-12">
          <div className="fixed -left-12 -top-20 z-10 h-[300px] w-[300px] overflow-hidden rounded-full bg-[#F8785E]/70 blur-[150px] filter"></div>
          <div className="animate-marquee-y flex flex-col">
            <img src={authAside} alt="Humanity" className="w-full object-cover" />
            <img src={authAside} alt="Humanity" className="w-full object-cover" />
          </div>
          <div className="absolute inset-0 flex flex-col items-start justify-between bg-black bg-opacity-70 p-5 lg:p-10">
            <Logo className="w-28 opacity-50 lg:w-32" />
            <div>
              <h1 className="text-2xl font-semibold  lg:text-5xl">
                <span
                  className="text-transparent"
                  style={{
                    background:
                      'linear-gradient(90deg, #EC1380 0%, #FAAE2A 65.1%, #CAABD1 96.1%)',
                    backgroundClip: 'text',
                  }}
                >
                  #HumanityWithPurpose
                </span>
              </h1>
            </div>
          </div>
        </section>
        <section className="row-span-12 flex flex-col items-center justify-center p-4">
          {children}
        </section>
      </div>
    </CommonLayout>
  )
}
