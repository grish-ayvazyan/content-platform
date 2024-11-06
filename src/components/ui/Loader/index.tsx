import { Loader, LoaderWrapper } from "./style";

const LoaderComponent = () => {
    return (
        <LoaderWrapper>
            <Loader />
        </LoaderWrapper>
    );
};

LoaderComponent.displayName = "Loader";

export default LoaderComponent;
