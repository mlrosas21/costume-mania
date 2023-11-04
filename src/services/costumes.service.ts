import { ApiResponse } from "@/interfaces/costume";

export const getCostume = async (costumeId: number) => {
    const url = `${process.env.URL_LOCAL}/api/costumes/${costumeId}`
    const response = await fetch(url);
    return await response.json();
}

export const getCostumes = async (query: any): Promise<ApiResponse> => {
    const params = new URLSearchParams()
    const {category, search, size} = query

    if(category) params.set("category", category)
    if(size) params.set("size", size)
    if(!category && !search && !size) params.set("page", "0")

    const url = `${process.env.URL_LOCAL}/api/costumes?${params.toString()}`
    const response = await fetch(url);
    return await response.json();
}

export const getPopularCostumes = async () => {
    const url = `${process.env.URL_LOCAL}/api/costumes/popular`
    const response = await fetch(url);
    return await response.json();
}

export const getNewCostumes = async () => {
    const url = `${process.env.URL_LOCAL}/api/costumes/new`
    const response = await fetch(url);
    return await response.json();
}