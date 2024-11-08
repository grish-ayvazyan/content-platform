import { Placeholder } from "@/components/ui/ImagePlaceholder/styles.ts";
import { ImagePlaceholderProps } from "@/components/ui/ImagePlaceholder/types.ts";

const ImagePlaceholder = ({ width = "100%", height = "100%", $avgColor }: ImagePlaceholderProps) => {
    return <Placeholder width={width} height={height} $avgColor={$avgColor} />;
};

export default ImagePlaceholder;
