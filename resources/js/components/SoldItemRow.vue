<script setup>
import FiveStarRating from './FiveStarRating.vue';
import { useStore } from 'vuex';


const store=useStore()
const props=defineProps({
    item:Object,
    index:Number
})

const emit=defineEmits(['show-pop-up'])


const handleDelete=async(item)=>{

    await store.dispatch('deleteSoldItem',item.id)
    if(store.getters.adminTaskCompletionStatus.status==1){
        const popupMessage=store.getters.adminTaskCompletionStatus.message
        store.commit('setAdminTaskComplitionStatus',[])
        emit('show-pop-up',{
            message:popupMessage,
            title:'Sold Item Deleting',
            type:'success',
            typeMessage:'SUCCESS'
        })
    }else{
        const anotherPopupMessage=store.getters.adminTaskCompletionStatus.message
        store.commit('setAdminTaskComplitionStatus',[])
        emit('show-pop-up',{
            message:anotherPopupMessage,
            title:'Sold Item Deleting',
            type:'error',
            typeMessage:'ERROR'
    })
    }

}

</script>

<template>
    <td>{{ index }}</td>
    <td>
        <div class="withFlex orderRequestUser">
            <div class="image">
                <img :src="item.image" alt="">
            </div>
            <div class="other-descriptions">
                <div class="name">
                    <h2>{{ item.name }}</h2>
                </div>
                <div class="catagory">
                    <h4>{{ item.catagory }}</h4>
                </div>
                <div class="brand">
                    <h5>{{ item.brand }}</h5>
                </div>
                <div class="rating">
                    <FiveStarRating :rating="item.rating" />
                </div>
            </div>
        </div>
    </td>
    <td class="orderRequestUser userInfo">
        <div class="image" v-if="item.profile">
            <img :src="item.profile" alt="" class="profile">
        </div>
        <div class="image" v-else>
            <img src="../image/users.png" alt="" class="profile">
        </div>
        <div class="other-descriptions">
            <div class="email">
                <h5>{{ item.email }}</h5>
            </div>
            <div class="phonenumber">
                <h6>{{ item.phonenumber }}</h6>
            </div>
        </div>
    </td>
    <td class="withPrice">
        <h4>$ {{ item.price }}</h4>
    </td>
    <td class="withPrice">
        <h4>$ {{ item.total_price }}</h4>
    </td>
    <td class="withPrice">
        <h3>{{ item.quantity }}</h3>
    </td>
    <td class="roolback">
        <form @submit.prevent="handleDelete(item)">
            <button class="makeitInvert"><img src="../image/delete.png" alt=""></button>
        </form>
    </td>
</template>