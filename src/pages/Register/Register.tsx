import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { registerSchema, RegisterSchema} from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/api/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { toast } from 'react-toastify'


type FormData = RegisterSchema

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const {mutate: registerAccountMutation, isPending, isPaused} = useMutation({
    mutationFn: (body: FormData) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = data
    registerAccountMutation(body, {
      onSuccess: (res) => {
        console.log('res', res)
        setIsAuthenticated(true)
        setProfile(res?.data?.user)
        toast.success(res.data.message)
        navigate("/")
      },
      onError: (error) => {
        toast.error(error.message)
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if(formError?.password){
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl mb-4'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                classNameEye='hidden'
                errorMessage={errors.email?.message}
                placeholder='Email'
                //rules={rules.email}
              />
              {/* <div className='mt-8'>
                <input
                  type='email'
                  placeholder='Email'
                  id=''
                  {...register('email', rules.email)}
                  className='p-3 w-full outline-none border border-gray-300
                focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div> */}
              <Input
                name='password'
                register={register}
                type='password'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                errorMessage={errors.password?.message}
                placeholder='Password'
                //rules={rules.password}
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                //rules={rules.confirm_password}
                autoComplete='on'
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  isLoading={isPending}
                  disabled={isPaused}
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                >
                  Sign up
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>{' '}
                <Link to='/login' className='ml-1 text-red-400'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
