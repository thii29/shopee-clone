
import { UseFormGetValues } from 'react-hook-form'

//type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions | undefined }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>)/*: Rules*/ => ({
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
      message: 'Length of email from 5 - 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Length of email from 5 - 160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'This field is required'
    },
    maxLength: {
      value: 160,
      message: 'Length of email from 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Length of email from 6 - 160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'This field is required'
    },
    maxLength: {
      value: 160,
      message: 'Length of email from 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Length of email from 6 - 160 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value ?:string) => (value === getValues('password') ? true : 'Confirm password does not match')
        : undefined
  }
})
