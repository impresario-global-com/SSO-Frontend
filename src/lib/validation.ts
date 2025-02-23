import * as Yup from 'yup'
import { OTP_SIZE } from './constants'

export const personalInfoValidationSchema = Yup.object().shape({
  age: Yup.number()
    .positive('Age must be a positive number')
    .max(110, 'Age must not exceed 110 years')
    .required('Age is required'),
  nationality: Yup.string().required('Nationality is required'),
  matrimonialStatus: Yup.string().required('Matrimonial status is required'),
  profession: Yup.string().required('Profession is required'),
  gender: Yup.string().required('Gender is required'),
  ethnicity: Yup.string().required('Ethnicity is required'),
  qualification: Yup.string().required('Qualification is required'),
})

export const contactInfoValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  // city: Yup.string().required('City is required'),
  // state: Yup.string().required('State is required'),
  regions: Yup.string().required('Zone is required'),
  pincode: Yup.string().required('Pincode is required'),
})

export const contactDetailsValidationSchema = Yup.object().shape({
  phoneNumber: Yup.number()
    .positive('Must be a positive number')
    .required('Phone number is required'),
  dialCode: Yup.number().required('Please select a country'),
})

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required').min(OTP_SIZE, `OTP must be ${OTP_SIZE} digits`),
})
