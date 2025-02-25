export interface Category {
    __v: number;
    _id: string;
    createdAt: string; // Use Date if you prefer Date objects
    name: string;
    owner: string;
    updatedAt: string; // Use Date if you prefer Date objects
}

export interface AddCategory{
    name:string;
}

export type PaginationContent = {
    limit:number;
    page:number;
    totalPages:number;
    serialNumberStartFrom:number;
    hasPrevPage:boolean;
    hasNextPage:boolean;
    prevPage:null | number;
    nextPage:null | number;
}

export type Categories = PaginationContent & {
    totalCategories:number;
    categories:Category[]
}