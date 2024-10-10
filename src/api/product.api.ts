import { Product, IProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'products'
const productApi = {
  getProducts(params:ProductListConfig){
    return http.get<IProductList>(URL, {
      params
    })
  },
  getProductDetail(id:string){
    return http.get(`${URL}/${id}`)
  }
}
export default productApi