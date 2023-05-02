<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';
import RemoveConfirmation from './RemoveConfirmation.vue'

const form=ref({
    quantity:'',
    total_price:'',
    id:''
})

const emit=defineEmits(['show-popup-message'])

const confirmationMessage=ref('')
const confirmationTitle=ref('')
const confirmTo=ref('')

const showRemoveConfirmation=ref(false)

const store=useStore()
const props=defineProps({
    item:Object
})



const decrement=(item)=>{
    if(item.quantity>1){
    item.quantity-=1
    item.total_price=item.price*item.quantity
    form.value.quantity=item.quantity
    form.value.total_price=item.total_price
    form.value.id=item.id
    store.dispatch('updateCartItems',form.value)
	store.commit('setTotalPrice',0.0)
    store.commit('computeTotal')
    }
}

const increment=(item)=>{
    item.quantity+=1
    item.total_price=item.price*item.quantity
    form.value.quantity=item.quantity
    form.value.total_price=item.total_price
    form.value.id=item.id
    store.dispatch('updateCartItems',form.value)
	store.commit('setTotalPrice',0.0)
    store.commit('computeTotal')
}
const removeCart=(item)=>{
    confirmationMessage.value="Do You Really Want To Remove "+item.name+" From You'r Cart?"
    confirmTo.value=item.id
    confirmationTitle.value="Delete Cart Item"
    showRemoveConfirmation.value=true
}

const handleConfirmation=(result)=>{
    showRemoveConfirmation.value=false
    if(result.confStatus===true){
        store.dispatch('deleteCartItem',result.confTo)

        //must emit the show the pop up message to the parent component
        emit('show-popup-message',{
            message:'Item Deleted Successfully From Cart!',
            title:'Deleting Item',
            type:'error',
            typeMessage:'DELETE'
        })
    }
}

</script>

<template>
        <RemoveConfirmation v-if="showRemoveConfirmation" @confirmation-result="handleConfirmation" :confirmation-message="confirmationMessage" :confirm-to="confirmTo" :title="confirmationTitle" />
        <div class="image">
            <img :src="item.image" alt="">
        </div>
        <div class="some-descriptions">
            <div class="name">
                <h4>{{ item.name }}</h4>
            </div>
            <div class="expiredate">
                <span>[Expire date: {{ item.expiredate }}]</span>
            </div>
            <div class="catagory">
                 <span>Catagory: {{ item.catagory }}</span>
            </div>
            <div class="brand">
                <span>Brand: {{ item.brand }}</span>
            </div>
        </div>
        <div class="price">
            <h3>${{ item.price }}</h3>
        </div>
        <div class="incrementQuantity">
            <div class="incrementDecrement">
                    <form @submit.prevent="decrement(item)">
                        <button>&minus;</button>
                    </form>
                    <div class="quantity">
                        {{ item.quantity }}
                    </div>
                    <form @submit.prevent="increment(item)">
                        <button>&plus;</button>
                    </form>
            </div>
        </div>
        <div class="totalprice">
            <h3>${{ item.total_price }}</h3>
        </div>
        <div class="action">
            <form @submit.prevent="removeCart(item)">
                <button>&times;</button>
            </form>
        </div>
</template>