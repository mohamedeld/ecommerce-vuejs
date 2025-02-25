<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {RouterLink,useRouter} from "vue-router"
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth"
import {ref} from 'vue'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/toast/use-toast'
import { Input } from "@/components/ui/input";

import { registerSchema } from "@/lib/validations";
const router = useRouter();
const {toast} = useToast()
const form = useForm({
  validationSchema: registerSchema,
});
const store = useAuthStore()
const isSubmitting = ref(false); 
const onSubmit =  form.handleSubmit(async (values) => {
    isSubmitting.value = true;
    try{
        const response = await store.register(values);
        
        toast({
            title:'Success',
            description:'registered successfully'
        })
        router.push("/login")
    }catch(error){
        toast({
            title: 'Error',
            variant: "destructive",
            description: error as string // Ensure this is a string
        });
    }finally{
        isSubmitting.value = false;
    }
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-col justify-center items-center">
    <Card class="w-[450px]">
    <CardHeader>
      <CardTitle>Welcome to vue</CardTitle>
      <CardDescription>Please enter your name and email and password</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
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
        <FormField v-slot="{ componentField }" name="role">
      <FormItem>
        <FormLabel>Role</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a role to display" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="USER">User</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
        <Button type="submit" class="mt-5 w-full text-center" :disabled="isSubmitting"> 
            {{ isSubmitting ? 'Submitting...':'Register' }}    
        </Button>
      </form>
      <div class="py-3 mt-2 text-center">
          Already have an account? <RouterLink class="text-blue-400 hover:underline" to="/login">Login</RouterLink>
      </div>
    </CardContent>
  </Card>
  </div>
</template>
