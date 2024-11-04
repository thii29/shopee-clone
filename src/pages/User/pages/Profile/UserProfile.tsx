import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { Controller, useForm } from 'react-hook-form'
import userAPI from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { userSchema, UserSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile
  })
  const profile = profileData?.data
  console.log(profile)
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile])
  return (
    <div className='pb-10 rounded-sm bg-white px-7 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        {/* Info form */}
        <div className='mt-6 flex-grow md:pr-12 md:mt-0 '>
          {/* Email */}
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Email: </div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-7000'>{profile?.email}</div>
            </div>
          </div>
          {/* Name */}
          <div className='flex flex-wrap mt-6'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên: </div>
            <div className='w-[80%] pl-5'>
              <Input
                className='w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          {/* Phone */}
          <div className='flex flex-wrap mt-2'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Số điện thoại: </div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    className='w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Số điện thoại'
                    errorMessage={errors.name?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          {/* Address */}
          <div className='flex flex-wrap mt-2'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ: </div>
            <div className='w-[80%] pl-5'>
              <Input
                className='w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          {/* Birthday */}
          <div className='flex flex-wrap mt-2'>
            <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh:</div>
            <div className='w-[80%] pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option value=''>01</option>
                </select>

                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option value=''>Tháng 01</option>
                </select>

                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option value=''>1990</option>
                </select>
              </div>
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
        {/* Info img */}
        <div className='flex flex-col items-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='my-5 h-24 w-24'>
            <img
              src='https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg'
              alt=''
              className='w-full rounded-full object-cover'
            />
          </div>
          <input type='file' name='' id='' accept='.jpg, .jpeg, .png' className='hidden' />
          <button
            className='flex h-10 items-center justify-end rounded-sm border bg-white text-sm px-6 text-gray-600 shadow-sm'
            type='submit'
          >
            Chọn ảnh
          </button>
          <div className='mt-3 text-gray-400'>
            <div>Dung lượng tối đa 1MB</div>
            <div>Định dạng: JPG, JPEG, PNG</div>
          </div>
        </div>
      </form>
    </div>
  )
}
