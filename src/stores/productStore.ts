import instance from "@/plugin/axios";
import type { IProduct } from "@/types/product";
import axios from "axios";
import { defineStore } from "pinia";

const productStore = defineStore('productStore',{
  state:()=>({

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
    }
  }
})


export default productStore;