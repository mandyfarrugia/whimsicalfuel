import { helpers } from "@vuelidate/validators";
import { convertYouTubeLinkToEmbedLink } from "../services/linkToEmbedConversion";

export function useCustomLinkValidator() {
    const isValidUrl = helpers.withMessage(
        'Please enter a valid URL!',
        (value) => {
            if(!value) return true;

            try {
                const url = new URL(value);
                return url.protocol === 'http:' || url.protocol === 'https:';
            } catch {
                return false;
            }
        }
    );

    const isValidVideoLink = helpers.withMessage(
        'Please enter a valid video link!',
        (value) => {
            if(!value) return true;
            return convertYouTubeLinkToEmbedLink(value).length > 0;
        }
    );

    return { isValidUrl, isValidVideoLink }
}