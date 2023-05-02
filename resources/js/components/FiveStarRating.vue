<script setup>
import { useStore } from 'vuex';

const store=useStore()

const props=defineProps({
    rating:Number
})
</script>

<template>
    <div class="wrapper" v-if="store.getters.calculateItemRating(rating)=='One'">
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
    </div>
    <div class="wrapper" v-else-if="store.getters.calculateItemRating(rating)=='Two'">
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
    </div>
    <div class="wrapper" v-else-if="store.getters.calculateItemRating(rating)=='Three'">
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
    </div>
    <div class="wrapper" v-else-if="store.getters.calculateItemRating(rating)=='Foure'">
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: grey;"></i>
    </div>
    <div class="wrapper" v-else>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
        <i class="fa-solid fa-star fa-2xs" style="color: rgb(218, 92, 9);"></i>
    </div>
</template>