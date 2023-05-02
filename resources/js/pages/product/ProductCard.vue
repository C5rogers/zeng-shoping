<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import FiveStarRating from '../../components/FiveStarRating.vue';


const emit=defineEmits(['add-to-cart'])

const store=useStore()

const showMore=ref(false)
const props=defineProps({
    item:Object,
    index:Number,
})

const likeItem=(item)=>{
    store.dispatch('handleLike',item.id)
    setTimeout(() => {
        item.rating+=1
    }, 500);
}
const dislikeItem=(item)=>{
    store.dispatch('handleDislike',item.id)
    setTimeout(() => {
        item.rating-=1
    }, 500);
}

const minimize=(description)=>{
    if(description.length>110){
        return description.substring(0,110)+'...'
    }
    return description
}

const test=(rating)=>{
    if(rating>0){
        return true
    }
    else{
        return false
    }
}

const AddToCart=(item)=>{
    emit('add-to-cart',{
        cartItem:item
    })
}

</script>

<template>
    <div class="absolute">
        <img src="../../image/sale1.png" alt="">
    </div>
    <div class="top">
        <div class="name">
            <h3>{{ item.name }}</h3>
        </div>
        <div class="logo">
            <img src="../../image/6.png" alt="">
        </div>
    </div>
    <div class="middle">
        <div class="brand">
            {{ item.brand }}
        </div>
    </div>
    <div class="image-container">
        <div class="image">
            <router-link :to="{name:'Item',params:{id:item.id}}">
                <img :src="item.image" alt="">
            </router-link>
        </div>
        <div class="like" v-if="$store.getters.likedItems.includes(item.id)">
            <form @submit.prevent="dislikeItem(item)">
                <button><img src="../../image/love2.png" alt="" class="liked"></button>
            </form>
        </div>
        <div class="like" v-else>
            <form @submit.prevent="likeItem(item)">
                <button><img src="../../image/unliked.png" alt=""></button>
            </form>
        </div>
    </div>
    <div class="bottom">
        <div class="left">
            <div class="upper">
                <div class="more">
                    <FiveStarRating :rating="item.rating"/>
                    <div class="price">
                        <span>${{ item.price }}</span>
                    </div>
                </div>
                <div class="anothermore" v-if="item.description.length<110">
                    <div class="description">
                        <p>{{ item.description }}</p>
                    </div>
                </div>
                <div class="anothermore minimized" v-else-if="!showMore">
                    <div class="description">
                        <p>{{minimize(item.description) }}</p>
                    </div>
                    <button @click="showMore=!showMore">More</button>
                </div>
                <div class="anothermore" v-else>
                    <div class="description">
                        <p>{{ item.description }}</p>
                    </div>
                    <button @click="showMore=!showMore">Hide</button>
                </div>
            </div>
            <div class="lower">
                <form @submit.prevent="AddToCart(item)">
                    <button><img src="../../image/addcart.png" alt=""></button>
                </form>
            </div>
        </div>
    </div>
</template>