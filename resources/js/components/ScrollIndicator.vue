<script setup>
import {ref} from 'vue'

window.onscroll=()=>{
	scrollIndicator()
}

const percentage=ref(0)

const scrollIndicator=()=>{
	const wnScroll=document.body.scrollTop || document.documentElement.scrollTop

	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
	percentage.value=(wnScroll/height)*100
	percentage.value=parseInt(percentage.value)

}
	

</script>

<template>
	<div class="scrollBars">
		<div id="myBar">	
			{{percentage}}%
		</div>
	</div>
</template>