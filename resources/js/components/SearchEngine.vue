<script setup>
import { useStore } from 'vuex';
import { ref } from 'vue';



const store=useStore()

const serachInput=ref('')

const setSearch=(search)=>{
    store.commit('setSearchInput',search)
    serachInput.value=search
}

const setSearchTwo=()=>{
    store.commit('setSearchInput',serachInput.value)
}

const clearSerach=()=>{
    store.commit('setSearchInput','')
    serachInput.value=''
}
</script>

<template>
    <div class="serachEngine">
        <div class="serach-components">
            <div class="input">
                <input type="text" name="serach" v-model="serachInput" @input="setSearchTwo" placeholder="Search Products...">
                <button @click="clearSerach" v-if="serachInput.length>0"><img src="../image/exit.png" alt=""></button>
            </div>
            <div class="tags">
                <button @click="setSearch('All')">All</button>
                <button @click="setSearch('food')">Food</button>
                <button @click="setSearch('close')">Close</button>
                <button @click="setSearch('gudget')">Gudget</button>
            </div>
        </div>
    </div>
</template>