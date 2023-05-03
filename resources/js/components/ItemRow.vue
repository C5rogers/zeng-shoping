<script setup>
import FiveStarRating from './FiveStarRating.vue';
const props=defineProps({
    index:Number,
    item:Object
})

const handleDeleteRequest=(item)=>{

}

</script>

<template>

    <td class="number">{{ index }}</td>
    <td class="withFlex"> 
        <div class="image">
            <img :src="item.image" alt="">
        </div>
        <div class="other-descriptions">
            <div class="name">
                <h2>{{ item.name }}</h2>
            </div>
            <div class="catagory">
                <h4>[{{ item.catagory }}]</h4>
            </div>
            <div class="brand">
                <h5>{{ item.brand }}</h5>
            </div>
            <div class="rating">
                <FiveStarRating :rating="item.rating"/>
            </div>
        </div>
    </td>

    <td class="withPrice"><h4>$ {{ item.price }}</h4></td>

    <td class="expiredate">
        <h4>[ {{ item.expiredate }} ]</h4>
    </td>

    <td class="edit">
        <router-link :to="{name:'EditProduct',params:{id:item.id}}"><img src="../image/edit2.png" alt=""><span>Edit</span></router-link>
    </td>
    <td class="delete">
        <form @submit.prevent="handleDeleteRequest(item)">
            <button><img src="../image/delete.png" alt=""> <span>Delete</span></button>
        </form>
    </td>

</template>