<script setup>
import FiveStarRating from './FiveStarRating.vue';
import RemoveConfirmation from './RemoveConfirmation.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';


const store=useStore()
const showConfirmation=ref(false)
const forConfirmation=ref({
    deletedItemMessage:'',
    deletedItemId:'',
    deleteItemTitle:''
})

const emit=defineEmits(['show-deleted-item-popup'])


const props=defineProps({
    index:Number,
    item:Object
})

const handleDeleteRequest=(item)=>{
    forConfirmation.value.deletedItemMessage="Do You Really Want To Delete Item: "+item.name+" From The Site?"
    forConfirmation.value.deletedItemId=item.id
    forConfirmation.value.deleteItemTitle="Deleting Item From Site!"
    showConfirmation.value=true
}

const handleDeleteItemConfirmation=async(result)=>{
    showConfirmation.value=false
    if(result.confStatus==true){
        await store.dispatch('handleDeleteItem',result.confTo)
        if(store.getters.adminTaskCompletionStatus.status==1){
            const popupMessage=store.getters.adminTaskCompletionStatus.message
            store.commit('setAdminTaskComplitionStatus',[])
            emit('show-deleted-item-popup',{
                message:popupMessage,
                title:"Deleting Item",
                type:"success",
                typeMessage:"SUCCESS"
            })

        }else{
            const popupMessageTwo=store.getters.adminTaskCompletionStatus.message
            store.commit('setAdminTaskComplitionStatus',[])
            emit('show-deleted-item-popup',{
                message:popupMessageTwo,
                title:'Deleting Item',
                type:'error',
                typeMessage:'ERROR'
            })
        }
    }
}

</script>

<template>
    <RemoveConfirmation :confirm-to="forConfirmation.deletedItemId" :confirmation-message="forConfirmation.deletedItemMessage" :title="forConfirmation.deleteItemTitle" v-if="showConfirmation" @confirmation-result="handleDeleteItemConfirmation" />

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