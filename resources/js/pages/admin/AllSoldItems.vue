<script setup>
import { onMounted,ref } from 'vue';
import { useStore } from 'vuex';
import Empty from '../../components/Empty.vue';
import PopUp from '../../components/PopUp.vue';
import Loader from '../../components/Loader.vue';
import SearchEngine from '../../components/SearchEngine.vue';
import SoldItemRow from '../../components/SoldItemRow.vue';


const showLoader=ref(true)
const store=useStore()
onMounted(async() => {
    await store.dispatch('getAllSoldItems')
    store.commit('setSearchInput','')
    store.commit('calculateTotalRating')
    if(store.getters.allSoldItems ){
        showLoader.value=false
    }
})


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



const handleShowPopUpMessage=(result)=>{
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
    <div class="main-order-containers with-container">
        <SearchEngine />
        <div class="title-bar" v-if="store.getters.GrandFilter(4).length>0">
            <h3>All Solled Items</h3>
        </div>
        <div class="container" v-if="store.getters.GrandFilter(4).length>0">
            <div class="left">

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
                            <tr v-for="(item,index) in store.getters.GrandFilter(4)" :key="index">
                                <SoldItemRow :index="index+1" :item="item" @show-pop-up="handleShowPopUpMessage" />
                            </tr>
                        </tbody>
                </table>
                </div>
            </div>
        </div>
        <div class="noResult" v-else>
            <Empty message="No Items Are Sold!..."/>
        </div>
    </div>
</template>