import { UseFormGetValues } from 'react-hook-form'
import { RegisterFormData } from 'src/pages/Register/Register'

export const getRegisterRules = (getValues?: UseFormGetValues<RegisterFormData>) => ({
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
        ? (value: string | undefined) => (value === getValues('password') ? true : 'Confirm password does not match')
        : undefined
  }
})
// export const getLoginRules = <T extends FieldValues>(getValues?: UseFormGetValues<T>): any => ({
//   email: {
//     required: {
//       value: true,
//       message: 'This field is required'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Incorrect email format!'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length of email from 5 - 160 characters'
//     },
//     minLength: {
//       value: 5,
//       message: 'Length of email from 5 - 160 characters'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'This field is required'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Length of email from 6 - 160 characters'
//     },
//     minLength: {
//       value: 6,
//       message: 'Length of email from 6 - 160 characters'
//     }
//   }
// })
