<script setup>
import { defineProps } from "vue";

const props = defineProps(['modalForTheSame']);
</script>

<template>
    <div class="modal" v-if="modalForTheSame">
        <div class="modal-content">
            <h1>Something is wrong, you need to retake the test</h1>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #F15A2A, #29ABE2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    transition: 1s ease-in-out;
}

.modal .modal-content {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #101825;
    color: white;
    width: 100%;
    height: 100px;
    text-align: center;
    transform: scale(0);
    animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

@keyframes moveUp {
    0% {
        transform: scale(0);
        opacity: 0;
        border-radius: 15px;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>