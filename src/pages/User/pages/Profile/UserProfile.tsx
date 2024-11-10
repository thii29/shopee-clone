import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'

import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form'
import userAPI from 'src/api/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { userSchema, UserSchema } from 'src/utils/rules'
import SelectDate from '../../components/SelectDate'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { getAvatarURL, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='flex flex-wrap mt-6'>
        <div className='w-[20%] truncate pt-3 text-right capitalize'>Tên: </div>
        <div className='w-[80%] pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
            classNameEye='hidden'
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
                className='w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
//URL.createObjectURL(file)
//flow 1: nhan upload: up len server luon => sv tra ve url hinh anh
//nhan submit thi gui url anh cong voi data len sv

//flow 2: nhan up load: khong up len sv
//nhan submit thi tien hanh up len server, upload thanh cong thi goi api updateprofile

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImg = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods

  const ava = watch('avatar')
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userAPI.getProfile
  })
  const profile = profileData?.data
  //console.log(profile)

  const {  mutateAsync } = useMutation({
    mutationFn: userAPI.updateProfile
  })

  const { mutateAsync: uploadAvataAsync } = useMutation({
    mutationFn: userAPI.uploadAvatar
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = ava
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvataAsync(form)
        avatarName = uploadRes.data
        setValue('avatar', avatarName)
      }
      const res = await mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString(), avatar: avatarName })
      setProfile(res.data)
      setProfileToLS(res.data)
      refetch()
      toast.success(res.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }
  return (
    <div className='pb-10 rounded-sm bg-white px-7 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <FormProvider {...methods}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          {/* Info form */}
          <div className='mt-6 flex-grow md:pr-12 md:mt-0 '>
            {/* Email */}
            <div className='flex flex-wrap'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>Email: </div>
              <div className='w-[80%] pl-5'>
                <div className='pt-3 text-gray-7000'>{profile?.email}</div>
              </div>
            </div>
            {/* Info component */}
            <Info />
            {/* Address */}
            <div className='flex flex-wrap mt-2'>
              <div className='w-[20%] truncate pt-3 text-right capitalize'>Địa chỉ: </div>
              <div className='w-[80%] pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-2 py-2 outline-none focus:border-gray-500 focus:shadow-sm hover:border-orange'
                  classNameEye='hidden'
                  register={register}
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            {/* Birthday */}
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <SelectDate
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
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
              <img src={previewImg || getAvatarURL(ava)} alt='' className='w-full h-full rounded-full object-cover' />
            </div>
            {/* Input file */}
            <InputFile onChange={handleChangeFile} />
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng tối đa 1MB</div>
              <div>Định dạng: JPG, JPEG, PNG</div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
