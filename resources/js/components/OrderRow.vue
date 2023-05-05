<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import FiveStarRating from './FiveStarRating.vue';
import RemoveConfirmation from './RemoveConfirmation.vue';



const showConfirmation=ref(false)
const forConfirmation=ref({
    RollBackMessage:'',
    RollBackTo:'',
    RollBackTitle:'',
})

const store=useStore()

const props=defineProps({
    order:Object,
    index:Number,
})


const emit=defineEmits(['show-pop-up'])
const handleRollBack=(order)=>{
    forConfirmation.value.RollBackMessage="Do You Really Want To Roll Back Order Item" + order.name+" ?"
    forConfirmation.value.RollBackTo=order.id
    forConfirmation.value.RollBackTitle="Rolling Back Order Item"
    showConfirmation.value=true
}

const handleRollBackConfirmationResult=async(result)=>{
    showConfirmation.value=false
    if(result.confStatus===true){
        await store.dispatch('rollBackOrder',result.confTo)
        if(store.getters.adminTaskCompletionStatus.status==1){
            const popupMessage=store.getters.adminTaskCompletionStatus.message
            store.commit('setAdminTaskComplitionStatus',[])
            emit('show-pop-up',{
                message:popupMessage,
                title:"Rolling Order Item",
                type:"success",
                typeMessage:"SUCCESS"
            })
        }else{
            const popupMessageTwo=store.getters.adminTaskCompletionStatus.message
            store.commit('setAdminTaskComplitionStatus',[])
            emit('show-pop-up',{
                message:popupMessageTwo,
                title:'Rolling Order Item',
                type:'error',
                typeMessage:'ERROR'
            })
        }
    }
}
</script>

<template>
    <RemoveConfirmation v-if="showConfirmation" :confirmation-message="forConfirmation.RollBackMessage" :confirm-to="forConfirmation.RollBackTo" :title="forConfirmation.RollBackTitle"  @confirmation-result="handleRollBackConfirmationResult" />
    <td>{{ index+1 }}</td>
    <td class="withFlex orderRequestUser">
        <div class="image">
            <img :src="order.image" alt="">
        </div>
        <div class="other-descriptions">
            <div class="name">
                <h2>{{ order.name }}</h2>
            </div>
            <div class="catagory">
                <h4>[{{ order.catagory }}]</h4>
            </div>
            <div class="brand">
                <h5>{{ order.brand }}</h5>
            </div>
            <div class="rating">
                <FiveStarRating :rating="order.rating"/>
            </div>
        </div>
    </td>
    <td class="orderRequestUser userInfo">
        <div class="image" v-if="order.profile">
            <img :src="order.profile" alt="" class="profile">
        </div>
        <div class="image" v-else>
            <img src="../image/users.png" alt="" class="profile">
        </div>
        <div class="other-descriptions">
            <div class="email">
                <h5>{{ order.email }}</h5>
            </div>
            <div class="phonenumber">
                <h6>{{ order.phonenumber }}</h6>
            </div>
        </div>
    </td>
    <td class="withPrice">
        <h4>$ {{ order.price }}</h4>
    </td>
    <td class="withPrice">
        <h4>$ {{ order.total_price }}</h4>
    </td>
    <td class="withPrice">
        <h3>{{ order.quantity }}</h3>
    </td>
    <td class="roolback">
        <form @submit.prevent="handleRollBack(order)">
            <button>Roll Back</button>
        </form>
    </td>

</template>