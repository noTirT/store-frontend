import axios from "axios";

export type ArtItem = {
    id: number;
    name: string;
    prize: number;
    imagelink: string;
    description: string;
    category: string;
}

export type ArtItemUpload = {
    name: string;
    prize: number;
    imagelink: string;
    description: string;
    category: string;
}

const httpBackend = axios.create({
    baseURL: "https://mighty-spire-02089.herokuapp.com/",
    responseType: "json",
});


const getAllItems = async () => {
    const response = await httpBackend.get("/art/all");
    return response.data;
}


export const apiService = {
    getAllItems,
}
