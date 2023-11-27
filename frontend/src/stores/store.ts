import {createGlobalObservable, useLocalObservable} from 'mobx-vue-lite'
import type {Product, WithQuantity} from "@/types/product";
import {useRouter} from "vue-router";


export const useStore = createGlobalObservable(() => {
    return useLocalObservable(() => {
        const router = useRouter()

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
            paymentError: false,
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
            },
            async plati() {
                this.paymentError = false
                const payload=  JSON.stringify({
                    basketContents: this.basket.map((p) => {
                        return {id: p.id, quantity: p.quantity}
                    })
                });
                const requestConfig: RequestInit = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.auth.token}`
                    },
                    method: 'POST',
                    body: payload
                }

                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, requestConfig).then(r => r.json())
                    if (response.status === 'ok') {
                        const orderId = response.data.id
                        // await router.push(`/order/${orderId}`)
                    } else {
                        this.paymentError = true
                    }
                } catch (e) {
                    this.paymentError = true
                }
            }
        }
    })
})