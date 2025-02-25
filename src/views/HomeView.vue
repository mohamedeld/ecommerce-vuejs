<script setup lang="ts">
  import {Button} from "@/components/ui/button";
  import ProductModel from "@/components/ProductModel.vue";
  import useProductModel from "@/composables/useProductModel";
  import { useGlobalLoader } from "vue-global-loader";
import { useToast } from "@/components/ui/toast";
import storeCategory from "@/stores/categoryStore";
import { onMounted } from "vue";
const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
  screenReaderMessage: "get all categories, please wait...",
});
  const store = storeCategory();
  const {isOpen,onOpen} = useProductModel();
  const {toast} = useToast();
  const fetchAllCategories = async () => {
  try {
    displayLoader();
    await store.getCategories(1, 1000);
  } catch (error) {
    toast({
      title: "Error",
      variant: "destructive",
      description: error as string, // Ensure this is a string
    });
    return;
  } finally {
    destroyLoader();
  }
};


onMounted(async () => {
  await fetchAllCategories();
});
</script>

<template>
  <ProductModel v-if="isOpen"/>
  <div class="w-full min-h-screen max-w-4xl mt-5 md:mt-[6rem] mx-auto">
    <div class="flex justify-between items-center ">
      <h3 class="text-2xl font-bold">All Products</h3>
      <Button @click="onOpen">Add Product</Button>
    </div>
  </div>
</template>
