export function formatCurrency(number: number){
    return number.toLocaleString("en", { style: "currency", currency: "USD", minimumFractionDigits: 0 , maximumFractionDigits: 2,})
}