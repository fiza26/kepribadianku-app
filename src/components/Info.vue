<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(['showInfo'])
const emits = defineEmits(['start'])
</script>

<template>
    <div class="info" v-if="showInfo">
        <h1>Howdy friends! 👏😊🚀
        </h1>
        <p>Wanna know what kind of person you are?</p>
        <p>Let's take a quick test to find out</p>
        <button @click="$emit('start')">Start</button>
    </div>
</template>

<style scoped>
.info button {
    font-family: "Poppins", sans-serif;
    margin-top: 10px;
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    background-color: #101825;
    color: white;
    transition: ease-in-out 0.3s;
}

.info button:hover {
    background-color: white;
    color: black;
}
</style>