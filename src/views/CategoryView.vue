<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { RouterLink, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import storeCategory from "@/stores/categoryStore";
import { ref,onMounted } from "vue";
import { useGlobalLoader } from 'vue-global-loader'

const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
  screenReaderMessage:
    'get all categories, please wait...'
})

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
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast/use-toast";
import { Input } from "@/components/ui/input";

import { addCategorySchema } from "@/lib/validations";
const router = useRouter();
const { toast } = useToast();
const form = useForm({
  validationSchema: addCategorySchema,
});
const categories = ref([])
const store = storeCategory();
const isSubmitting = ref(false);
const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    const response = await store.createCategory(values);

    toast({
      title: "Success",
      description: "Category created successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      variant: "destructive",
      description: error as string, // Ensure this is a string
    });
    return;
  } finally {
    isSubmitting.value = false;
  }
});

const fetchAllCategories = async () => {
  try {
    
     await store.getCategories(1, 10);
    destroyLoader()
  } catch (error) {
    destroyLoader()
    toast({
      title: "Error",
      variant: "destructive",
      description: error as string, // Ensure this is a string
    });
    return;
  }finally{
    destroyLoader()
  }
};

onMounted(async () => {
  categories.value =  await fetchAllCategories();
})
</script>

<template>
  <div class="w-full min-h-screen flex flex-col justify-center items-center">
    <Card class="w-[450px]">
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>Please enter category name</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter category name"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button
            type="submit"
            class="mt-5 w-full text-center"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Creating..." : "Create" }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
