import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import Products from './Products'
import SiderBarFilter from './SideBarFilter'
import SortProductList from './SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { IProductList, ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function Produclist() {
  const queryParams: QueryConfig = useQueryParams()
  console.log('queryParams', queryParams)
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1', // neu page ko co thi  mac dinh page = 1
      limit: queryParams.limit || 20,
      sortBy: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    }, // order=undefined&page=1&limit=10 => after omit => page=1&limit=10
    isUndefined
  )
  //const [page, setPage] = useState(1)
  // USEQUERY => là thư viện giúp rút gọn khi call api thay vì
  // Dùng useEffect như hồi trước phải khai báo setData, setLoading, setIsError,....
  // CÓ CACHING dữ lại dữ liệu cũ theo queryKey,   Querykey mà thay đổi sẽ đc fetch lại
  // những cái filter nằm trên url vd : ?page=1&limit.. đc gọi là query string

  //Query param => bước 1 : navigate đẩy query string cần thiết lên url
  // bước 2 lấy query string từ url bằng hàm gì đó...
  // bước 3 lọc lại query string nếu có thằng truyền sai hoặc lỗi
  // bước 4 truyền query config đã đc lọc vô hàm api products để fetch lại dữ liệu
  const { data } = useQuery<{ data: IProductList }>({

    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })
  //console.log(data?.data.data) check lỗi trắng trang

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              <SiderBarFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={data.data.pagination.page_size || 0}/>
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {/* data ?. data|| */}
                {(data?.data?.products||[]).map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Products product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data?.data?.pagination?.page_size || 0} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
