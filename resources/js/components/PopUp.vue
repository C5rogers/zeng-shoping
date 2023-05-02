<script setup>
import { onMounted } from 'vue';

const props=defineProps({
    message:String,
    type:String,
    class:String,
    title:String,
    typeMessage:String
})

const emit=defineEmits(['close-popup'])
onMounted(() => {
    setTimeout(() => {
        emit('close-popup')
    }, 25000);
})


const handleOnClose=()=>{
    emit('close-popup')
}

</script>

<template>

    <div class="popup-container success" v-if="type=='success'" :class="class">
        <div class="exit"><button @click="handleOnClose" class="forSuccessExit">&times;</button></div>
        <div class="image forSuccessImage">
            <img src="../image/correct2.png" alt="">
            <span>{{ typeMessage }}</span>
        </div>
        <div class="message">
            <div class="title">
                <h3 class="forSuccessTitle">{{ title }}</h3>
            </div>
            <div class="content">
                <p>{{ message }}</p>
            </div>
        </div>
    </div>
    <div class="popup-container error" v-else :class="class">
        <div class="exit"><button @click="handleOnClose" class="forErrorExit">&times;</button></div>
        <div class="image forErrorImage">
            <img src="../image/error1.png" alt="">
            <span>{{ typeMessage }}</span>
        </div>
        <div class="message">
            <div class="title">
                <h3 class="forErrorTitle">{{ title }}</h3>
            </div>
            <div class="content">
                <p>{{ message }}</p>
            </div>
        </div>
    </div>

</template>