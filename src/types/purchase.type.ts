import { Product } from './product.type'

export type PurchasStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchasStatus | 0

export interface Purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchasStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}