import axios from "axios";

export type ArtItem = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: Category[];
    imageLinks: ImageLink[];
}

export type ArtItemUpload = {
    name: string;
    prize: number;
    imagelink: string;
    description: string;
    category: string;
}

export type ImageLink = {
    id: number,
    link: string
}


export type Category = {
    id: number,
    categoryName: string,
}

//https://mighty-spire-02089.herokuapp.com/
const httpBackend = axios.create({
    baseURL: "http://localhost:8080",
    responseType: "json",
});


const getAllItems = async () => {
    const response = await httpBackend.get("/art/all");
    return response.data;
}

const getItemById = async (id: number) => {
    const response = await httpBackend.get(`/art/${id}`)
    return response.data;
}


export const apiService = {
    getAllItems,
    getItemById,
}
