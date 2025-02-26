export interface IProduct{
  name:string;
  description:string;
  price:string;
  category:string;
  stock:string;
  subImages:string[];
  mainImage:string;
}


interface Product {
  __v: number;
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  mainImage: {
    _id: string;
    localPath: string;
    url: string;
  };
  name: string;
  owner: string;
  price: number;
  stock: number;
  subImages: Array<{
    _id: string;
    localPath: string;
    url: string;
  }>;
  updatedAt: string;
}

export interface ProductsResponse {
  data: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    prevPage: null | number;
    products: Product[];
    serialNumberStartFrom: number;
    totalPages: number;
    totalProducts: number;
  };
  message: string;
  statusCode: number;
  success: boolean;
}

export interface ProductPagination {
  hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    prevPage: null | number;
    products: Product[];
    serialNumberStartFrom: number;
    totalPages: number;
    totalProducts: number;
}