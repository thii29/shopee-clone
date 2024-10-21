import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/api/product.api'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const product = productDetailData?.data
  //console.log(product)
  if(!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                />
              </div>
            </div>
            <div className='col-span-7'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
