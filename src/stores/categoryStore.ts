import instance from "@/plugin/axios";
import type { AddCategory, Categories, Category } from "@/types/category";
import type { ApiResponse } from "@/types/user";
import axios from "axios";
import { defineStore } from "pinia";

const storeCategory = defineStore('categoryStore',{
    state:()=>({
        categoriesData:{} as Categories
    }),
    actions:{
        createCategory(data:AddCategory){
            return new Promise<ApiResponse<{category:Category}>>(async (resolve,reject)=>{
                try{
                    const response = await instance.post(`/ecommerce/categories`,data);
                    
                    if(response?.data?.success){
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
        },
        getCategories(page:number,limit:number){
            return new Promise<ApiResponse<{category:Categories}>>(async (resolve,reject)=>{
                try{
                    const response = await instance.get(`/ecommerce/categories?page=${page}&limit=${limit}`);
                    if(response?.data?.success){
                      resolve(response?.data?.data)
                        this.categoriesData = response?.data?.data;
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

export default storeCategory;