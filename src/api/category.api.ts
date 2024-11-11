import { Category } from "src/types/category.type"
import { SuccessResponse } from "src/types/utils.type"
import http from 'src/utils/http'


const URL = 'categories'

const categoryApi = {
  getCategories(): Promise<SuccessResponse<Category[]>>{
    return http.get(URL)
  }
}
export default categoryApi