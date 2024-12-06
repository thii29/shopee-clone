import { UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { ERROR_VALIDATE } from './constants'

//type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions | undefined }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>) /*: Rules*/ => ({
  email: {
    required: {
      value: true,
      message: 'This field is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Incorrect email format!'
    },
    maxLength: {
      value: 160,
      message: ERROR_VALIDATE.CHAR_MAX_10
    },
    minLength: {
      value: 6,
      message:ERROR_VALIDATE.CHAR_MIN_6
    }
  },
  password: {
    required: {
      value: true,
      message: 'This field is required'
    },
    maxLength: {
      value: 10,
      message: ERROR_VALIDATE.CHAR_MAX_10
    },
    minLength: {
      value: 6,
      message: ERROR_VALIDATE.CHAR_MIN_6
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'This field is required'
    },
    maxLength: {
      value: 10,
      message: ERROR_VALIDATE.CHAR_MAX_10
    },
    minLength: {
      value: 6,
      message: ERROR_VALIDATE.CHAR_MIN_6
    },
    validate:
      typeof getValues === 'function'
        ? (value?: string) => (value === getValues('password') ? true : 'Confirm password does not match')
        : undefined
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('This field is required')
    .email('Incorrect email format')
    .min(5, 'Length of email from 5 - 160 characters')
    .max(160, 'Length of email from 5 - 160 characters'),
  password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10),
  confirm_password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10)
    .oneOf([yup.ref('password')], 'Confirm password does not match'),
  name: yup.string().trim().required()
})

export const registerSchema = yup.object({
  email: yup
    .string()
    .required('This field is required')
    .email('Incorrect email format')
    .min(5, 'Length of email from 5 - 160 characters')
    .max(160, 'Length of email from 5 - 160 characters'),
  password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10),
  confirm_password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10)
    .oneOf([yup.ref('password')], 'Confirm password does not match'),
})

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('This field is required')
    .email('Incorrect email format')
    .min(5, 'Length of email from 5 - 160 characters')
    .max(160, 'Length of email from 5 - 160 characters'),
  password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10)
})

export const priceSchema = yup.object({
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price does not allow ',
    test: function (value?: string | number) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price does not allow ',
    test: function (value?: string | number) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  })
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(10, 'Số điện thoại có giới hạn là 10 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10),
  new_password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10),
  confirm_password: yup
    .string()
    .required('This field is required')
    .min(6, ERROR_VALIDATE.CHAR_MIN_6)
    .max(10, ERROR_VALIDATE.CHAR_MAX_10)
    .oneOf([yup.ref('new_password')], 'Confirm password does not match')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type RegisterSchema = yup.InferType<typeof registerSchema>
export type priceSchema = yup.InferType<typeof priceSchema>
