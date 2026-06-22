import {Spinner} from "@heroui/react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size="lg" color="success" />
        </div>
    );
};

export default LoadingSpinner;