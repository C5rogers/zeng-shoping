<script setup>
import Loader from '../../components/Loader.vue'
import { ref,onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import AddCart from '../../components/AddCart.vue';
import PopUp from '../../components/PopUp.vue';
import FiveStarRatingVue from '../../components/FiveStarRating.vue';


const forPopUp=ref({
    message:'!',
    class:'',
    type:'',
    title:'',
    typeMessage:''
})

const showAddCartItem=ref(false)


const cartItemToBeAdd=ref('')
const router=useRouter()

const route=useRoute()


const store=useStore()


const showLoader = ref(true)

onMounted(() => {
    store.dispatch('getSingleItem',route.params.id)
    store.commit('readLikeItem')
    if(store.getters.singleItem){
        setTimeout(() => {
            showLoader.value=false
        }, 500);
    }
})


const dislikeItem=(item)=>{
    store.dispatch('handleDislike',item.id)
    setTimeout(() => {
        item.rating-=1
    }, 500);
}
const likeItem=(item)=>{
    store.dispatch('handleLike',item.id)
    setTimeout(() => {
        item.rating+=1
    }, 500);
}

const handleAddToCartItem=(item)=>{
    cartItemToBeAdd.value=item
    showAddCartItem.value=true
}


const closeAddCart=(result)=>{
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

const back=()=>{
    router.go(-1)
}


const exitDefault=()=>{
    cartItemToBeAdd.value=''
    showAddCartItem.value=false
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
        forPopUp.value.class='showPopUp'
    }, 1000);
}

</script>

<template>
    <PopUp :message="forPopUp.message" :class="forPopUp.class" :title="forPopUp.title" :type="forPopUp.type"  @close-popup="handleClosePopUp" :typeMessage="forPopUp.typeMessage" />
    <AddCart :item="cartItemToBeAdd" @close-add-cart="closeAddCart" @exit-default="exitDefault" v-if="showAddCartItem" />
    <Loader v-if="showLoader" />
    <div class="product-container">

        <div class="back">
            <button @click="back">&LeftArrow;</button>
        </div>
        <div class="product-grid">
            <div class="left">
                <div class="main-title">
                    <h1>{{ store.getters.singleItem.name }}</h1>
                </div>
                <div class="brand">
                    <h3>{{ store.getters.singleItem.brand }}</h3>
                </div>
                <div class="price">
                    <h4>${{ store.getters.singleItem.price }}</h4>
                </div>
                <div class="image">
                    <img :src="store.getters.singleItem.image" alt="">
                </div>
            </div>
            <div class="right">
                
                <div class="description">
                    <p>{{ store.getters.singleItem.description }}</p>
                </div>
                
                <!-- <div class="rating" v-if="store.getters.singleItem.rating==0||store.getters.singleItem.rating==1">
                    {{ store.getters.singleItem.rating }} <span>person Like</span>
                </div>
                <div class="rating" v-else>
                    {{ store.getters.singleItem.rating }} <span>peoples like</span>
                </div> -->
                <FiveStarRatingVue :rating="store.getters.singleItem.rating"/>

                <div class="like" v-if="store.getters.likedItems.includes(store.getters.singleItem.id)">
                    <form @submit.prevent="dislikeItem(store.getters.singleItem)">
                        <button><img src="../../image/love2.png" alt="" class="liked"></button>
                    </form>
                </div>  
                <div class="like" v-else>
                    <form @submit.prevent="likeItem(store.getters.singleItem)">
                        <button><img src="../../image/unliked.png" alt=""></button>
                    </form>
                </div>
            </div>
        </div>
        <div class="otherInfo">
            <div class="mostleft">
                <div>Expired On</div>
                <div class="expire">{{ store.getters.singleItem.expiredate }}</div>
            </div>
            <div class="mostright">
                <form @submit.prevent="handleAddToCartItem(store.getters.singleItem)">
                    <button><img src="../../image/addcart.png" alt=""><span>Add To Cart</span></button>
                </form>
            </div>
        </div>
    </div>
</template>