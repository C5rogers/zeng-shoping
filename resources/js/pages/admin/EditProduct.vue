<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route=useRoute()
const store=useStore()
const image=ref(null)

onMounted(async() => {
    await store.dispatch('getSingleItem',route.params.id)
    // store.commit('setItemErrors',[])
})


const loadImage=(e)=>{
    image.value=e.target.files[0]
}

const handleEditItem=()=>{
    const formdata=new FormData()
    formdata.append('name',store.state.singleItem.name)
    formdata.append('brand',store.state.singleItem.brand)
    formdata.append('price',store.state.singleItem.price)
    formdata.append('description',store.state.singleItem.description)
    formdata.append('expiredate',store.state.singleItem.expiredate)
    formdata.append('catagory',store.state.singleItem.catagory)
    formdata.append('image',image.value)
    formdata.append('id',store.state.singleItem.id)


    store.dispatch('handleEditItem',formdata)
}
</script>

<template>

    <div class="form-container">
        <div class="whole-container">
            <div class="logo">
                <img :src="store.getters.singleItem.image" alt="">
            </div>
            <div class="title">
                <h1>Edit Item</h1>
            </div>
            <form @submit.prevent="handleEditItem">
                <div class="form-cont">
                    <input type="text" name="name" placeholder="Item Name" class="input" v-model="store.state.singleItem.name">
                    <p class="errorMessage" v-if="store.getters.itemErrors.name">{{ store.getters.itemErrors.name[0] }}</p>
                </div>
                <div class="form-cont">
                    <input type="text" name="brand" placeholder="Item Brand" class="input" v-model="store.state.singleItem.brand">
                    <p class="errorMessage" v-if="store.getters.itemErrors.brand">{{ store.getters.itemErrors.brand[0] }}</p>
                </div>
                <div class="form-cont">
                    <input type="number" name="price" placeholder="Item Price" step=".01" class="input" v-model="store.getters.singleItem.price">
                    <p class="errorMessage" v-if="store.getters.itemErrors.price">{{ store.getters.itemErrors.price[0] }}</p>
                </div>
                <div class="form-cont">
                    <input type="text" name="description" placeholder="Description" class="input" v-model="store.getters.singleItem.description">
                    <p class="errorMessage" v-if="store.getters.itemErrors.description">{{ store.getters.itemErrors.description[0] }}</p>
                </div>
                <div class="form-cont">
                    <label for="">Expire Date</label>
                    <input type="date" name="expiredate"  class="input" v-model="store.getters.singleItem.expiredate">
                    <p class="errorMessage" v-if="store.getters.itemErrors.expiredate">{{ store.getters.itemErrors.expiredate[0] }}</p>
                </div>
                <div class="form-cont">
                    <label for="">Item Catagory</label>
                    <select name="catagory" v-model="store.getters.singleItem.catagory">
                        <option value="food" selected>Food</option>
                        <option value="close">Close</option>
                        <option value="gudget">Gudget</option>
                    </select>
                </div>
                <div class="form-cont">
                    <input type="file" name="image" class="input" @change="loadImage">
                    <p class="errorMessage" v-if="store.getters.itemErrors.image">{{ store.getters.itemErrors.image[0] }}</p>
                </div>
                <div class="form-cont">
                    <div class="button">
                        <input type="reset" name="reset" value="Reset">
                        <input type="submit" name="submit" value="Edit">
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>