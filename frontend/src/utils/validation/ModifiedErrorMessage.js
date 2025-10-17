export const handleModifier = (value) => {
    if (value?.includes(' ')) {
        let modifiedValue = value.replaceAll(' ', '_');
        modifiedValue = modifiedValue.replace('_is_a_required_field', '_is_required');
        return modifiedValue;
    }
    return value;
};
