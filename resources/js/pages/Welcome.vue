<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import ScrollIndicator from '../components/ScrollIndicator.vue'

</script>

<template>
    <Header />
    <ScrollIndicator />
    <main>
        <router-view></router-view>
    </main>
    <Footer />
</template>