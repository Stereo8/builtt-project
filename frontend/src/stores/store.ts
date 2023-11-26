import {createGlobalObservable, useLocalObservable} from 'mobx-vue-lite'
import type {Product, WithQuantity} from "@/types/product";

export const useStore = createGlobalObservable(() => {
    return useLocalObservable(() => {
        return {
            auth: {
                token: ''
            },
            basket: new Array<Product & WithQuantity>(),
            get ukupno() {
                return this.basket.reduce((acc, curr) => {
                    return acc + (curr.price * curr.quantity)
                }, 0)
            },
            get usteda() {
                return this.basket.reduce((acc, curr) => {
                    return acc + (curr.discount * curr.quantity)
                }, 0)
            },
            get zaUplatu() {
                return this.ukupno - this.usteda
            },
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
            },
            addOneToProduct(id: number) {
                const index = this.basket.findIndex((p) => p.id === id)
                console.log(index)
                if (this.basket[index]) {
                    this.basket[index].quantity += 1
                }
            },
            removeOneFromProduct(id: number) {
                const index = this.basket.findIndex((p) => p.id === id)
                if (this.basket[index]) {
                    this.basket[index].quantity -= 1
                }
            }
        }
    })
})