import 'swiper/css'
import 'swiper/css/effect-cards'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/client'
import { useEffect } from 'react'
import './i18n'

function App() {
  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault() // This will block the default context menu on right click
    }

    document.addEventListener('contextmenu', handleRightClick)

    return () => {
      document.removeEventListener('contextmenu', handleRightClick)
    }
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          defaultColorScheme="dark"
          withGlobalClasses={false}
          theme={{
            fontFamily: 'Fira Sans, sans-serif',
            primaryColor: 'orange',
            primaryShade: 6,
          }}
        >
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
