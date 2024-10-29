import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseAPI from 'src/api/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { produce } from 'immer'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseAPI.getPurchase({ status: purchaseStatus.inCart })
  })

  const purchasesInCart = purchasesInCartData?.data
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)
  //re-call api
  useEffect(() => {
    setExtendedPurchase(purchasesInCart?.map((purchase) => ({ ...purchase, disabled: false, checked: false })) || [])
  }, [purchasesInCart])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchase((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto '>
          <div className='min-w-[1000px]'>
            {/* title menu */}
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6 bg-white'>
                <div className='flex items-center'>
                  {/* check box input */}
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll}/>
                  </div>
                  {/* close check box input */}
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>

            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchase?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='mt-5 grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      {/* img and product name */}
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                            className='h-24 w-24 flex-shrink-0 border rounded-sm'
                          >
                            <img alt={purchase.product.name} src={purchase.product.image} />
                          </Link>
                          <div className='flex-grow px-5 pt-1 pb-2'>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              className='line-clamp-2 text-left'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* close img and product name */}
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      {/* price */}
                      <div className='col-span-2'>
                        <div className='flex item-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            {formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>{formatCurrency(purchase.product.price)} vnd</span>
                        </div>
                      </div>
                      {/* close price */}
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      {/* total price */}
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          {formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      {/* close total price */}
                      <div className='col-span-1'>
                        <button className='bg-non text-black transition-color hover:text-orange'>Xoá</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* pay section */}
      <div className='sticky bottom-0 z-10 flex flex-col mt-10 rounded-sm bg-white p-5 shadow border-gray-500 sm:flex-row sm:items-center sm:justify-start'>
        <div className='flex items-center'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <input type='checkbox' name='' id='' className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll}/>
          </div>
          <button className='mx-3 border-none bg-none hover:text-orange' onClick={handleCheckAll}>
            Chọn tất cả ({extendedPurchase.length})
          </button>
          <button className='mx-3 border-none bg-none hover:text-orange'>Xoá</button>
        </div>

        <div className='ml-auto flex flex-col items-center mt-5 sm:mt-0 sm:flex-row'>
          <div className='sm:justify-end'>
            <div className='flex items-center'>
              <div>Tổng thanh toán ...(sản phẩm): </div>
              <div className='ml-2 text-2xl text-orange'>12.000.000 vnd</div>
            </div>
            <div className='flex items-center justify-end text-sm sm:justify-end'>
              <div className='text-gray-500'>Tiết kiệm </div>
              <div className='ml-6 text-orange'>1.100.000 </div>
            </div>
          </div>
        </div>
        <Button className='h-10 w-52 text-center py-4 px-2 uppercase bg-orange/85 text-white text-sm hover:bg-orange flex justify-center items-center sm:mt-0 sm:ml-6'>
          Mua hàng
        </Button>
      </div>
      {/* close section */}
    </div>
  )
}
