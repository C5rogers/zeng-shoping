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
        itemPage: 1,
        itemPageCount: null,
        userPrevilage: localStorage.getItem('USER_AUTH') ? localStorage.getItem('USER_AUTH') : null,
        allUsers: [],
        allOrders: [],
        allOrderRequests: [],
        allSoldItems: [],
        adminTaskCompletionStatus: [],
        adminSalesReportData: [],
        activeUserTaskCompletionStatus: [],
    },
    getters: {
        activeUserTaskCompletionStatus: state => state.activeUserTaskCompletionStatus,
        adminSalesReportData: state => state.adminSalesReportData,
        adminTaskCompletionStatus: state => state.adminTaskCompletionStatus,
        allSoldItems: state => state.allSoldItems,
        allOrders: state => state.allOrders,
        allOrderRequests: state => state.allOrderRequests,
        allUsers: state => state.allUsers,
        userPrevilage: state => state.userPrevilage,
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
                    if (state.searchInput !== 'All' && state.searchInput !== 'all') {
                        return state.allItems.filter((item) => item.name.includes(state.searchInput.toLowerCase()) || item.name.includes(state.searchInput) || item.description.includes(state.searchInput.toLowerCase()) || item.description.includes(state.searchInput) || item.price == state.searchInput || item.catagory.includes(state.searchInput.toLowerCase()) || item.catagory.includes(state.searchInput) || item.id == state.searchInput || item.brand.includes(state.searchInput.toLowerCase()) || item.brand.includes(state.searchInput))
                    } else {
                        return state.allItems
                    }
                case 2:
                    if (state.searchInput !== 'All' && state.searchInput !== 'all') {
                        return state.carts.filter((cart) => cart.name.includes(state.searchInput.toLowerCase()) || cart.name.includes(state.searchInput) || cart.catagory.includes(state.searchInput.toLowerCase()) || cart.catagory.includes(state.searchInput) || cart.price == state.searchInput || cart.brand.includes(state.searchInput.toLowerCase()) || cart.brand.includes(state.searchInput) || cart.id == state.searchInput || cart.brand.includes(state.searchInput.toLowerCase()) || cart.brand.includes(state.searchInput))
                    } else {
                        return state.carts
                    }
                case 3:
                    if (state.searchInput !== 'All' && state.searchInput !== 'all') {
                        return state.allOrders.filter((order) => order.description.includes(state.searchInput.toLowerCase()) || order.description.includes(state.searchInput) || order.name.includes(state.searchInput.toLowerCase()) || order.name.includes(state.searchInput) || order.brand.includes(state.searchInput.toLowerCase()) || order.brand.includes(state.searchInput) || order.expiredate.includes(state.searchInput.toLowerCase()) || order.expiredate.includes(state.searchInput) || order.catagory.includes(state.searchInput.toLowerCase()) || order.catagory.includes(state.searchInput) || order.email.includes(state.searchInput.toLowerCase()) || order.email.includes(state.searchInput) || order.phonenumber.includes(state.searchInput.toLowerCase()) || order.phonenumber.includes(state.searchInput) || order.quantity == state.searchInput || order.total_price == state.searchInput)
                    } else {
                        return state.allOrders
                    }
                case 4:
                    if (state.searchInput != 'All' && state.searchInput != 'all') {
                        return state.allSoldItems.filter((item) => item.name.includes(state.searchInput.toLowerCase()) || item.name.includes(state.searchInput) || item.catagory.includes(state.searchInput.toLowerCase()) || item.catagory.includes(state.searchInput) || item.brand.includes(state.searchInput.toLowerCase()) || item.brand.includes(state.searchInput) || item.email.includes(state.searchInput.toLowerCase()) || item.email.includes(state.searchInput) || item.phonenumber.includes(state.searchInput.toLowerCase()) || item.phonenumber.includes(state.searchInput) || item.expiredate.includes(state.searchInput.toLowerCase()) || item.expiredate.includes(state.searchInput) || item.price == state.searchInput || item.quantity == state.searchInput || item.total_price == state.searchInput)
                    } else {
                        return state.allSoldItems
                    }
                case 5:
                    if (state.searchInput != 'All' && state.searchInput != 'all') {
                        return state.allUsers.filter((user) => user.name.includes(state.searchInput) || user.email.includes(state.searchInput) || user.phonenumber.includes(state.searchInput) || user.status.includes(state.searchInput) || user.authority.includes(state.searchInput))
                    } else {
                        return state.allUsers
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
        setActiveUserTaskComplitionStatus: (state, payload) => {
            state.activeUserTaskCompletionStatus = payload
        },
        setAdminSalesReportData: (state, payload) => {
            state.adminSalesReportData = payload
        },
        setAdminTaskComplitionStatus: (state, payload) => {
            state.adminTaskCompletionStatus = payload
        },
        setAllSoldItems: (state, payload) => {
            state.allSoldItems = payload
        },
        setAllOrders: (state, payload) => {
            state.allOrders = payload
        },
        setAllOrderRequests: (state, payload) => {
            state.allOrderRequests = payload
        },
        setAllUsers: (state, payload) => {
            state.allUsers = payload
        },
        setUserPrevilage: (state, payload) => {
            state.userPrevilage = payload
        },
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
        filterAllOrderRequests: (state, payload) => {
            state.allOrderRequests = state.allOrderRequests.filter((order) => order.id != payload)
        },
        filterAllOrders: (state, payload) => {
            state.allOrders = state.allOrders.filter((order) => order.id != payload)
        },
        filterDeletedItem: (state, payload) => {
            state.allItems = state.allItems.filter((item) => item.id != payload)
        },

        filterSoldItems: (state, payload) => {
            state.allSoldItems = state.allSoldItems.filter((item) => item.id != payload)
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
        },
        updateAllItemsItem: (state) => (payload) => {
            state.allItems.filter((item) => item.id === payload.id ? payload : item);
        }
    },
    actions: {
        async getAllSoldItems(context) {
            try {
                const responce = await $api.get('allSoldItems')
                if (responce.status === 200) {
                    context.commit('setAllSoldItems', responce.data.sold_items)
                    context.commit('setAdminSalesReportData', responce.data.sales_report)
                } else {
                    router.push({ name: 'home' })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getAllOrders(context) {
            try {
                const responce = await $api.get('allOrders')
                if (responce.status === 200) {
                    context.commit('setAllOrders', responce.data.orders)
                    context.commit('setAllOrderRequests', responce.data.orderRequests)
                } else if (responce.status === 400) {
                    context.commit('setActiveUserTaskComplitionStatus', { "message": responce.data.message, "status": 0 })
                } else {
                    router.push({ name: 'home' })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getAllUsers(context) {
            try {
                const responce = await $api.get('allUsers')
                if (responce.status === 200) {
                    context.commit('setAllUsers', responce.data.users)
                } else {
                    router.push({ name: 'home' })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getUser(context) {
            const res = await $api.get('user')
            context.commit('setUser', res.data)
        },
        async getAllItems(context) {
            try {
                const result = await axios.get('item?page=' + context.state.itemPage)
                context.state.itemPageCount = parseInt(result.data.total / result.data.to + 1)
                context.commit('setAllItems', result.data.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getOrders(context) {
            try {
                const result = await $api.get('order')
                if (result.status == 200) {
                    context.commit('setOrderQueue', result.data.orders)
                } else if (result.status === 400) {
                    context.commit('setActiveUserTaskComplitionStatus', { "message": result.data.message, "status": 0 })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async createOrder(context, form) {
            try {
                const result = await $api.post('order', form)
                if (result.status === 201) {
                    context.commit('setCarts', [])
                } else if (result.status === 400) {
                    context.commit('setActiveUserTaskComplitionStatus', { "message": result.data.message, "status": 0 })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteOrder(context, id) {
            try {
                const result = await $api.delete(`order/${id}`)
                if (result.status == 200) {
                    context.commit('filterDeletedOrder', id)
                    context.commit('setAdminTaskComplitionStatus', { "message": "Order Deleted Successfully", "status": 1 })
                } else if (result.status === 400) {
                    context.commit('setActiveUserTaskComplitionStatus', { "message": result.data.message, "status": 0 })
                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "unable to delete order", "status": 0 })
                }
            } catch (error) {
                console.log(error)
            }
        },


        async deleteSoldItem(context, id) {
            try {
                const result = await $api.delete(`soldItem/${id}`)
                if (result.status == 200) {
                    context.commit('filterSoldItems', id)
                    context.commit('setAdminTaskComplitionStatus', { "message": "Sold Item Deleted Successfully!", "status": 1 })
                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "unable to delete sold item", "status": 0 })
                }
            } catch (error) {
                console.log(error)
            }
        },

        async activateUser(context, id) {
            try {
                const result = await $api.put(`activate/${id}`)
                if (result.status == 200) {

                    context.state.allUsers = context.state.allUsers.map((user) => user.id === id ? {...user, status: result.data.user.status } : user)
                    context.commit('setAdminTaskComplitionStatus', { "message": "User Activated Successfully!", "status": 1 })
                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "unable to activate user", "status": 0 });
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deActivateUser(context, id) {
            try {
                const result = await $api.put(`deactivate/${id}`)
                if (result.status == 200) {

                    context.state.allUsers = context.state.allUsers.map((user) => user.id === id ? {...user, status: result.data.user.status } : user)
                    context.commit('setAdminTaskComplitionStatus', { "message": "User Deactivated Successfully!", "status": 1 })
                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "unable to deactivate user", "status": 0 })
                }
            } catch (error) {
                console.log(error)
            }
        },

        async deleteOrderByAdmin(context, id) {
            try {
                const result = await $api.delete(`order/${id}`)
                if (result.status == 200) {
                    await context.dispatch('getAllOrders')
                    context.commit('setAdminTaskComplitionStatus', { "message": "Order Deleted Successfully", "status": 1 })
                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "unable to delete order", "status": 0 })
                }
            } catch (error) {
                console.log(error)
            }
        },

        async rollBackOrder(context, id) {
            try {
                const result = await $api.delete(`order/rollback/${id}`)
                if (result.status == 200) {
                    context.commit('filterAllOrders', id)
                    context.commit('setAdminTaskComplitionStatus', { "message": "Order Rolled Back Successfully!", "status": 1 })
                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "you are not authorized", "status": 0 })
                }

            } catch (error) {
                console.log(error)
            }
        },

        async sellOrder(context, id) {
            try {

                const result = await $api.post(`order/sale/${id}`)
                if (result.status == 200) {
                    await context.dispatch('getAllOrders')
                    context.commit('setAdminTaskComplitionStatus', { "message": "Order Selled Successfully!", "status": 1 })
                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "You Are Not Authorized!", "status": 0 })
                }

            } catch (error) {
                console.log(error);
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
                            localStorage.setItem('USER_AUTH', result.data.user.authority)
                            context.commit('setUserPrevilage', result.data.user.authority)
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
                    localStorage.setItem('USER_AUTH', result.data.user.authority)
                    context.commit('setUserPrevilage', result.data.user.authority)
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
                router.push({ name: 'home' })
            } catch (error) {
                if (error.response.status === 422) {
                    context.commit('setItemErrors', error.response.data.errors)
                } else {
                    console.log(error)
                }
            }
        },
        async handleEditItem(context, form) {
            try {
                const result = await $api.post(`item/${form.get('id')}?_method=PUT`, form)
                if (result.status === 200) {
                    context.commit('updateAllItemsItem', result.data.item)
                }
                router.push({ name: 'home' })
            } catch (error) {
                if (error.response.status === 422) {
                    context.commit('setItemErrors', error.response.data.errors)
                } else {
                    console.log(error)
                }
            }
        },

        async handleDeleteItem(context, id) {
            try {
                const result = await $api.delete(`item/${id}`)

                if (result.status == 200) {
                    context.commit('setAdminTaskComplitionStatus', { "message": "Item Is Deleted Successfully!", "status": 1 })
                    context.commit('filterDeletedItem', id)

                } else {
                    context.commit('setAdminTaskComplitionStatus', { "message": "You Are Not Authorized!", "status": 0 })
                }
            } catch (error) {
                console.log(error)
            }
        },
        async handleLogout(context) {
            const result = await $api.post('logout')
                .then(result => {
                    localStorage.removeItem('ZENG_SHOPING_AUTH_TOKEN')
                    localStorage.removeItem('USERE_PROFILE')
                    localStorage.removeItem('USER_AUTH')
                    localStorage.clear()
                    context.commit('setUserPrevilage', null)
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