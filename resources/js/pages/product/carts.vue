<script setup>
import { useStore } from 'vuex';
import { ref,onMounted } from 'vue';
import Loader from '../../components/Loader.vue';
import Empty from '../../components/Empty.vue';
import CartItem from '../../components/CartItem.vue';
import PopUp from '../../components/PopUp.vue';
import SearchEngine from '../../components/SearchEngine.vue';
import UserOrdersVue from '../../components/UserOrders.vue';

const forPopUp=ref({
	message:'',
	title:'',
	type:'',
	class:'',
	typeMessage:''
})

const orderForm=ref({
	overallprice:0.0
})
	
const showLoader=ref(false)
const store=useStore()
// const total=ref({
// 	totalPrice:''
// })

const emptyMessage=ref("your cart is empty!")
onMounted(async()=>{
 	await store.dispatch('getCarts');
	 await store.dispatch('getOrders')
	store.commit('setTotalPrice',0.0)
	store.commit('computeTotal')
	store.commit('setTotalCartItem',0)
	store.commit('setSearchInput','')
 })


 const order=async()=>{
	orderForm.value.overallprice=parseFloat(store.getters.totalPrice)
	await store.dispatch('createOrder',orderForm.value)
	if(store.getters.activeUserTaskCompletionStatus && store.getters.activeUserTaskCompletionStatus.status==0){
		showPopUpMessage({
			message:store.getters.activeUserTaskCompletionStatus.message,
			title:'Baned Account!',
			type:'error',
			typeMessage:'FORBIDEN'
		})
	}else{
		await store.dispatch('getOrders')
		showPopUpMessage({
			message:'Order Created Successfully!',
			title:'Ordering Carts',
			type:'success',
			typeMessage:'SUCCESS'
		})
	}
   
 }

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

</script>

<template>
	<PopUp :message="forPopUp.message" :class="forPopUp.class" :title="forPopUp.title" :type="forPopUp.type"  @close-popup="handleClosePopUp" :typeMessage="forPopUp.typeMessage" />
	<Loader v-if="showLoader" />
	<SearchEngine />
	<div class="userCart" v-if="store.getters.GrandFilter(2).length==0">
		<Empty message="your cart is empty!" />
	</div>
	<div class="userCart" v-else>
		<div class="header">
			<div class="image">
				<img src="../../image/shoping1.png" alt="">
			</div>
			<span>Cart Items</span>
		</div>
		<div class="body">
			<div class="single-cart-card" v-for="(item,index) in store.getters.GrandFilter(2)" :key="index">
				<CartItem :item="item" @show-popup-message="showPopUpMessage" />
			</div>
		</div>
		<div class="checkout">
			<div class="total">
				<div>Grand Total:</div>
				<div class="totalPrice">${{ store.getters.totalPrice }}</div>
			</div>
			<div class="form">
				<form @submit.prevent="order">
					<button>Order</button>
				</form>
			</div>
		</div>
	</div>
	<UserOrdersVue @show-pop-up-message="showPopUpMessage"/>
</template>