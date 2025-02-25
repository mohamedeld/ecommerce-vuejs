export interface ApiResponse<T>{
    message:string;
    statusCode:number;
    success:boolean;
    data:T
}

// Define the interface for the Avatar
interface Avatar {
    url: string;
    localPath: string;
    _id: string;
}

// Define the main User interface
export interface User {
    avatar: Avatar;
    createdAt: string; // or Date if you prefer Date objects
    email: string;
    isEmailVerified: boolean;
    loginType: string;
    role: string;
    updatedAt: string; // or Date if you prefer Date objects
    username: string;
    __v: number;
    _id: string;
}

