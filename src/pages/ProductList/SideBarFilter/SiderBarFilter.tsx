import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { QueryConfig } from '../ProductList'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { priceSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import RatingStarts from '../RatingStars'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = {
  price_min: string
  price_max: string
}

export default function SiderBarFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  //console.log(category?.length)
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const valueForm = watch()
  console.log(valueForm)
  console.log(errors)
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handlRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      {/* khi ko co danh muc nao thi active all categories */}
      <Link
        to={path.home}
        className={classNames('flex items-center font-semibold', {
          'text-orange': !category
        })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='size-6 mr-2'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <ul>
        {/* loading de check xem trong mang co gi ko */}
        {categories.length === 0 ? (
          <div>Loading...</div>
        ) : (
          categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='size-4 absolute fill-orange top-1 left-[-10px]'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })
        )}
      </ul>

      {/* /*Filter*/}
      <Link to={path.home} className='flex items-center font-semibold mt-4 uppercase'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='size-4 mr-1 fill-current'
        >
          <path
            fillRule='evenodd'
            d='M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z'
            clipRule='evenodd'
          />
        </svg>
        BỘ LỌC TÌM KIẾM
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'></div>
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder='Từ vnd'
                    classNameInput='p-1 w-full text-sm outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
          </div>
          <div className='flex items-start '>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder='Đến vnd'
                    classNameInput='p-1 w-full text-sm outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-sm text-red-600 text-center'>{errors.price_min?.message}</div>

          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center '>
            Apply
          </Button>
        </form>
      </div>
      <div className='text-sm'>Đánh giá</div>
      {/* Rating start */}
      <RatingStarts queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4'></div>
      {/* delêt all side filter */}
      <Button 
      onClick={handlRemoveAll}
      className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center '>
        Xoá tất cả
      </Button>
    </div>
  )
}
