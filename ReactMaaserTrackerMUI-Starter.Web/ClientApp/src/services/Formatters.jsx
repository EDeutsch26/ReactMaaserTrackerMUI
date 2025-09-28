const usLocale = 'en-US';


export function formatDate(date) {
    return new Date(date).toLocaleDateString(usLocale);
}


export function formatMoney(amount) {
    return new Intl.NumberFormat(usLocale, {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}