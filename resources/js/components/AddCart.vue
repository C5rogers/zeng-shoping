<script setup>
import { ref,onMounted } from 'vue';
import FiveStarRating from './FiveStarRating.vue';

const info=ref({
    total_price:'',
    quantity:1,
    item_id:'',
    image:''
})
const emit=defineEmits(['close-add-cart','exit-default'])
const props=defineProps({
    item:Object
})

const increment=()=>{
    info.value.quantity+=1
    computeTotalPrice()
}
const decrement=()=>{
    if(info.value.quantity>1){
        info.value.quantity-=1
        computeTotalPrice()
    }
}

const handleAddCart=(item)=>{
    info.value.item_id=item.id
    info.value.image=item.image
    emit('close-add-cart',{
        form:info.value,
    })
}

const computeTotalPrice=()=>{
    info.value.total_price=props.item.price*info.value.quantity
}

onMounted(() => {
    computeTotalPrice()
})

const exitDefault=()=>{
    emit('exit-default')
}


</script>
<template>
    <div class="backdrop">
        <div class="addCart-widget">
            <div class="exit-button">
                <button @click="exitDefault">&times;</button>
            </div>
            <div class="header">
                <div class="logo">
                    <img src="../image/6.png" alt="">
                </div>
                <h2>Zeng Shop</h2>
            </div>
            <div class="body">
                <div class="left">
                    <div class="image">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="others">
                        <div class="brand">
                            <h3>{{ item.brand }}</h3>
                        </div>
                        <div class="expiredate">
                            <span>[Expired At: {{ item.expiredate }}]</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="name">
                        <h2>{{ item.name }}</h2>
                    </div>
                    <div class="price">
                        <span>${{ item.price }}</span>
                    </div>
                    <div class="description">
                        <p>{{ item.description }}</p>
                    </div>
                    <FiveStarRating :rating="item.rating"/>
                    <div class="modifiable">
                        <div class="incrementQuantity">
                            <div class="incrementDecrement">
                                <form @submit.prevent="decrement()">
                                    <button>&minus;</button>
                                </form>
                                <div class="quantity">
                                    {{ info.quantity }}
                                </div>
                                <form @submit.prevent="increment()">
                                    <button>&plus;</button>
                                </form>
                            </div>
                        </div>
                        <div class="totalPrice">
                            Total: <span>${{ info.total_price }}</span>
                        </div>
                    </div>
                    <div class="addToCart">
                        <form @submit.prevent="handleAddCart(item)">
                            <button><img src="../image/addcart.png" alt=""><span>Add To Cart</span></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>