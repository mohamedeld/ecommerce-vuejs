import type { LoginSchema, RegisterSchema } from "@/lib/validations";
import instance from "@/plugin/axios";
import type { ApiResponse, User } from "@/types/user";
import axios from "axios";
import { defineStore } from "pinia";

 const useAuthStore = defineStore('auth', {
    state:()=>({}),
    actions:{
        async register(form:RegisterSchema){
            return new Promise(async (resolve,reject)=>{
                try{
                    const {data} = await instance.post<ApiResponse<{user:User}>>("/users/register",form);
                    if(data?.success){
                        resolve(data?.data?.user)
                    }else{
                        reject(data?.message || 'Registration failed');
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
        async login(form:LoginSchema){
            return new Promise(async (resolve,reject)=>{
                try{
                    const {data} = await instance.post<ApiResponse<{user:User,accessToken:string,refreshToken:string}>>("/users/login",form);
                    if(data?.success){
                        resolve(data?.data)
                    }else{
                        reject(data?.message || 'Registration failed');
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

export default useAuthStore;