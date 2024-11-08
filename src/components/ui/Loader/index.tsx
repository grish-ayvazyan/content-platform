import { LoaderWrapper, StyledLoader } from "./styles.ts";

const Loader = ({ hasContainer = false }: { hasContainer?: boolean }) => {
    if (hasContainer) {
        return <StyledLoader />;
    }

    return (
        <LoaderWrapper>
            <StyledLoader />
        </LoaderWrapper>
    );
};

export default Loader;
