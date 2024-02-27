<script setup>
import { useStore } from 'vuex';
import { ref,onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import RemoveConfirmation from './RemoveConfirmation.vue';

const confirmationMessage=ref('')
const confirmTo=ref('')
const confirmationTitle=ref('')

const emit=defineEmits(["show-pop-up-message"])

const showConfirmation=ref(false)

const showOrder=ref(true)
const orderSearch=ref('')

const store=useStore()

const togleShowClass=()=>{
    document.getElementById('orderContainer').classList.toggle('showOrderPage')
    showOrder.value=!showOrder.value
}

onMounted(async () => {
    await store.dispatch('getUser')
    await store.dispatch('getOrders')
})

const filterOrder=computed(()=>{
    if(store.getters.OrderQueue){
        return store.getters.OrderQueue.filter((order)=>order.id==orderSearch.value||order.created_at.includes(orderSearch.value)||order.overallprice==orderSearch.value)
    }
    return []

})

const abortOrder=(order)=>{
    confirmationMessage.value="Do You Really Want To Abort Order With The Id Of: "+order.id+" ?"
    confirmTo.value=order.id
    confirmationTitle.value="Aborting Order!"
    showConfirmation.value=true
}

const handleConfirmation=async (result)=>{
    showConfirmation.value=false
    if(result.confStatus==true){
        await store.dispatch('deleteOrder',result.confTo)
            if(store.getters.activeUserTaskCompletionStatus && store.getters.activeUserTaskCompletionStatus.status==0){
                emit('show-pop-up-message',{
                message:store.getters.activeUserTaskCompletionStatus.message,
                title:"Forbiden Account",
                type:"Error",
                typeMessage:"FORBIDDEN"
                })
            }else{
                emit('show-pop-up-message',{
                    message:"Order Aborted Successfully!",
                    title:"Aborting Order",
                    type:"Error",
                    typeMessage:"ABORT"
        })
    }
    }
}


const date=new Date()

const day=date.getDate()
const month=date.getMonth()
const year=date.getFullYear()
let cureentDate=day+"-"+month+"-"+year

</script>

<template>
    <RemoveConfirmation :title="confirmationTitle" :confirm-to="confirmTo" :confirmation-message="confirmationMessage" v-if="showConfirmation" @confirmation-result="handleConfirmation"/>
    <div class="order-container" id="orderContainer">
        <div class="header">
            <div class="image" v-if="store.getters.userProfile">
                <img :src="store.getters.userProfile" alt="">
            </div>
            <div class="image" v-else>
                <img src="../image/users2.png" alt="">
            </div>
            <div class="user-name">
                <h4>{{ store.getters.user.name }}</h4>
            </div>
            <div class="button">
                <button @click="togleShowClass" v-if="showOrder==false" class="lower"><img src="../image/dropDown.png" alt=""></button>
                <button @click="togleShowClass" v-else class="upper"><img src="../image/dropDown.png" alt=""></button>
            </div>
        </div>
        <div class="body">
                <div class="search">
                    <input type="text" name="search" placeholder="Search..." v-model="orderSearch">
                </div>
                <div class="content" v-if="filterOrder.length>0">
                    <div class="title">
                        Order Queue
                    </div>
                    <div class="cont" v-for="(order,index) in filterOrder" :key="index">
                        <div class="number">
                            {{ index+1 }}
                        </div>
                        <div class="totalPrice">
                            $ {{order.overallprice }}
                        </div>
                        <div class="orderDate">
                            {{ order.created_at }}
                        </div>
                        <div class="abort-button">
                            <button @click="abortOrder(order)">Abort</button>
                        </div>
                    </div>
                </div>
                <div class="content" v-else>
                    <div class="image">
                        <img src="../image/empty.png" alt="">
                    </div>
                    <div class="message">
                        <p>No Order Found...</p>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="date">
                    {{ cureentDate }}
                </div>
            </div>
    </div>
</template>
