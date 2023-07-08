export const useAdditionCSSClass = (
    defaultClassName: string,
    AdditionalClassName?: string,
    isFlag: boolean = true
): string => {
    if (AdditionalClassName && isFlag) {
        return [AdditionalClassName, defaultClassName].join(' ')
    }
    return defaultClassName
}