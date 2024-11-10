interface PaginationObject {
    url?: string;
    page: number;
    per_page: number;
    next_page: number;
}
export interface Photo {
    id: number;
    width: number;
    height: number;
    url: string;
    alt: string | null;
    avg_color: string | null;
    photographer: string;
    photographer_url: string;
    photographer_id: string;
    liked: boolean;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
}
export declare type Photos = PaginationObject & {
    photos: Photo[];
};
export declare type PhotosWithTotalResults = Photos & {
    total_results: number;
};
