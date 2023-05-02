<script setup>
import { ref,onMounted } from 'vue';
import { useStore } from 'vuex';

const store=useStore()
const form=ref({
    name:'',
    brand:'',
    price:'',
    description:'',
    expiredate:'',
    catagory:'',
    image:null
})

onMounted(() => {
    store.commit('setItemErrors',[])
})

const loadImage=(e)=>{
    form.value.image=e.target.files[0]
}

const handleCreate=()=>{

    const formdata=new FormData()
    formdata.append('name',form.value.name)
    formdata.append('brand',form.value.brand)
    formdata.append('price',form.value.price)
    formdata.append('description',form.value.description)
    formdata.append('expiredate',form.value.expiredate)
    formdata.append('catagory',form.value.catagory)
    formdata.append('image',form.value.image)

    store.dispatch('handleCreate',formdata)

}
</script>

<template>
    <div class="form-container">
        <div class="whole-container">
            <div class="logo">
                <img src="../../image/post.png" alt="">
            </div>
            <div class="title">
                <h1>Post Item</h1>
            </div>
            <form @submit.prevent="handleCreate">
                <div class="form-cont">
                    <input type="text" name="name" placeholder="Item Name" class="input" v-model="form.name">
                    <p class="errorMessage" v-if="store.getters.itemErrors.name">{{ store.getters.itemErrors.name[0] }}</p>
                </div>
                <div class="form-cont">
                    <input type="text" name="brand" placeholder="Item Brand" class="input" v-model="form.brand">
                    <p class="errorMessage" v-if="store.getters.itemErrors.brand">{{ store.getters.itemErrors.brand[0] }}</p>
                </div>
                <div class="form-cont">
                    <input type="number" name="price" placeholder="Item Price" step=".01" class="input" v-model="form.price">
                    <p class="errorMessage" v-if="store.getters.itemErrors.price">{{ store.getters.itemErrors.price[0] }}</p>
                </div>
                <div class="form-cont">
                    <input type="text" name="description" placeholder="Description" class="input" v-model="form.description">
                    <p class="errorMessage" v-if="store.getters.itemErrors.description">{{ store.getters.itemErrors.description[0] }}</p>
                </div>
                <div class="form-cont">
                    <label for="">Expire Date</label>
                    <input type="date" name="expiredate"  class="input" v-model="form.expiredate">
                    <p class="errorMessage" v-if="store.getters.itemErrors.expiredate">{{ store.getters.itemErrors.expiredate[0] }}</p>
                </div>
                <div class="form-cont">
                    <label for="">Item Catagory</label>
                    <select name="catagory" v-model="form.catagory">
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
                        <input type="submit" name="submit" value="Post">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>