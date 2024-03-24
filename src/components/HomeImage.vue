<script setup>
import { defineProps } from "vue";

const props = defineProps(['showInfo'])
</script>

<template>
    <img v-if="showInfo"
        src="https://blush.design/api/download?shareUri=CVYQSkVL_vwn9Or7&c=Bottom_0%7E393f82-0.1%7E2b44ff-0.2%7E342a83-0.3%7E342a83_Hair_0%7Eb58143-0.1%7E2c1b18-0.2%7Ee8e1e1-0.3%7E181658_Skin_0%7E915b3c-0.1%7Eb28b67-0.2%7Ed4a181-0.3%7E915b3c_Top_0%7Eff4133-0.1%7Effa434-0.2%7Effa434-0.3%7Ea8e5ba&w=800&h=800&fm=png"
        alt="">
</template>

<style scope>
img {
    width: 700px;
}
</style>