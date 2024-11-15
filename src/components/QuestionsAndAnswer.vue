<script setup>
import { defineProps, defineEmits } from "vue";

// Define props and emits
const props = defineProps(['showInfo', 'questionFinished', 'usernameState', 'language', 'currentQuestion', 'indonesian', 'english']);
const emits = defineEmits(['chooseIndonesian', 'chooseEnglish', 'correct', 'incorrect', 'notSure', 'emitQuestion']);

// Emit currentQuestion.question to parent component
const emitCurrentQuestion = () => {
    if (props.currentQuestion) {
        emits('emitQuestion', props.currentQuestion.question);
    }
}
</script>

<template>
    <div class="questions" v-if="!showInfo && !questionFinished && !usernameState">
        <p v-if="language">Choose Language</p>
        <div class="answer" v-if="language">
            <p @click="$emit('chooseIndonesian')">Indonesian</p>
            <p @click="$emit('chooseEnglish')">English</p>
        </div>
        <p v-if="currentQuestion && (indonesian || english)">{{ currentQuestion.question }}</p>
        <div class="answer" v-if="indonesian || english">
            <p @click="emitCurrentQuestion; $emit('correct')">Correct</p>
            <p @click="emitCurrentQuestion; $emit('incorrect')">Incorrect</p>
            <p @click="emitCurrentQuestion; $emit('notSure')">Not sure</p>
        </div>
    </div>
</template>


<style scoped>
.questions {
    width: 50%;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid white;
    transition: ease-in-out 3s;
    animation-name: pop-animation;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
}

.questions hr {
    border: 1px solid white;
}

.questions .answer {
    margin-top: 20px;
}

.questions .answer p {
    border: 1px solid white;
    margin-bottom: 5px;
    padding: 5px;
    cursor: pointer;
    border-radius: 15px;
    text-align: center;
    transition: ease-in-out 0.3s;
}

.questions .answer p:hover {
    background-color: white;
    color: black;
}
</style>