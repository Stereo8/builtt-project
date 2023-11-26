export type Product = {
    name: string,
    price: number,
    productImageFileName: string,
    id: number,
    discount?: number,
}

export type WithQuantity = {
    quantity: number
}