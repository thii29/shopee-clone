import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRegisterRules } from 'src/utils/rules'

export interface RegisterFormData {
  email?: string
  password?: string
  confirm_password?: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<RegisterFormData>()
  const rules = getRegisterRules(getValues)
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  // const formValues = watch()
  console.log(errors)
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <div className='mt-8'>
                <input
                  type='email'
                  placeholder='Email'
                  id=''
                  {...register('email', rules.email)}
                  className='p-3 w-full outline-none border border-gray-300
                focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div>

              <div className='mt-2'>
                <input
                  type='password'
                  placeholder='Password'
                  id=''
                  autoComplete='on'
                  {...register('password', rules.password)}
                  className='p-3 w-full outline-none border border-gray-300
                focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  id=''
                  autoComplete='on'
                  {...register('confirm_password', rules.confirm_password)}
                  className='p-3 w-full outline-none border border-gray-300
                focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng ký
                </button>
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
