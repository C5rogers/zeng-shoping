<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store=useStore()
const form=ref({
    name:'',
    email:'',
    password:'',
    phonenumber:'',
    password_confirmation:'',
    image:null
})


const shipImageFile=(e)=>{
    form.value.image=e.target.files[0]
}


const handleSignup=()=>{

    const formdata=new FormData()

    // console.log(form.value.image)

    formdata.append('name',form.value.name)
    formdata.append('email',form.value.email)
    formdata.append('password',form.value.password)
    formdata.append('password_confirmation',form.value.password_confirmation)
    formdata.append('image',form.value.image)
    formdata.append('phonenumber','0'+form.value.phonenumber)

    //now can call the action
    store.dispatch('handleSignup',formdata)
}
</script>

<template>
    <div class="form-container">
        <div class="whole-container">
            <div class="logo">
            <img src="../../image/users.png" alt="">
        </div>
        <div class="title">
            <h1>Sign Up</h1>
        </div>
        <form @submit.prevent="handleSignup">
            <div class="form-cont">
                <input type="text" name="name" placeholder="User Name" class="input" v-model="form.name">
                <p class="errorMessage" v-if="store.getters.errors.name">{{ store.getters.errors.name[0] }}</p>
            </div>
            <div class="form-cont">
                <input type="email" name="email" placeholder="User Email" class="input" v-model="form.email">
                <p class="errorMessage" v-if="store.getters.errors.email">{{ store.getters.errors.email[0] }}</p>
            </div>
            <div class="form-cont">
                <input type="number" name="phonenumber" placeholder="Phone Number" class="input" v-model="form.phonenumber">
                <p class="errorMessage" v-if="store.getters.errors.phonenumber">{{ store.getters.errors.phonenumber[0] }}</p>
            </div>
            <div class="form-cont">
                <input type="password" name="password" placeholder="Password" class="input" v-model="form.password">
                <p class="errorMessage" v-if="store.getters.errors.password">{{ store.getters.errors.password[0] }}</p>
            </div>
            <div class="form-cont">
                <input type="password" name="password_confirmation" placeholder="Confirm Your Password" class="input" v-model="form.password_confirmation">
                <p class="errorMessage" v-if="store.getters.errors.password_confirmation">{{ store.getters.errors.password_confirmation[0] }}</p>
            </div>
            <div class="form-cont">
                <input type="file" name="profile" class="input" @change="shipImageFile">
                <p class="errorMessage" v-if="store.getters.errors.profile">{{ store.getters.errors.profile[0] }}</p>
            </div>
            <div class="form-cont">
                <div class="button">
                    <input type="reset" name="reset" value="Reset">
                    <input type="submit" name="signup" value="Sign Up">
                </div>
            </div>
        </form>
        </div>
    </div>
</template>