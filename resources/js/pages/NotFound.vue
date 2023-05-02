<script setup>

</script>

<template>
    <div class="mainForOFor">
        <div class="image">
            <img src="../image/404 Error with a cute animal.gif" alt="">
        </div>
        <div class="message">
            <h1><span>404</span> Page Not Found!</h1>
        </div>
        <div class="link">
            <router-link :to="{name:'home'}">Home</router-link>
        </div>
    </div>
</template>

