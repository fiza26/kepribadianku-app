<script setup>
import { defineProps } from "vue";

const props = defineProps(['questionFinished']);
</script>

<template>
    <div class="progress-bar" v-if="!questionFinished">
        <div class="progress">
            <p class="progress-percentage">0%</p>
        </div>
    </div>
</template>

<style scoped>
.progress-bar {
    margin-top: 7px;
    width: 100%;
    border: 2px solid white;
    border-radius: 15px;
}

.progress-bar .progress {
    background-color: white;
    border-radius: 15px;
    width: 10%;
    transition: ease-in-out 0.1s;
}

.progress-bar .progress-percentage {
    opacity: 0;
}
</style>