import { Photo, PhotosWithTotalResults } from "@/services/api/types.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
    Authorization: API_KEY,
};

/**
 * Fetches a list of curated photos from the Pexels API.
 * @param page The page number for pagination.
 * @returns A promise resolving to PhotosWithTotalResults.
 */

export const fetchPhotos = async (page: number): Promise<PhotosWithTotalResults> => {
    const perPage = 25;
    const url = `${BASE_URL}/curated?page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data?.error || "Failed to fetch photos"}`);
        }

        if ("total_results" in data) {
            return data as PhotosWithTotalResults;
        } else {
            throw new Error("API response does not match expected format.");
        }
    } catch (error) {
        console.error("Error fetching photos from Pexels API:", error);
        throw new Error("Failed to fetch photos");
    }
};

/**
 * Fetches a single photo by ID from the Pexels API.
 * @param id The photo ID.
 * @returns A promise resolving to a Photo.
 */

export const fetchPhoto = async (id: string): Promise<Photo> => {
    const url = `${BASE_URL}/photos/${id}`;

    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data?.error || "Failed to fetch photo"}`);
        }

        if ("id" in data) {
            return data as Photo;
        } else {
            throw new Error("API response does not match expected format.");
        }
    } catch (error) {
        console.error("Error fetching photo from Pexels API:", error);
        throw new Error("Failed to fetch photo");
    }
};
