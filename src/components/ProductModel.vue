<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import { addProductSchema } from "@/lib/validations";
import { useObjectUrl } from '@vueuse/core'
import { Textarea } from '@/components/ui/textarea'
import storeCategory from "@/stores/categoryStore";


import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ref } from "vue";
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
import productModal from "@/composables/useProductModel.ts";
import { useForm } from "vee-validate";
import  productStore  from "@/stores/productStore";
import FileUpolad from "@/components/FileUpload.vue"
import { computed } from "vue";
const { isOpen, onClose } = productModal();
const store = storeCategory();
const { createProduct } = productStore();
const categories = computed(() => store.categoriesData.categories);
const { toast } = useToast();
const isSubmitting = ref(false);
const mainImage = ref<string[]>([]);
const subImages = ref<string[]>([]);
const form = useForm({
  validationSchema: addProductSchema,
});
const onSubmit = form.handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;
    // Ensure mainImage is always included
    const formData = new FormData();
          formData.append('name',values?.name);
          formData.append('price', values?.price?.toString());
          formData.append('description',values?.description);
          formData.append('category',values?.category);
          formData.append('stock',values?.stock?.toString());
          formData.append('mainImage',values?.mainImage);
          values?.subImages?.forEach((image)=>{
            formData.append('subImages',image);
          })
    const res = await createProduct(formData);
    if (res) {
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      onClose();
    }else{
      toast({
        title: "Error",
        variant: "destructive",
        description: "Product not created",
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      variant: "destructive",
      description: error as string, // Ensure this is a string
    });
  } finally {
    isSubmitting.value = false;
  }
});

  const onMainImageChange = (files: FileList | null) => {
    if(files){
      Array.from(files).forEach((file, index) => {
        if(index === 0){
          const url = useObjectUrl(file as Blob)
          if(url?.value){
            mainImage.value.push(url?.value);
            form.setFieldValue('mainImage',file);
          }
        }
      })
    }
  };
  const onMainImageUpload = (files: File[] | null) => {
    if(files){
      files?.forEach((file, index) => {
        if(index === 0){
          const url = useObjectUrl(file)
          if(url?.value){
            mainImage.value.push(url?.value)
          }
        }
      })
    }
  };
  const onSubImagesChange = (files: FileList | null) => {
    if(files){
      Array.from(files).forEach((file, index) => {
          const url = useObjectUrl(file as Blob)
          if(url?.value){
            subImages.value.push(url?.value)
            form.setFieldValue('subImages', [...(form.values.subImages || []), file])
          }
      })
    }
  };
  const onSubImagesUpload = (files: File[] | null) => {
    if(files){
      files?.forEach((file, index) => {
          const url = useObjectUrl(file)
          if(url?.value){
            subImages.value.push(url?.value)
          }
        
      })
    }
  };
</script>

<template>
  <Modal
    title="Create Product"
    description="all fields are required"
    :isOpen="isOpen"
    @on-close="onClose"
  >
    <form @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter Product name"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter product price"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="stock">
        <FormItem>
          <FormLabel>Stock</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter product stock"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter product description"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="category">
        <FormItem>
          <FormLabel>Category</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                  >{{ category?.name }}</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="mainImage">
        <FormItem>
          <FormLabel>Main Image</FormLabel>
          <FileUpolad @on-change="onMainImageChange" @on-drop="onMainImageUpload" :multiple="false"/>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="py-3" >
        <img v-for="image in mainImage" :key="image" :src="image" class="w-auto h-40 object-cover" />
      </div>
      <FormField v-slot="{ componentField }" name="subImages">
        <FormItem>
          <FormLabel>Sub Image</FormLabel>
          <FileUpolad @on-change="onSubImagesChange" @on-drop="onSubImagesUpload" :multiple="true"/>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="py-3 flex flex-wrap items-center gap-2" >
        <img v-for="image in subImages" :key="image" :src="image" class="w-auto h-40 object-cover" />
      </div>
      <Button
        type="submit"
        class="mt-5 w-full text-center bg-black text-white rounded-lg py-3"
        variant="primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Submitting..." : "Submit" }}
      </Button>
    </form>
  </Modal>
</template>
