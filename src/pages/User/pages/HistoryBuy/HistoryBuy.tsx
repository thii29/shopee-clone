import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { createSearchParams, Link } from 'react-router-dom'
import purchaseAPI from 'src/api/purchase.api'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgress, name: 'Đang vận chuyển' },
  { status: purchaseStatus.delivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã huỷ' }
]

export default function HistoryBuy() {
  //queryParams is an Object
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseAPI.getPurchase({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data

  console.log('status', status)
  const purChasesTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyBuy,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/15 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm mb-4'>
            {/* Status tabs*/}
            {purChasesTabsLink}
          </div>
          {/* Product */}
          <div>
            {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mb-2 rounded-sm border-black/15 bg-white p-6 text-gray-800'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0 mr-3'>
                    <img
                      src={purchase.product.image}
                      alt={purchase.product.name}
                      className='h-20 w-20 object-cover rounded-sm '
                    />
                  </div>
                  <div className='flex-grow overflow-hidden mr-3'>
                    <div className='truncate mr-3'>{purchase.product.name}</div>
                    <div className='mr-3'>SL: {purchase.buy_count}</div>
                  </div>
                  <div className='flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      {formatCurrency(purchase.product.price_before_discount)} vnd
                    </span>
                    <span className='truncate text-orange ml-2'>{formatCurrency(purchase.product.price)} vnd</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền:</span>
                    <span className='ml-2'>{formatCurrency(purchase.product.price * purchase.buy_count)} vnd</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
