<script setup>
import { ref } from 'vue';


const status=ref(Boolean)
const props=defineProps({
    confirmationMessage:String,
    confirmTo:Number,
    title:String,
})

const emit=defineEmits(['confirmation-result'])

const handleConfirmation=(e)=>{
    e.preventDefault();
    
    if(e.submitter.name=='yes'){
        status.value=true
    }else{
        status.value=false
    }

    emit('confirmation-result',{
        confStatus:status.value,
        confTo:props.confirmTo
    })
    
}
</script>

<template>
    <div class="backdrop">

        <div class="confirmationBox">
            <div class="headeing">
                <div class="image">
                    <img src="../image/warning.png" alt="">
                </div>
                <div class="content">
                    <div class="title">
                        <h2>{{ title }}</h2>
                    </div>
                    <div class="message">
                        <p>{{ confirmationMessage }}</p>
                    </div>
                </div>
            </div>
            <div class="form">
                <form @submit.prevent="handleConfirmation">
                    <div class="conf-cont">
                        <input type="submit" name="yes" value="Yes!" class="yes">
                        <input type="submit" name="no" value="No!" class="no">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>