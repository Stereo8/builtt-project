import { createGlobalObservable, useLocalObservable } from 'mobx-vue-lite'

export const useStore = createGlobalObservable(() => {
    return useLocalObservable(() => {
        return {
            auth: {
                token: ''
            },
            setAuthToken(token) {
                this.auth.token = token
            }
        }
    })
})