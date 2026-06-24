export const matchesSelectedValue = (fieldValue, selectedValue) => {
    if(!fieldValue || !selectedValue) return false;

    if(Array.isArray(fieldValue)) {
        return fieldValue.some((value) => {
            return value.toLocaleLowerCase() === selectedValue.toLocaleLowerCase();
        });
    }

    return fieldValue.toLocaleLowerCase() === selectedValue.toLocaleLowerCase();
};