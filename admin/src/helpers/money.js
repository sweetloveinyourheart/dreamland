export function moneyConverter(value) {
    const formated = Intl.NumberFormat().format(value)
    const zeroGroup = (formated.match(/,/g) || []).length

    switch (zeroGroup) {
        case 2:
            return formated.slice(0, formated.indexOf(",", 2)) + " triệu"
        case 3:
            return formated.slice(0, formated.indexOf(",", 3) - 1) + " tỷ"

        default:
            return formated
    }
}