import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue'
import { store } from "../store/store";

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/singup',
        name: 'signup',
        component: () =>
            import ('../pages/user/Signup.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../pages/user/Login.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/create',
        name: 'Create',
        component: () =>
            import ('../pages/product/Create.vue'),
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if (store.getters.userPrevilage === 'admin') {
                next()
            } else {
                router.push({ name: 'home' })
            }
        }
    },

    {
        path: '/items',
        name: 'Items',
        component: () =>
            import ('../pages/product/Products.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/item/:id',
        name: 'Item',
        component: () =>
            import ('../pages/product/Product.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: () =>
            import ('../pages/product/edit.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/carts',
        name: 'carts',
        component: () =>
            import ('../pages/product/carts.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:catchAll(.*)',
        name: 'notFound',
        component: () =>
            import ('../pages/NotFound.vue'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/users',
        name: 'Users',
        component: () =>
            import ('../pages/admin/AllUser.vue'),
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if (store.getters.userPrevilage === 'admin') {
                next()
            } else {
                router.push({ name: 'home' })
            }
        }
    },
    {
        path: '/OnlineProducts',
        name: 'OnlineProducts',
        component: () =>
            import ('../pages/admin/AllProducts.vue'),
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if (store.getters.userPrevilage === 'admin') {
                next()
            } else {
                router.push({ name: 'home' })
            }
        }
    },
    {
        path: '/Product/Edit/:id',
        name: 'EditProduct',
        component: () =>
            import ('../pages/admin/EditProduct.vue'),
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if (store.getters.userPrevilage === 'admin') {
                next()
            } else {
                router.push({ name: 'home' })
            }
        }
    },
    {
        path: '/usersOrders',
        name: 'UsersOrders',
        component: () =>
            import ('../pages/admin/AllOrders.vue'),
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if (store.getters.userPrevilage === 'admin') {
                next()
            } else {
                router.push({ name: 'home' })
            }
        }
    },
    {
        path: '/SoldItems',
        name: 'SoldItems',
        component: () =>
            import ('../pages/admin/AllSoldItems.vue'),
        meta: {
            requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
            if (store.getters.userPrevilage === 'admin') {
                next()
            } else {
                router.push({ name: 'home' })
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && !store.state.authenticated) {
        return {
            name: 'login',
        }
    }
})