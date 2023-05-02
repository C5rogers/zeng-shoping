<script setup>
const props=defineProps({
    message:String
})
</script>

<template>
    <div class="empty-container">
        <div class="empty-image">
            <img src="../image/empty.png" alt="">
        </div>
        <div class="empty-messagemessage">
            {{ message }}
        </div>
    </div>
</template>