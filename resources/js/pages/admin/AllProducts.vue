
<script setup>
import { useStore } from 'vuex';
import { onMounted,ref } from 'vue';
import Loader from '../../components/Loader.vue';
import ItemRow from '../../components/ItemRow.vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import SearchEngine from '../../components/SearchEngine.vue'
import Empty from '../../components/Empty.vue';
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



const showLoader=ref(true)
const store=useStore()
onMounted(async() => {
    await store.dispatch('getAllItems')
    store.commit('readLikeItem')
    store.commit('setSearchInput','')
    store.commit('calculateTotalRating')
    if(store.getters.allItems){
        setTimeout(() => {
            showLoader.value=false
        }, 1000);
    }
})


const getItems=async()=>{
    showLoader.value=true
    await store.dispatch('getAllItems')
    store.commit('readLikeItem')
    store.commit('setSearchInput','')
    store.commit('calculateTotalRating')
    if(store.getters.allItems){
        setTimeout(() => {
            showLoader.value=false
        }, 1000);
    }
}

const handleShowItemPopUpmessage=(result)=>{
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
    <Loader v-if="showLoader" />
    <div class="main-admin-data-container">
        <SearchEngine />
        <div class="title-bar" v-if="store.getters.GrandFilter(1).length>0">
            <h3>All Online Items</h3>
        </div>
        <div class="table">
            <table v-if="store.getters.GrandFilter(1).length>0">
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Item</td>
                        <td>Price</td>
                        <td>Expiredate</td>
                        <td colspan="2">Action</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in store.getters.GrandFilter(1)" :key="index">
                        <ItemRow :index="index+1" :item="item" @show-deleted-item-popup="handleShowItemPopUpmessage" />
                    </tr>
                </tbody>
            </table>
            <div class="noResult" v-else>
                <Empty message="No Product Is Online To Be Sold..."/>
            </div>
        </div>
        <div class="paginationLink" v-if="store.getters.GrandFilter(1).length>0">

            <v-pagination
                v-model="store.state.itemPage"
                :pages="store.state.itemPageCount"
                :range-size="1"
                active-color="rgb(218, 92, 9)"
                @update:modelValue="getItems"
            />

            </div>

    </div>
</template>