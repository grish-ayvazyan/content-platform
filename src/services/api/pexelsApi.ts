import { createClient, ErrorResponse, Photos, PhotosWithTotalResults } from "pexels";

const API_KEY = import.meta.env.VITE_API_KEY;
const client = createClient(API_KEY);

export const fetchPhotos = async (page: number): Promise<PhotosWithTotalResults> => {
    const perPage = 25;

    try {
        const response: Photos | ErrorResponse = await client.photos.curated({
            page,
            per_page: perPage,
        });

        if ("total_results" in response) {
            return response as PhotosWithTotalResults;
        } else {
            throw new Error("API response does not match expected format.");
        }
    } catch (error) {
        console.error("Error fetching photos from Pexels API:", error);
        throw new Error("Failed to fetch photos");
    }
};
