<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {RouterLink,useRouter} from "vue-router"
import { Button } from "@/components/ui/button";
import {ref} from "vue";
import useAuthStore from "@/stores/auth"
import { useToast } from '@/components/ui/toast/use-toast'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCookies } from '@vueuse/integrations/useCookies'

import { Input } from "@/components/ui/input";
const router = useRouter();
const {toast} = useToast()
import { loginSchema } from "@/lib/validations";
const form = useForm({
  validationSchema: loginSchema,
});
const cookies = useCookies(); 
const store = useAuthStore()
const isSubmitting = ref(false);
const onSubmit = form.handleSubmit(async (values) => {
    isSubmitting.value = true;
    try{
        const response = await store.login(values);
        const token = response?.accessToken;
        if(token){
            cookies.set('access_token',token)
        }
        toast({
            title:'Success',
            description:'logined successfully'
        })
        router.push("/")
    }catch(error){
        toast({
            title: 'Error',
            variant: "destructive",
            description: error as string // Ensure this is a string
        });
        return;
    }finally{
        isSubmitting.value = false;
    }
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col justify-center items-center">
    <Card class="w-[450px]">
    <CardHeader>
      <CardTitle>Welcome Back</CardTitle>
      <CardDescription>Please enter your email and password</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your username"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter your password"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button type="submit" class="mt-5 w-full text-center" :disabled="isSubmitting"> 
            {{ isSubmitting ? 'Submitting...':'Login' }}    
        </Button>
      </form>
      <div class="py-3 mt-2 text-center">
          Don't have an account? <RouterLink class="text-blue-400 hover:underline" to="/register">Register</RouterLink>
      </div>
    </CardContent>
  </Card>
  </div>
</template>
