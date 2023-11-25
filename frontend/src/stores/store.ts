import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'
import type {Product, WithQuantity} from "@/types/product";

export const useStore = createGlobalObservable(() => {
    return useLocalObservable(() => {
        return {
            auth: {
                token: ''
            },
            basket: new Array<Product & WithQuantity>(),
            setAuthToken(token) {
                this.auth.token = token
            },
            addProductToBasket(p: Product & WithQuantity) {
                const productInBasket = this.basket.find((product) => product.id === p.id)
                if (productInBasket) {
                    productInBasket.quantity += p.quantity
                } else {
                    this.basket.push(p)
                }
            },
            removeProductFromBasket(id: number) {
                this.basket = this.basket.filter((p) => p.id !== id)
            }
        }
    })
})