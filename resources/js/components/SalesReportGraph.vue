<script setup>
import { useStore } from 'vuex';
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';


onMounted(() => {

    new Chart(
        document.getElementById('SalesReport'),
        {
            type:'bar',
            data:{
                labels:store.getters.adminSalesReportData.map(row=>row.year+"/"+row.month),
                datasets:[{
                    label:'Monthly Sales Report',
                    data:store.getters.adminSalesReportData.map(row=>row.ammount)
                }]
            }
        }
    )
    
})



const store=useStore()

</script>

<template>

<canvas id="SalesReport"></canvas>

</template>