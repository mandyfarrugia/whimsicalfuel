export function useAnimationHelper() {
    const getErrorAnimationClass = (inputElement) => {
        if(!inputElement) return '';
        if(!inputElement.$dirty || !inputElement.$error) return '';
        return 'animate__animated animate__shakeX';
    };

    return { getErrorAnimationClass };
};