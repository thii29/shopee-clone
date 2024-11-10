import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userAPI from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { userSchema, UserSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError, 
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver(passwordSchema),
    mode: 'onBlur'
  })
  console.log('errors', errors)
  const { mutateAsync } = useMutation({
    mutationFn: userAPI.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='pb-10 rounded-sm bg-white px-7 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        {/* Info form */}
        <div className='mt-6 flex-grow md:pr-12 md:mt-0 '>
          {/* Old passworrd */}
          <div className='flex flex-wrap mt-2'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu cũ: </div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                className='relative w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
                name='password'
                type='password'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          {/* New passworrd */}
          <div className='flex flex-wrap mt-2'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Mật khẩu mới: </div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                className='relative w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
                name='new_password'
                type='password'
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          {/* Confirm New passworrd */}
          <div className='flex flex-wrap mt-2'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Nhập lại mật khẩu mới: </div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                className='relative w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
                name='confirm_password'
                type='password'
                placeholder='Nhập lại mật khẩu mới'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className='flex flex-wrap mt-4'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
