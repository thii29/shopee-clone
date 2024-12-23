import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'
const purchaseAPI = {
  addToCart(body: { product_id: string; buy_count: number }): Promise<SuccessResponse<Purchase>> {
    return http.post(`${URL}/add-to-cart`, body)
  },

  getPurchase(params: { status: PurchaseListStatus }): Promise<SuccessResponse<Purchase[]>> {
    return http.get(`${URL}`, { params })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]):Promise<SuccessResponse<Purchase[]>> {
    return http.post(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }): Promise<SuccessResponse<Purchase>> {
    return http.put(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseAPI
