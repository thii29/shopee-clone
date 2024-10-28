import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, Link, URLSearchParamsInit, useNavigate } from 'react-router-dom'
import authApi from 'src/api/auth.api'
import purchaseAPI from 'src/api/purchase.api'
import noproduct from 'src/assets/images/no-product.png'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { queryClient } from 'src/main'
import { Schema, schema as searchSchema } from 'src/utils/rules'
import { formatCurrency } from 'src/utils/utils'
import Popover from '../Popover '
import SvgIcon from './SvgIcon'

type FormData = Pick<Schema, 'name'>

const nameSchema = searchSchema.pick(['name'])
const MAX_PURCHASES = 5
export default function Header() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const { mutate: requestLogout } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseAPI.getPurchase({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })
  const purchasesInCart = purchasesInCartData?.data

  const handleLogout = () => {
    requestLogout()
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : { ...queryConfig, name: data.name }
    navigate({
      pathname: path.home,
      search: createSearchParams(config as URLSearchParamsInit).toString()
    })
  })
  
  return (
    <div className='pb-5 pt-2 bg-gradient-to-t from-[#f53d2d] to-[#ff6633] text-white'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex items-center py-1 hover:text-white/70 cursor-pointer'
            renderPopover={
              <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                <div className='flex flex-col py-2 px-3'>
                  <button className='py-2 px-3 hover:text-orange'>Vietnamese</button>
                  <button className='py-2 px-3 hover:text-orange'>English</button>
                </div>
              </div>
            }
          >
            <div className='flex items-center py-1 hover:text-white/70 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <div className='mx-1'>English</div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
              </svg>
            </div>
          </Popover>
          {isAuthenticated && (
            <Popover
              className='flex items-center py-2 hover:text-gray-300 cursor-pointer ml-4'
              renderPopover={
                <div className='bg-white shadow-md rounded-sm border border-gray-200'>
                  <Link to={path.profile} className='block py-2 px-5 hover:bg-slate-100 bg-white hover:text-cyan-500'>
                    My account
                  </Link>
                  <Link to='/' className='block py-2 px-5 hover:bg-slate-100 bg-white hover:text-cyan-500'>
                    My purchase
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block py-2 px-5 hover:bg-slate-100 bg-white hover:text-cyan-500'
                  >
                    Logout
                  </button>
                </div>
              }
            >
              <div className='w-5 h-5 flex-shrink-0'>
                <img
                  src='https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-1/386357827_122121435266036231_1463382430782505098_n.jpg?stp=dst-jpg_s120x120&_nc_cat=105&ccb=1-7&_nc_sid=e8ff23&_nc_eui2=AeEoX_6NwCjRkqZwWjy9A-oKDozDN2As0LgOjMM3YCzQuFM6ItwqEZgMqYEv47NNyvaHGBomP6Blz5eqom_AqgIo&_nc_ohc=1PWpggFP3akQ7kNvgEM9ftN&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=AKKCFwuOD02qO1WMnhUGizS&oh=00_AYDiHLz7PQR1Jc62Y2jhoXH-JXOKDegRDGzQR0n50G0tnA&oe=67016EAD'
                  alt='avatar'
                  className=' w-ful h-full object-cover rounded-full'
                />
              </div>
              <div className='ml-2'>{profile?.email}</div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                Register
              </Link>
              <div className='border-r-[1px] border-r-white/40 h-4'></div>
              <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                Login
              </Link>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to='/' className='col-span-2'>
            <SvgIcon />
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                id=''
                placeholder='Search in Shopee '
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                {...register('name')}
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-1 justify-self-start'>
            <Popover
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchasesInCart ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                          <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                            <div className='flex-shrink-0'>
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className='h-11 w-11 object-cover'
                              />
                            </div>
                            <div className='ml-2 flex-grow overflow-hidden'>
                              <div className='truncate'>{purchase.product.name}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <span className='text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''} Thêm
                          hàng vào giỏ
                        </div>
                        <Link
                          to={path.cart}
                          className='rounded-sm bg-orange px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] items-center justify-center p-2'>
                      <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to='/' className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                  />
                </svg>
                {purchasesInCart && (
                  <span className='absolute left-[17px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs text-orange'>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
// function setIsAuthenticated(arg0: boolean) {
//   throw new Error('Function not implemented.')
// }
