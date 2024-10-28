import { useMutation, useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import productApi from 'src/api/product.api'
import purchaseAPI from 'src/api/purchase.api'
import ProductRating from 'src/components/ProductRating'
import QuantityController from 'src/components/QuantityController'
import { purchaseStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { queryClient } from 'src/main'
import { IProductList, Product, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import Products from '../ProductList/Products'

export default function ProductDetail() {
  const { isAuthenticated } = useContext(AppContext)
  const [buyCount, setBuyCount] = useState(1)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImg, setCurrentIndexImg] = useState([0, 5])
  const [activeImg, setActiveImg] = useState('')
  const product = productDetailData?.data
  const currentImg = useMemo(
    () => (product ? product.images.slice(...currentIndexImg) : []),
    [product, currentIndexImg]
  )
  //console.log(product?.images)

  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData } = useQuery<{ data: IProductList }>({
    //cho nay de call api cho list
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    staleTime: 3 * 60 * 100, //3p nhung chuyen qua mili second
    enabled: Boolean(product)
  })

  //da fix: useMutation truyen vao 1 object trong do co mutationFn de truyen vo function
  //purchaseAPI.addToCart la 1 function

  // LESSON : addToCartMutation = useMutation ....
  // => rut gon vì useMutation trả về cho em 1 object
  // em có thể dùng addToCartMutation.mutate hoặc { mutate } = useMutation....
  // và có thể đổi tên cho phù hợp với function
  // VD liên kết : const {title : productTitle} = props
  const { mutate: requestAddToCart } = useMutation({ mutationFn: purchaseAPI.addToCart })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImg(product.images[0])
    }
  }, [product])

  const next = () => {
    if (currentIndexImg[1] < (product as Product)?.images.length) {
      setCurrentIndexImg((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const previous = () => {
    if (currentIndexImg[0] > 0) {
      setCurrentIndexImg((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImg(img)
  }
  //console.log(product)

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  // LESSON:
  // Khi anh bấm add to cart thì anh truyền productId lên backend
  // backend sẽ lấy productId đó tìm trong list database sau đó add vô database cart của user (user này backend nhận biết thông qua accesstoken được truyền lên)
  // nên để ý lúc nào sẽ call những api mà CẦN đăng nhập mới đc call
  // sau khi add vô list cart của user thì trả lại api cart thông qua endpoint url :"/cart"
  // Nhiệm vụ của fe là get lại api cart đó rồi show lên UI
  const addToCart = () => {
    if (!isAuthenticated) {
      toast.error('Bạn cần đăng nhập để mua hàng')
      return
    }
    requestAddToCart(
      //err-
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data?.message, {
            autoClose: 1000
          })
          queryClient.invalidateQueries({
            queryKey: [
              'purchases',
              {
                status: purchaseStatus.inCart
              }
            ]
          })
        }
      }
    )

    // Không sài react query
    // step 1 : call requestAddToCart
    // step 2  : const data = await requestAddToCart({ buy_count: buyCount, product_id: product?._id as string })
    /* step 3 if(data) {
      thông báo thành công
      const newCart = await getUserCart()
      localStorage.setItem('cart', JSON.stringify(newCart))
    } */
    // step 4 ở trang cart thì dùng const purchasesInCart = localStorage.getItem('cart')
    // logout => clear localStorage
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={activeImg}
                  alt={product.name}
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={previous}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImg.map((img) => {
                  const isActive = img === activeImg
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 bg-white w-full h-full object-cover cursor-pointer'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-4 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassname='text-orange size-4'
                    nonActiveClassname='text-gray-300 size-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-2 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-6 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>{formatCurrency(product.price_before_discount)} vnd</div>
                <div className='ml-3 text-3xl font-medium text-orange'>{formatCurrency(product.price)} vnd</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  Giảm {rateSale(product.price_before_discount, product.price)}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500 mr-6'>Số lượng:</div>
                {/* Quantity Controller */}
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={product.quantity}
                />
                {/* Close Quantity Controller */}

                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/20 px-5 capitalize text-orange shadow-sm hover:bg-orange/10'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 mr-[10px]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white outline-none shadow-sm hover:bg-orange/80'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='rounded bg-gray-50 p-4 text-lg text-slate-700 uppercase'>Mô tả sản phẩm</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <div className='container'>
          <div className='rounded p-2 text-lg text-slate-700 uppercase'>Có thể bạn cũng thích</div>
          {productsData && (
            <div className='mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {/* data ?. data|| */}
              {(productsData?.data?.products || []).map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Products product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
