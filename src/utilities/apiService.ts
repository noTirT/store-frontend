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

const IMGBB_API_KEY = import.meta.env.VITE_REACT_APP_IMGBB_API_KEY;

const httpBackend = axios.create({
    baseURL: "https://mighty-spire-02089.herokuapp.com/",
    responseType: "json",
});
const httpImgBB = axios.create({
    baseURL: "https://api.imgbb.com/1/upload",
})

const getAllItems = async () => {
    const response = await httpBackend.get("/art/all");
    return response.data;
}

const uploadImage = async (base64Image: string | undefined) => {
    if (base64Image == undefined) return false;
    const formData = new FormData();
    formData.set("key", IMGBB_API_KEY)
    formData.append("image", base64Image)
    const response = await httpImgBB.post("", formData);
    return response.data;
}

const uploadItem = async ({ name, prize, imagelink, description, category }: ArtItemUpload) => {
    await httpBackend.post("/art", {
        name, prize, imagelink, description, category
    });
}

export const apiService = {
    getAllItems,
    uploadImage,
    uploadItem,
}
