<script setup lang="ts">
  import {Button} from "@/components/ui/button";
  import ProductModel from "@/components/ProductModel.vue";
  import productStore from "@/stores/productStore";
  import { BsFillPencilFill,BsFillTrash3Fill } from "vue-icons-plus/bs";

  import useProductModel from "@/composables/useProductModel";
  import { useGlobalLoader } from "vue-global-loader";
import { useToast } from "@/components/ui/toast";
import storeCategory from "@/stores/categoryStore";
import { onMounted } from "vue";

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { computed } from "vue";
import { ref } from "vue";
import { watch } from "vue";
const { displayLoader, destroyLoader, isLoading } = useGlobalLoader({
  screenReaderMessage: "get all categories, please wait...",
});
  const store = storeCategory();
  const storeProduct = productStore();
  const {isOpen,onOpen} = useProductModel();
  const currentPage = ref(1); // Track the current page
const itemsPerPage = 10;
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

const fetchAllProducts = async () => {
  try {
    displayLoader();
    await storeProduct?.getProducts(currentPage.value, itemsPerPage);
  } catch (error) {
    console.log(error);
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
  await fetchAllProducts();
});
const products = computed(() => storeProduct?.productsData?.products);
const totalPages = computed(() => storeProduct?.productsData?.totalPages ?? 1);
const hasNextPage = computed(() => storeProduct?.productsData?.hasNextPage);
const hasPrevPage = computed(() => storeProduct?.productsData?.hasPrevPage);

const pages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  const range = [];
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i);
  }
  if (current - delta > 2) {
    range.unshift('...');
  }
  if (current + delta < total - 1) {
    range.push('...');
  }
  range.unshift(1);
  if (total > 1) {
    range.push(total);
  }
  return range.map((value) => (typeof value === 'number' ? { type: 'page', value } : { type: 'ellipsis' }));
});

watch(currentPage, async () => {
  await fetchAllProducts();
});
</script>

<template>
  <ProductModel v-if="isOpen"/>
  <div class="w-full min-h-screen max-w-4xl mt-5 md:mt-[6rem] mx-auto">
    <div class="flex justify-between items-center ">
      <h3 class="text-2xl font-bold">All Products</h3>
      <Button @click="onOpen">Add Product</Button>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
      <Card v-for="product in products" :key="product?._id">
        <CardContent class="flex flex-col gap-4">
          <div class="overflow-hidden rounded-md">
          <img
            :src="product?.mainImage?.url"
            alt="product image"
            class="w-full h-40 object-cover transition-all hover:scale-105"
          />
        </div>
        <h3 class="text-xl font-semibold">{{ product?.name?.slice(0,90) }}</h3>
        <p>{{ product?.description?.slice(0,140) }}</p>
        
        </CardContent>
        <CardFooter class="border-t p-4 pt-4 w-full justify-between">
          <p>{{ product?.price }}</p>
          <div class="flex space-x-2">
            <Button variant="secondary">
              <BsFillPencilFill class="w-4 h-4" />
            </Button>
            <Button variant="destructive">
              <BsFillTrash3Fill  class="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    <div class="w-full flex justify-center" v-if="totalPages > 1">
      <Pagination
        v-slot="{ pageCount: page }"
        :total="totalPages"
        :current="currentPage"
        :default-page="1"
        :items-per-page="itemsPerPage"
      >
        <PaginationList class="flex items-center gap-1">
          <PaginationFirst @click="currentPage = 1" />
          <PaginationPrev @click="currentPage = Math.max(1, currentPage - 1)" />
          <template v-for="(item, index) in pages" :key="index">
            <PaginationListItem v-if="item.type === 'page' && item.value !== undefined" :value="item.value">
              <Button
                class="w-10 h-10 p-0"
                :variant="currentPage === item.value ? 'default' : 'secondary'"
                @click="currentPage = item.value"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationListItem v-if="item.type === 'ellipsis'" :value="0">
              <span>...</span>
            </PaginationListItem>
          </template>
          <PaginationNext @click="hasNextPage && (currentPage += 1)" />
          <PaginationLast @click="currentPage = totalPages" />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
