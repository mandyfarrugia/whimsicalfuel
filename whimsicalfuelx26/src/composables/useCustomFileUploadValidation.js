import { helpers } from '@vuelidate/validators';

export function useCustomFileUploadValidation() {
  const isFileUploadAnImage = helpers.withMessage(
      'Please note that only image files are accepted!',
      (value) => {
        if (!value) return true;
        const fileUpload = Array.isArray(value) ? value.at(0) : value;
        if (!fileUpload) return true;
        return fileUpload.type.startsWith('image/');
      },
    );

  const isFileUploadSizeValid = (maximumFileUploadSizeInMegabytes) =>
    helpers.withParams(
      { type: 'isFileUploadSizeValid', maximumFileUploadSizeInMegabytes },
      helpers.withMessage(
        ({ $params }) =>
          `Please note that file upload size must not exceed ${$params.maximumFileUploadSizeInMegabytes} megabytes!`,
        (value) => {
          if (!value) return true;
          const fileUpload = Array.isArray(value) ? value.at(0) : value;
          if (!fileUpload) return true;
          return (
            fileUpload.size <= maximumFileUploadSizeInMegabytes * 1024 * 1024
          );
        },
      ),
    );

  const minimumDimensions = (width, height) =>
    helpers.withParams(
      { width, height },
      helpers.withMessage(
        ({ $params }) =>
          `Image must be at least ${$params.width} pixels (width) and ${$params.height} pixels (height).`,
        helpers.withAsync(async (value) => {
          if (!value) return true;
          const fileUpload = Array.isArray(value) ? value.at(0) : value;
          return new Promise((resolve) => {
            const image = new Image();
            const url = URL.createObjectURL(fileUpload);

            image.onload = () => {
              URL.revokeObjectURL(url);
              resolve(
                image.naturalWidth >= width && image.naturalHeight >= height,
              );
            };

            image.onerror = () => {
              URL.revokeObjectURL(url);
              resolve(false);
            };

            image.src = url;
          });
        }),
      ),
    );

  return { isFileUploadAnImage, isFileUploadSizeValid, minimumDimensions };
}
