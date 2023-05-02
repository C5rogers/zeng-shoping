import { createStore } from "vuex";

//need to install piniya to make it cool to work with it next time

import router from "../router";
import axios from "axios";
import $api from "../api/api";

axios.defaults.baseURL = "http://localhost:8000/api/"

export const store = createStore({
    state: {
        authenticated: localStorage.getItem('ZENG_SHOPING_AUTH_TOKEN') ? true : false,
        // authenticated: true,
        authUser: [],
        authError: [],
        loginError: [],
        userProfile: localStorage.getItem('USERE_PROFILE'),
        allItems: [],
        itemErrors: [],
        likedItems: localStorage.getItem('LIKED_ITEMS') ? localStorage.getItem('LIKED_ITEMS').split(',') : [],
        singleItem: [],
        carts: [],
        totalPrice: 0.0,
        toatlCartItem: 0,
        searchInput: '',
        OrderQueue: [],
        totalItemRating: 0,
    },
    getters: {
        user: state => state.authUser,
        errors: state => state.authError,
        loginErrors: state => state.loginError,
        userProfile: state => state.userProfile,
        allItems: state => state.allItems,
        itemErrors: state => state.itemErrors,
        likedItems: state => state.likedItems,
        singleItem: state => state.singleItem,
        carts: state => state.carts,
        totalPrice: state => state.totalPrice,
        toatlCartItem: state => state.toatlCartItem,
        isAuthenticated: state => state.authenticated,
        searchInput: state => state.searchInput,
        GrandFilter: (state) => (payload) => {
            switch (payload) {
                case 1:
                    if (state.searchInput !== 'All') {
                        return state.allItems.filter((item) => item.name.includes(state.searchInput) || item.description.includes(state.searchInput) || item.price == state.searchInput || item.catagory.includes(state.searchInput) || item.id == state.searchInput || item.brand.includes(state.searchInput))
                    } else {
                        return state.allItems
                    }
                case 2:
                    if (state.searchInput !== 'All') {
                        return state.carts.filter((cart) => cart.name.includes(state.searchInput) || cart.catagory.includes(state.searchInput) || cart.price == state.searchInput || cart.brand.includes(state.searchInput) || cart.id == state.searchInput || cart.brand.includes(state.searchInput))
                    } else {
                        return state.carts
                    }
            }
        },
        OrderQueue: state => state.OrderQueue,
        calculateItemRating: (state) => (payload) => {
            var RatingResult = (payload / state.totalItemRating)
            RatingResult *= 100
            if (RatingResult < 5) {
                return "One"
            } else if (RatingResult < 10) {
                return "Two"
            } else if (RatingResult < 25) {
                return "Three"
            } else if (RatingResult < 40) {
                return "Foure"
            } else {
                return "five"
            }
        },

    },
    mutations: {
        calculateTotalRating: (state) => {
            var sum = 0
            state.allItems.forEach(item => {
                sum += item.rating
            });
            state.totalItemRating = sum
        },
        setOrderQueue: (state, payload) => {
            state.OrderQueue = payload
        },
        filterDeletedOrder: (state, payload) => {
            state.OrderQueue = state.OrderQueue.filter((order) => order.id != payload)
        },
        setSearchInput: (state, payload) => {
            state.searchInput = payload
        },
        setTotalCartItem: (state, payload) => {
            state.toatlCartItem = payload
        },
        incrementTotalCartItem: (state) => {
            state.toatlCartItem += 1
        },
        setItemErrors: (state, payload) => {
            state.itemErrors = payload
        },
        setCarts: (state, payload) => {
            state.carts = payload
        },
        readLikeItem: (state) => {
            state.likedItems = localStorage.getItem('LIKED_ITEMS') ? localStorage.getItem('LIKED_ITEMS').split(',') : []
            if (state.likedItems.length > 0) {
                const length = state.likedItems.length;
                var numberArray = []
                for (var i = 0; i < length; i++) {
                    numberArray.push(parseInt(state.likedItems[i]))
                }
                state.likedItems = numberArray
            }
        },
        appendLikedItem: (state, id) => {
            state.likedItems.push(id)
        },
        removeLikedItem: (state, id) => {
            const newArray = state.likedItems.filter(item => item != id)
            state.likedItems = newArray
        },
        writeLikeItem: (state) => {
            if (state.likedItems.length > 0) {
                localStorage.setItem('LIKED_ITEMS', state.likedItems.join(','))
            }
        },
        setAllItems: (state, payload) => {
            state.allItems = payload
        },
        setSingleItem: (state, payload) => {
            state.singleItem = payload
        },
        appendToAllItems: (state, payload) => {
            state.allItems.push(payload)
        },
        setUser: (state, payload) => {
            state.authUser = payload
        },
        setErrors: (state, payload) => {
            state.authError = payload
        },
        setLoginErrors: (state, payload) => {
            state.loginError = payload
        },
        changeAuthentcated: (state, payload) => {
            state.authenticated = payload
        },
        setUserProfile: (state, payload) => {
            state.userProfile = payload
        },
        filterCartItem: (state, payload) => {
            state.carts = state.carts.filter((cart) => cart.id == payload.id ? payload : cart)
        },
        setTotalPrice: (state, payload) => {
            state.totalPrice = payload
        },
        computeTotal: (state) => {
            state.carts.forEach(cart => {
                state.totalPrice += cart.total_price
            });
            state.totalPrice = state.totalPrice.toFixed(2)
        },
        filterOutDeleted: (state, id) => {
            state.carts = state.carts.filter((cart) => cart.id != id)
        },
        readAuthenticatedUer: (state) => {
            state.authenticated = localStorage.getItem('ZENG_SHOPING_AUTH_TOKEN') ? true : false
        }


    },
    actions: {
        async getUser(context) {
            const res = await $api.get('user')
            context.commit('setUser', res.data)
        },
        async getAllItems(context) {
            try {
                const result = await axios.get('item')
                context.commit('setAllItems', result.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getOrders(context) {
            try {
                const result = await $api.get('order')
                context.commit('setOrderQueue', result.data)
            } catch (error) {
                console.log(error)
            }
        },
        async createOrder(context, form) {
            try {
                const result = await $api.post('order', form)
                context.commit('setCarts', [])
            } catch (error) {
                console.log(error)
            }
        },
        async deleteOrder(context, id) {
            try {
                const result = await $api.delete(`order/${id}`)
                context.commit('filterDeletedOrder', id)
            } catch (error) {
                console.log(error)
            }
        },
        async getCarts(context) {
            try {
                const responce = await $api.get('cart')
                context.commit('setCarts', responce.data)
            } catch (error) {
                console.log(error)
            }
        },
        async updateCartItems(context, form) {
            try {
                const result = await $api.put(`cart/${form.id}`, form)
                context.commit('filterCartItem', result.data)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteCartItem(context, id) {
            try {
                const result = await $api.delete(`cart/${id}`)
                context.commit('filterOutDeleted', id)
            } catch (error) {
                console.log(error)
            }
        },
        async addToCart(context, form) {
            try {
                const result = await $api.post('cart', form)
                context.commit('incrementTotalCartItem')
            } catch (error) {
                console.log(error)
            }
        },
        async getSingleItem(context, id) {
            try {
                const result = await axios.get(`item/${id}`)
                context.commit('setSingleItem', result.data)
            } catch (error) {
                console.log(error)
            }
        },
        async handleSignup(context, form) {
            await axios.get('/sanctum/csrf-cookie').then(response => {
                const result = axios.post('signup', form)
                    .then(result => {
                        if (result.status == 201 && result.data && result.data.token) {
                            localStorage.setItem('ZENG_SHOPING_AUTH_TOKEN', result.data.token)
                            context.commit('setUser', result.data.user)
                            context.commit('changeAuthentcated', true)
                            if (result.data.user.profile) {
                                localStorage.setItem('USERE_PROFILE', result.data.user.profile)
                            }
                            router.push({ name: 'home' })
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 422) {
                            context.commit('setErrors', error.response.data.errors)
                        } else {
                            console.log(error)
                        }
                    })
            })
        },
        async handleLogin(context, form) {

            try {
                await axios.get('/sanctum/csrf-cookie')
                const result = await axios.post('login', form)
                if (result.status == 201 && result.data && result.data.token) {
                    localStorage.setItem('ZENG_SHOPING_AUTH_TOKEN', result.data.token)
                    context.commit('changeAuthentcated', true)
                    context.commit('setUser', result.data.user)
                    if (result.data.user.profile) {
                        localStorage.setItem('USERE_PROFILE', result.data.user.profile)
                    }
                    router.push({ name: 'home' })
                }

            } catch (error) {
                if (error.response.status) {
                    if (error.response.status === 422) {
                        context.commit('setLoginErrors', error.response.data.errors)
                    }
                } else {
                    console.log(error)
                }
            }
        },
        async handleCreate(context, form) {
            try {
                const result = await $api.post('item', form)
                if (result.status === 201) {
                    context.commit('appendToAllItems', result.data.item)
                }
                router.push({ name: 'Items' })
            } catch (error) {
                if (error.response.status === 422) {
                    context.commit('setItemErrors', error.response.data.errors)
                } else {
                    console.log(error)
                }
            }
        },
        async handleLogout(context) {
            const result = await $api.post('logout')
                .then(result => {
                    localStorage.removeItem('ZENG_SHOPING_AUTH_TOKEN')
                    localStorage.removeItem('USERE_PROFILE')
                    localStorage.clear()
                    context.commit('setUserProfile', null)
                    context.commit('changeAuthentcated', false)
                    router.push({ name: 'home' })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async handleLike({ commit, state }, id) {
            try {
                const response = await axios.post(`item/like/${id}`)
                if (response.status == 200) {
                    //read from localstorage
                    //find if it exist 
                    //append it 
                    //concatinate it
                    //write it
                    commit('readLikeItem')
                    const result = state.likedItems.includes(response.data.id) ? true : false

                    if (!result) {
                        commit('appendLikedItem', response.data.id)
                        commit('writeLikeItem')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async handleDislike({ commit, state }, id) {
            try {
                const response = await axios.post(`item/dislike/${id}`)
                if (response.status == 200) {
                    //read from localstorage
                    //find if it exist
                    //remove it
                    //concatinate it
                    //write it
                    commit('readLikeItem')
                    const result = state.likedItems.includes(response.data.id) ? true : false
                    if (result) {
                        commit('removeLikedItem', response.data.id)
                        commit('writeLikeItem')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})