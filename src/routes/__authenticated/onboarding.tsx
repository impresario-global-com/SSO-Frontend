import CommonLayout from '@/layouts/common-layout'
import Navbar from '@/components/shared/navbar'
import {useEffect, useState} from 'react'
import {Button, TextInput, Select } from '@mantine/core'
import {
  useProfileControllerGetUserMeta, useProfileControllerUpdateUserProfile,
} from '@/api/auth'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import AppError from '@/components/shared/app-error'
import dayjs from 'dayjs'
import Footer from '@/components/footer'
import {  nationalities } from '@/data/country-data'
import {useFasfacUserPrefsControllerUpdate} from "@/api/survey.ts"
import {useAtom} from "jotai";
import {accessTokenAtom, callbackUrlAtom, initatePaymentAtom, pledgeAmountAtom, userPrefIdAtom} from "@/data/store.ts"
import Routes from "@/data/routes.ts"
import {DateInput} from "@mantine/dates"
import {bigint} from "zod";


export function Component() {
  const { data: userMeta } = useProfileControllerGetUserMeta({})
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [dob, setDob] = useState(null)
  const [nationality, setNationality] = useState(null)
  const [profession, setProfession] = useState(null)
  const [ethnicity, setEthnicity] = useState(null)
  const [qualification, setQualification] = useState(null)
  const [gender, setGender] = useState(null)
  const [callbackUrl] = useAtom(callbackUrlAtom)
  const [accessToken] = useAtom(accessTokenAtom)
  const { mutate } = useProfileControllerUpdateUserProfile({
    mutation: {
      onSuccess(data) {
        console.log('Success:', data);
        const redirectUrl = `${callbackUrl}?token=${encodeURIComponent(accessToken)}`;
        // Redirect user
        window.location.href = redirectUrl;
      },
      onError(error) {
        console.error('Error:', error); // Log any error
      },
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const updateData = {
      name: fullName,
      gender: gender,
      nationality: nationality,
      contactNumber: phoneNumber,
      profession: profession,
      qualification: qualification,
      ethnicity: ethnicity,
      dob: dob,
    };
    console.log('Success:', updateData);
    mutate({ data: updateData });
  }

  return (
    <CommonLayout gradientVariant={'multicolor'}>
      <div className="m-auto max-w-7xl my-8 px-4">
        <Navbar />
        <h1 className="text-3xl font-bold text-white">A Little About You</h1>
        <p className="text-2xl">Share a few details about yourself to make your experience better</p>
        <br />
        <form className="gap-2" onSubmit={handleSubmit}>
          <div className="flex text-2xl gap-3">
            <div className="w-full ">
              <TextInput
                  size="md"
                  radius="md"
                  onChange={(value) => setFullName(value.target.value)}
                  placeholder="Full Name" />
              <br />
              <DateInput
                  size="md"
                  radius="md"
                  placeholder="Date of birth"
                  minDate={dayjs().subtract(150, 'year').toDate()}
                  maxDate={dayjs().toDate()}
                  key="dob"
                  value={dob}
                  onChange={setDob}
              />
              <br />
              <Select
                  size="md"
                  searchable
                  radius="md"
                  onChange={(value) => setNationality(value)}
                  placeholder="Nationality"
                  data={nationalities}
             />
              <br/>
              <Select
                  size="md"
                  searchable
                  radius="md"
                  onChange={(value) => setQualification(value)}
                  placeholder="Qualification"
                  data={userMeta?.qualifications}
              />
            </div>
            <div className="w-full">
              <TextInput
                  size="md"
                  radius="md"
                  type="number"
                  maxLength={10}
                  placeholder="Phone Number"
                  onChange={(value) => setPhoneNumber(parseInt(value.target.value))}
              />
              <br />
              <Select
                  size="md"
                  searchable
                  data={userMeta?.genders}
                  radius="md"
                  placeholder="Gender"
                  onChange={(value) => setGender(value)}
              />
              <br />
              <Select
                  searchable
                  size="md"
                  radius="md"
                  key="Profession"
                  placeholder="Ethnicity"
                  data={userMeta?.ethnicities}
                  onChange={(value) => setEthnicity(value)}
              />
              <br/>
              <Select
                  searchable
                  size="md"
                  radius="md"
                  key="Profession"
                  placeholder="Profession"
                  data={userMeta?.professions}
                  onChange={(value) => setProfession(value)}
              />
            </div>
            <div className="w-full">

            </div>
          </div>
          <br />
          <Button
            rightSection={<FaArrowRight />}
            px={30}
            variant="white"
            size="md"
            radius="xl"
            color="#101010"
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>
      <Footer />
    </CommonLayout>
  )
}

export function ErrorBoundary() {
  return <AppError/>
}
