export type Product = {
    name: string,
    price: number,
    productImageFileName: string,
    id: number,
    discount?: number,
    packSize: string,
}

export type WithQuantity = {
    quantity: number
}