import { Photo } from "pexels";

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
