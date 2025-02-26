import instance from "@/plugin/axios";
import type { IProduct, ProductPagination } from "@/types/product";
import type { ApiResponse } from "@/types/user";
import axios from "axios";
import { defineStore } from "pinia";

const productStore = defineStore('productStore',{
  state:()=>({
    productsData:{} as ProductPagination
  }),
  actions:{ 
    createProduct(formData:FormData){
      return new Promise(async (resolve,reject)=>{
        try{
          
          const response = await instance.post(`/ecommerce/products`,formData);
          if(response?.data?.success){
            resolve(response?.data?.data)
          }else{
            reject(response?.data?.error?.message)
          }
        }catch(error){
          console.log("error ",error);
          if (axios.isAxiosError(error) && error?.response) {
            reject(error?.response?.data?.error || error?.message)
          } else {
            reject("An unexpected error occurred")
          }
        }
      })
    },
    getProducts(page:number,limit:number){
      return new Promise<ApiResponse<{product:IProduct}>>(async (resolve,reject)=>{
          try{
              const response = await instance.get(`/ecommerce/products?page=${page}&limit=${limit}`);
              if(response?.data?.success){
                this.productsData = response?.data?.data;
                resolve(response?.data?.data)
              }else{
                  reject(response?.data?.error?.message)
              }
          }catch(error){
              if (axios.isAxiosError(error) && error?.response) {
                  reject(error?.response?.data?.error || error?.message)
                } else {
                  reject("An unexpected error occurred")
                }
          }

      })
  }
  }
})


export default productStore;