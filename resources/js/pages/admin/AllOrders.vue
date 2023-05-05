<script setup>
import { onMounted,ref } from 'vue';
import { useStore } from 'vuex';
import SearchEngine from '../../components/SearchEngine.vue';
import Loader from '../../components/Loader.vue';
import Empty from '../../components/Empty.vue';
import OrderRow from '../../components/OrderRow.vue';
import RemoveConfirmation from '../../components/RemoveConfirmation.vue';
import PopUp from '../../components/PopUp.vue';


const forPopUp=ref({
	message:'',
	title:'',
	type:'',
	class:'',
	typeMessage:''
})


const showPopUpMessage=(result)=>{
	forPopUp.value.message=result.message
	forPopUp.value.title=result.title
	forPopUp.value.type=result.type
	forPopUp.value.typeMessage=result.typeMessage
	setTimeout(() => {
		forPopUp.value.class="showPopUp"
	}, 1000);
 }


 const handleClosePopUp=()=>{
	forPopUp.value.class="hidePopUp"
 }

const forConfirmation=ref({
    abortMessage:'',
    abortOrderRequest:'',
    abortionTitlte:'',
})

const showConfirmation=ref(false)

const showLoader=ref(true)
const store=useStore()

onMounted(async() => {
    await store.dispatch('getAllOrders')
    store.commit('setSearchInput','')
    store.commit('calculateTotalRating')
    if(store.getters.allOrders || store.getters.allOrderRequests){
        showLoader.value=false
    }
})

const handleSaleOrder=async(order)=>{
    await store.dispatch('sellOrder',order.id)
    if(store.getters.adminTaskCompletionStatus.status==1){
        showPopUpMessage({
            message:store.getters.adminTaskCompletionStatus.message,
            title:'Selling Orders',
            type:'success',
            typeMessage:'SUCCESS'
        })
        store.commit('setAdminTaskComplitionStatus',[])

    }else{
        showPopUpMessage({
            message:store.getters.adminTaskCompletionStatus.message,
            title:'Selling Orders',
            type:'error',
            typeMessage:'ERROR'
        })
        store.commit('setAdminTaskComplitionStatus',[])
    }

}

const handleConfirmationResult=async(result)=>{

    showConfirmation.value=false

    if(result.confStatus===true){
        await store.dispatch('deleteOrderByAdmin',result.confTo)
        if(store.getters.adminTaskCompletionStatus.status==1){
            showPopUpMessage({
                message:store.getters.adminTaskCompletionStatus.message,
                title:'Aborting Orders',
                type:'success',
                typeMessage:'SUCCESS'})
                store.commit('setAdminTaskComplitionStatus',[])
        }else{
            showPopUpMessage({
                message:store.getters.adminTaskCompletionStatus.message,
                title:'Aborting Orders',
                type:'error',
                typeMessage:'ERROR'
            })
            store.commit("setAdminTaskComplitionStatus",[])
        }
    }
}


const handleAbortOrder=(order)=>{
    forConfirmation.value.abortMessage="Do You Like To Abort "+order.name+"'s Order?'"
    forConfirmation.value.abortOrderRequest=order.id
    forConfirmation.value.abortionTitlte="Aborting User Order!"
    showConfirmation.value=true
}


const showPopUpForRollBack=(result)=>{
    showPopUpMessage({
        message:result.message,
        title:result.title,
        type:result.type,
        typeMessage:result.typeMessage
    })
}
</script>

<template>
    <PopUp :message="forPopUp.message" :class="forPopUp.class" :title="forPopUp.title" :type="forPopUp.type"  @close-popup="handleClosePopUp" :typeMessage="forPopUp.typeMessage" />
    <RemoveConfirmation :confirmation-message="forConfirmation.abortMessage" :confirm-to="forConfirmation.abortOrderRequest" :title="forConfirmation.abortionTitlte" v-if="showConfirmation" @confirmation-result="handleConfirmationResult" />
    <Loader v-if="showLoader" />
    <div class="main-order-containers with-container">
        <SearchEngine />
        <div class="title-bar" v-if="store.getters.GrandFilter(3).length>0">
            <h3>All Orders And Order Requests</h3>
        </div>
        <div class="container" v-if="store.getters.GrandFilter(3).length>0">
            <div class="left">
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>User</td>
                                <td>Total Price</td>
                                <td colspan="2">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(request,index) in store.getters.allOrderRequests" :key="index">
                                <td>{{ index+1 }}</td>
                                <td class="withFlex orderRequestUser">
                                    <div class="image" v-if="request.profile">
                                        <img :src="request.profile" alt="" class="profile">
                                    </div>
                                    <div class="image" v-else>
                                        <img src="../../image/users.png" alt="" class="profile">
                                    </div>
                                    <div class="other-descriptions">
                                        <div class="name">
                                            <h4>{{ request.name }}</h4>
                                        </div>
                                        <div class="email">
                                            <h5>{{ request.email }}</h5>
                                        </div>
                                        <div class="phonenumber">
                                            <h6>{{ request.phonenumber }}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td class="price total_price">
                                    <h4>$ {{ request.overallprice }}</h4>
                                </td>
                                <td class="sale">
                                    <form @submit.prevent="handleSaleOrder(request)">
                                        <button>Sale</button>
                                    </form>
                                </td>
                                <td class="abort">
                                    <form @submit.prevent="handleAbortOrder(request)">
                                        <button>Abort</button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="right">

                <div class="table">
                    <table>
                        <thead> 
                            <tr>
                                <td>No</td>
                                <td>Item</td>
                                <td>User</td>
                                <td>Single Price</td>
                                <td>Total Price</td>
                                <td>Quantity</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order,index) in store.getters.GrandFilter(3)" :key="index">
                                <OrderRow :order="order" :index="index" @show-pop-up="showPopUpForRollBack" />
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
        <div class="noResult" v-else>
            <Empty message="No Order Is Requested To Be Sold..."/>
        </div>

    </div>
</template>