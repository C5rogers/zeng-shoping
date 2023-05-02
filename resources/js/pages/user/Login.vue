<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store=useStore()


const form=ref({
    email:'',
    password:''
})

const handleLogin=()=>{
    store.dispatch('handleLogin',form.value)
}

</script>

<template>
    <div class="form-container">
        <div class="whole-container">
            <div class="logo">
            <img src="../../image/login1.png" alt="">
        </div>
        <div class="title">
            <h1>Log In</h1>
        </div>
        <form @submit.prevent="handleLogin">
            <div class="form-cont">
                <input type="email" name="email" placeholder="Enter Email" class="input" v-model="form.email">
                <p class="errorMessage" v-if="store.getters.loginErrors.email">{{ store.getters.loginErrors.email[0] }}</p>
            </div>
            <div class="form-cont">
                <input type="password" name="password" placeholder="Password" class="input" v-model="form.password">
                <p class="errorMessage" v-if="store.getters.loginErrors.password">{{ store.getters.loginErrors.password[0] }}</p>
            </div>
            <div class="form-cont">
                <div class="button">
                    <input type="reset" name="reset" value="Reset">
                    <input type="submit" name="login" value="Log In">
                </div>
            </div>
        </form>
        </div>
    </div>
</template> 
