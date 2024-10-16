import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { omitBy, isUndefined } from 'lodash'
import Products from './Products'
import SiderBarFilter from './SideBarFilter'
import SortProductList from './SortProductList'
import useQueryParams from 'src/hooks/useQueryParams'
import productApi from 'src/api/product.api'
import Pagination from 'src/components/Pagination'
import { IProductList, ProductListConfig } from 'src/types/product.type'
import categoryApi from 'src/api/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function Produclist() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1', // neu page ko co thi  mac dinh page = 1
      limit: queryParams.limit || 20,
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category,
    },
    isUndefined
  )
  //const [page, setPage] = useState(1)
  const { data: productsData } = useQuery<{ data: IProductList }>({
    //cho nay de call api cho list
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })
  //console.log(data?.data.data) check lỗi trắng trang  

  const { data: categoriesData } = useQuery({
    //cho nay de call api cho list
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
  })

  console.log(categoriesData)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              <SiderBarFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []}/>
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.pagination.page_size || 0}/>
              <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {/* data ?. data|| */}
                {(productsData?.data?.products||[]).map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Products product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData?.data?.pagination?.page_size || 0} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
