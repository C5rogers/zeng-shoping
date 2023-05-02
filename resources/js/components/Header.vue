<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const image=ref('../image/users2.png')

const route=useRoute()
const store=new useStore()
const handleLogout=()=>{
    store.dispatch('handleLogout')
}
</script>

<template>
    <header v-if="route.name!='notFound'">
        <div class="upper">
            <div class="left">
                <div class="phonenumber">
                    <i><img src="../image/phone.png" alt=""></i>
                    <p>+251939209166</p>
                </div>
                <div class="email">
                    <i><img src="../image/email.png" alt=""></i>
                    <p>ZengShop@gmail.com</p>
                </div>
                <div class="location">
                    <i><img src="../image/location.png" alt=""></i>
                    <p>Addis Abeba</p>
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="logo">
                <router-link :to="{name:'home'}"><img src="../image/4.png" alt=""></router-link>
            </div>
            <div class="others">
                <div class="user-account">
                <div class="dropdown-cont" v-if="!$store.state.authenticated">
                    <div class="image">
                        <img src="../image/users2.png" alt="">
                    </div>
                    <div class="dropdownContent">
                        <ul>
                            <li>
                                <router-link :to="{name:'signup'}">Sign Up</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'login'}">Log In</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown-cont" v-else>
                    <div class="image" v-if="$store.getters.userProfile">
                        <img :src="$store.getters.userProfile" alt="">
                    </div>
                    <div class="image" v-else>
                        <img src="../image/users2.png" alt="">
                    </div>
                    <div class="dropdownContent">
                        <ul>
                            <li>
                                <a href="#">Edit Profile</a>
                            </li>
                            <div class="logout">
                                <form @submit.prevent="handleLogout">
                                    <button>Log Out</button>
                                </form>
                            </div>

                        </ul>
                    </div>
                </div>
            </div>
            <div class="cart" v-if="store.getters.toatlCartItem==0">
                <router-link :to="{name:'carts'}"><i><img src="../image/shoping1.png" alt=""></i><span>Carts</span></router-link>
            </div>
            <div class="cart" v-else>
                <router-link :to="{name:'carts'}"><i><img src="../image/shoping1.png" alt=""></i><span>Carts</span></router-link>
                <div class="absolute">{{ store.getters.toatlCartItem }}</div>
            </div>
        </div>
        </div>
        <div class="navigations">
            <ul v-if="$store.state.authenticated">
                <li>
                    <router-link :to="{name:'Create'}">Post Product</router-link>
                </li>
                <li>
                    <router-link :to="{name:'home'}">Home</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Items'}">Products</router-link>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <router-link :to="{name:'home'}">Home</router-link>
                </li>
                <li>
                    <router-link :to="{name:'home'}">Contact</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Items'}">Products</router-link>
                </li>
            </ul>
        </div>
    </header>
</template>