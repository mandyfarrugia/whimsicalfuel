export function useAnimationHelper() {
    const getErrorAnimationClass = (inputElement) => {
        return inputElement.$error ? 'animate__animated animate__shakeX' : '';
    };

    return { getErrorAnimationClass };
};