import { helpers } from "@vuelidate/validators";

export function useCustomDateValidation() {
    const isDateValid = helpers.withMessage(
        'Please provide a valid release date!',
        (value) => !Number.isNaN(Date.parse(value)));

    const cannotBeFromTheFuture = helpers.withMessage(
        'Date cannot be from the future!',
        (value) => new Date(value) <= new Date());

    const isAtLeastOfMinimumAge = (minimumAge) => {
        return helpers.withMessage(
            `You must be at least ${minimumAge} years old!`,
            (value) => {
                if(!value) return false;

                const dateOfToday = new Date();
                const dateOfBirth = new Date(value);

                let age = dateOfToday.getFullYear() - dateOfBirth.getFullYear();
                const hasBirthdayPassedThisYear = dateOfToday.getMonth() > dateOfBirth.getMonth() ||
                    (dateOfToday.getMonth() === dateOfBirth.getMonth() &&
                        dateOfToday.getDate() >= dateOfBirth.getDate());

                if(!hasBirthdayPassedThisYear) age--;
                return age >= minimumAge;
            }
        );
    }

    return { isDateValid, cannotBeFromTheFuture, isAtLeastOfMinimumAge };
}