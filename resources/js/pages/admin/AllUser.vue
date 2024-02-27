<script setup>
import { useStore } from 'vuex';
import { onMounted,ref } from 'vue';
import RemoveConfirmation from '../../components/RemoveConfirmation.vue';
import PopUp from '../../components/PopUp.vue';
import SearchEngineVue from '../../components/SearchEngine.vue';
import Loader from '../../components/Loader.vue';
import Empty from '../../components/Empty.vue';



const store=useStore()

const forPopUp=ref({
	message:'',
	title:'',
	type:'',
	class:'',
	typeMessage:''
})


const showPopUpMessage=(result)=>{
	forPopUp.value.message=result.message
	forPopUp.value.title=result.title
	forPopUp.value.type=result.type
	forPopUp.value.typeMessage=result.typeMessage
	setTimeout(() => {
		forPopUp.value.class="showPopUp"
	}, 1000);
 }


 const handleClosePopUp=()=>{
	forPopUp.value.class="hidePopUp"
 }

 const forConfirmation=ref({
    banMessage:'',
    banTo:'',
    banTitle:'',
})

const showConfirmation=ref(false)

const showLoader=ref(true)





onMounted(async() => {
    await store.dispatch('getAllUsers')
    store.commit('setSearchInput','')
    if(store.getters.allUsers){
        showLoader.value=false
    }
})





const handleConfirmationResult=async(result)=>{
    showConfirmation.value=false
    if(result.confStatus==true){
        await store.dispatch('deActivateUser',result.confTo)
        if(store.getters.adminTaskCompletionStatus.status==1){
            showPopUpMessage({
                message:store.getters.adminTaskCompletionStatus.message,
                title:'Baning User Account',
                type:'success',
                typeMessage:'SUCCESS'})
                store.commit('setAdminTaskComplitionStatus',[])
        }else{
            showPopUpMessage({
                message:store.getters.adminTaskCompletionStatus.message,
                title:'Baning User Account',
                type:'error',
                typeMessage:'ERROR'
            })
            store.commit("setAdminTaskComplitionStatus",[])
        }
    }
}

const handleBanRequest=(user)=>{
//this will requre confirmation
forConfirmation.value.banMessage="Do You Really Want To Ban "+user.name+" Account?"
forConfirmation.value.banTo=user.id
forConfirmation.value.banTitle="Baning User Account!"
showConfirmation.value=true

}

const handleActivateRequest= async(user)=>{
    await store.dispatch('activateUser',user.id)
    if(store.getters.adminTaskCompletionStatus.status==1){
        showPopUpMessage({
                message:store.getters.adminTaskCompletionStatus.message,
                title:'Activating User Account',
                type:'success',
                typeMessage:'SUCCESS'})
                store.commit('setAdminTaskComplitionStatus',[])
    }else{
        showPopUpMessage({
                message:store.getters.adminTaskCompletionStatus.message,
                title:'Activating User Account',
                type:'error',
                typeMessage:'ERROR'
            })
            store.commit("setAdminTaskComplitionStatus",[])
    }
}

</script>

<template>
    <PopUp :message="forPopUp.message" :class="forPopUp.class" :title="forPopUp.title" :type="forPopUp.type"  @close-popup="handleClosePopUp" :typeMessage="forPopUp.typeMessage" />
    <RemoveConfirmation :confirmation-message="forConfirmation.banMessage" :confirm-to="forConfirmation.banTo" :title="forConfirmation.banTitle" v-if="showConfirmation" @confirmation-result="handleConfirmationResult" />
    <Loader v-if="showLoader" />

    <div class="main-order-containers with-container">
        <SearchEngineVue />

        <div class="title-bar" v-if="store.getters.GrandFilter(5).length>0">
            <h3>All Users </h3>
        </div>
        <div class="user-container" v-if="store.getters.GrandFilter(5).length>0">
            <div class="table">
                <table>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Profile</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Phone Number</td>
                            <td>Status</td>
                            <td>Authority</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user,index) in store.getters.GrandFilter(5)" :key="index">
                            <td>{{ index+1 }}</td>
                            <td>
                                <div class="image" v-if="user.profile">
                                    <img :src="user.profile" alt="" class="profile">
                                </div>
                                <div class="image" v-else>
                                    <img src="../../image/users.png" alt="" class="profile">
                                </div>
                            </td>
                            <td>
                                <h4>{{ user.name }}</h4>
                            </td>
                            <td>
                                <h4>{{ user.email }}</h4>
                            </td>
                            <td>
                                <h4>{{ user.phonenumber }}</h4>
                            </td>
                            <td>
                                <div class="status" v-if="user.status=='active'">
                                    <span class="green">[ {{ user.status }} ]</span>
                                </div>
                                <div class="status" v-else>
                                    <span class="red">[ {{ user.status }} ]</span>
                                </div>
                            </td>
                            <td>
                                <div class="authority" v-if="user.authority=='admin'">
                                    <img src="../../image/adminlogin2.png" alt="">
                                </div>
                                <div class="authority" v-else>
                                    <img src="../../image/users2.png" alt="">
                                </div>
                            </td>
                            <td>
                                <div class="action" v-if="user.status=='active'">
                                    <form @submit.prevent="handleBanRequest(user)">
                                        <button class="ban">Ban</button>
                                    </form>
                                </div>
                                <div class="action" v-else>
                                    <form @submit.prevent="handleActivateRequest(user)">
                                        <button class="activate">Activate</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="noResult" v-else>
            <Empty message="No User Found Yet..."/>
        </div>
    </div>

</template>