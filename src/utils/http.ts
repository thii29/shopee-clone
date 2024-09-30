import axios, {type AxiosInstance} from "axios";

class Htttp {
  instance : AxiosInstance
  constructor(){
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type':'application/json'
      }
    })
  }
}

const https = new Htttp().instance

export default https
