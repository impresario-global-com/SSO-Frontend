import { UpdateProfileDto, useProfileControllerUpdateUserProfile } from '@/api/auth'
import { Circle } from '@/components/g-maps/circle'
import Logo, { DoBeLogo } from '@/components/shared/logo'
import Routes from '@/data/routes'
import { Button, Input, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useToggle } from '@mantine/hooks'
import { useMutation } from '@tanstack/react-query'
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import axios from 'axios'
import { useState } from 'react'
import { When } from 'react-if'
import i18n from '@/i18n'
import { useNavigate } from 'react-router-dom'
import CommonLayout from '@/layouts/common-layout'
import AppError from '@/components/shared/app-error'
import Footer from '@/components/footer'

const INITIAL_CENTER = { lat: 28.6448, lng: 77.216721 }
const RADIUS = 5000

export function Component() {
  const navigate = useNavigate()
  const [center, setCenter] = useState(INITIAL_CENTER)
  const [pincode, setPincode] = useState('')
  const [showError, toggle] = useToggle()
  const [showMarker, setMarkerVisible] = useState(false)

  const form = useForm<UpdateProfileDto>({})

  const { mutate, isPending } = useProfileControllerUpdateUserProfile({
    mutation: {
      onSuccess() {
        navigate(Routes.ONBOARDING)
      },
      onError() {
        //TODO: implement toast
      },
    },
  })

  const getLocation = useMutation({
    mutationFn: () => {
      return axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      )
    },
    onSuccess(data) {
      const locationInfo = data.data.results[0]
      const geolocation = locationInfo.geometry.location
      const addresses = locationInfo.address_components as Array<{
        types: string[]
        long_name: string
      }>

      setCenter(geolocation)
      setMarkerVisible(true)

      const pincodeString = addresses.find((item) => item.types.includes('postal_code'))?.long_name
      const city =
        addresses.find((item) => item.types.includes('locality'))?.long_name ||
        addresses.find((item) => item.types.includes('administrative_area_level_3'))?.long_name
      const state =
        addresses.find((item) => item.types.includes('administrative_area_level_1'))?.long_name ||
        'Not Found'
      const country =
        addresses.find((item) => item.types.includes('country'))?.long_name || 'Not Found'
      const pincode = parseInt(pincodeString as string)
      form.setValues({
        pincode,
        city,
        state,
        country,
      })
    },
    onError() {
      toggle()
    },
  })

  const onLocationFormSubmit = (values: UpdateProfileDto) => {
    if (!values.pincode) {
      return
    }
    mutate({ data: values })
  }

  return (
    <CommonLayout>
      <div className="grid h-screen grid-rows-12 lg:grid-cols-2 lg:grid-rows-none">
        <section className="relative row-span-4 overflow-hidden lg:row-span-12">
          <div className="flex flex-col">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <Map
                defaultCenter={INITIAL_CENTER}
                defaultZoom={12}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
                className="absolute h-full w-full"
                mapId="b4cdd18c0ba5dc3a"
                center={center}
              >
                <When condition={showMarker}>
                  <AdvancedMarker position={center} />
                  <Circle
                    radius={RADIUS}
                    center={center}
                    strokeColor={'#0c4cb3'}
                    strokeOpacity={1}
                    strokeWeight={1}
                    fillColor={'#3b82f6'}
                    fillOpacity={0.3}
                  />
                </When>
              </Map>
            </APIProvider>
          </div>

          <Logo className="absolute m-4 w-28 opacity-50 lg:w-32" />
        </section>
        <section className="row-span-12 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-xs py-6 text-center">
            <Logo className="mx-auto mb-10 w-16 lg:h-auto lg:w-auto" />
            <form
              className="flex flex-col gap-4"
              onSubmit={form.onSubmit((values) => onLocationFormSubmit(values))}
            >
              <div className="relative">
                <Input
                  autoFocus
                  required
                  variant="filled"
                  placeholder="Enter Pincode/Zip code"
                  type="number"
                  size="lg"
                  classNames={{
                    input: 'text-base rounded-xl',
                  }}
                  value={pincode}
                  onChange={(event) => setPincode(event.currentTarget?.value)}
                />
                <When condition={showError}>
                  <Input.Error mt={4}>Invalid Pincode/Zip code</Input.Error>
                </When>
                <Button
                  variant="subtle"
                  type="button"
                  classNames={{ root: 'absolute right-0 top-0 mt-2 mr-2' }}
                  onClick={() => getLocation.mutate()}
                  loading={getLocation.isPending}
                >
                  Locate
                </Button>
              </div>

              <When condition={showMarker}>
                <TextInput
                  disabled
                  size="md"
                  radius="md"
                  variant="filled"
                  label="City"
                  classNames={{
                    input: 'text-base rounded-xl',
                    label: 'text-left block text-xs ml-2 mb-1',
                  }}
                  {...form.getInputProps('city')}
                />
                <TextInput
                  disabled
                  size="md"
                  radius="md"
                  variant="filled"
                  label="State"
                  classNames={{
                    input: 'text-base rounded-xl',
                    label: 'text-left block text-xs ml-2 mb-1',
                  }}
                  {...form.getInputProps('state')}
                />
                <TextInput
                  disabled
                  size="md"
                  radius="md"
                  variant="filled"
                  label="Country"
                  classNames={{
                    input: 'text-base rounded-xl',
                    label: 'text-left block text-xs ml-2 mb-1',
                  }}
                  {...form.getInputProps('country')}
                />

                <Button
                  loading={isPending}
                  type="submit"
                  variant="white"
                  size="lg"
                  radius="xl"
                  color="#101010"
                  fullWidth
                  className="mt-2 text-gray"
                >
                  Let's Go!
                </Button>
              </When>
            </form>
          </div>
          <Footer />
        </section>
      </div>
    </CommonLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
