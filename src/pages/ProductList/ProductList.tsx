import { useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import Products from './Products'
import SiderBarFilter from './SideBarFilter'
import SortProductList from './SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function Produclist() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1', // neu page ko co thi  mac dinh page = 1
      limit: queryParams.limit,
      sortBy: queryParams.sortBy,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  //const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              <SiderBarFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList />
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Products product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
