import axios, {AxiosError} from "axios";
import HttpStatusCode from "src/constants/httpStatusCode.enum"


export function isAxiosError(error: unknown): error is AxiosError<T>{
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error: unknown){
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}