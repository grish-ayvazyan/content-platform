import { Photo } from "@/services/api/types.ts";

export type ItemPosition = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export type MasonryItemProps = {
    photo: Photo;
    position: ItemPosition;
};
