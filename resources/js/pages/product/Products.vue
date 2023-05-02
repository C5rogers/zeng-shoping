<script setup>
import { ref,onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue'
import Loader from '../../components/Loader.vue';
import AddCart from '../../components/AddCart.vue';
import { useRouter } from "vue-router";
import PopUp from '../../components/PopUp.vue';
import SearchEngine from '../../components/SearchEngine.vue'
import Empty from '../../components/Empty.vue';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";


const forPopUp=ref({
    message:'!',
    class:'',
    type:'',
    title:'',
    typeMessage:''
})


const router=useRouter()

const showLoader=ref(true)
const cartItem=ref('')
const showAddCartItem=ref(false)

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

const getItems=async ()=>{
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

const handleAddToCartItem=(result)=>{
    cartItem.value=result.cartItem
    showAddCartItem.value=true
}

const closeAddCart=async(result)=>{

    //read login information
    //redirect if it is not authenticated
    store.commit('readAuthenticatedUer')
    if(store.getters.isAuthenticated==true){
            store.dispatch('addToCart',result.form)
            exitDefault()
            showPopUpMessage('Item Added Successfully!','Adding Item','success','SUCCESS')
    }else{
        router.push({name:'login'})
        exitDefault()
    }
}

const handleClosePopUp=()=>{
    forPopUp.value.class="hidePopUp"
}

const showPopUpMessage=(message,title,type,typeMessage)=>{
    forPopUp.value.message=message
    forPopUp.value.title=title
    forPopUp.value.type=type
    forPopUp.value.typeMessage=typeMessage
    setTimeout(() => {
        forPopUp.value.class="showPopUp"
    }, 1000);
}

const exitDefault=()=>{
    cartItem.value=''
    showAddCartItem.value=false
}
</script>
<template>
    <PopUp :message="forPopUp.message" :class="forPopUp.class" :title="forPopUp.title" :type="forPopUp.type"  @close-popup="handleClosePopUp" :typeMessage="forPopUp.typeMessage" />
    <AddCart :item="cartItem" @close-add-cart="closeAddCart" @exit-default="exitDefault" v-if="showAddCartItem" />
    <Loader v-if="showLoader" />
    <SearchEngine />
    <div class="grid" v-if="store.getters.GrandFilter(1).length>0">
        <div class="card" v-for="(item,index) in store.getters.GrandFilter(1)" :key="index">
            <ProductCard :item="item" :index="index+1" @add-to-cart="handleAddToCartItem" />
        </div>
    </div>
    <div class="noResult" v-else>
        <Empty message="No Search Result..."/>
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
</template>
