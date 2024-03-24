<script setup>
import { ref, computed, watchEffect } from "vue";
import data from "./data.json";
import dataEnglish from "./dataEnglish.json";

import ModalForName from "../components/ModalForName.vue";
import ModalForTheSame from "../components/ModalForTheSame.vue";
import ModalForLanguage from "../components/ModalForLanguage.vue";
import HomeImage from "../components/HomeImage.vue";
import Info from "../components/Info.vue";
import Greeting from "../components/Greeting.vue";
import ProgressBar from "../components/ProgressBar.vue";
import QuestionsAndAnswer from "../components/QuestionsAndAnswer.vue";
import QuestionFinished from "../components/QuestionFinished.vue";

const username = ref('');
const usernameState = ref(false);

const showInfo = ref(true);
const isFormEmpty = ref(false);

const language = ref(true);
const indonesian = ref(false);
const english = ref(false);

const items = ref(data);
const itemsEnglish = ref(dataEnglish);
const currentQuestionIndex = ref(0);

const logician = ref(0);
const feeler = ref(0);
const creative = ref(0);

const questionFinished = ref(false);

const start = () => {
  showInfo.value = false;
  usernameState.value = true;
};

const submitName = () => {
  if (username.value === '') {
    isFormEmpty.value = true;
    setTimeout(() => {
      isFormEmpty.value = false;
    }, 1500);
  } else {
    username.value = username.value.trim();
    usernameState.value = false;
  }
};

const modalForLanguage = ref(false);

const chooseIndonesian = () => {
  indonesian.value = true;
  language.value = false;
  modalForLanguage.value = true;
  setTimeout(() => {
    modalForLanguage.value = false;
  }, 1500);
}

const chooseEnglish = () => {
  english.value = true;
  language.value = false;
  modalForLanguage.value = true;
  setTimeout(() => {
    modalForLanguage.value = false;
  }, 1500);
}

const currentQuestion = computed(() => {
  if (indonesian.value === true) {
    if (currentQuestionIndex.value === items.value.length) {
      questionFinished.value = true;
    }
    return items.value[currentQuestionIndex.value];
  } else if (english.value === true) {
    if (currentQuestionIndex.value === itemsEnglish.value.length) {
      questionFinished.value = true;
    }
    return itemsEnglish.value[currentQuestionIndex.value];
  }
});

const correct = () => {
  if (currentQuestionIndex.value === 0) {
    logician.value += 10;
  } else if (currentQuestionIndex.value === 1) {
    logician.value += 10;
  } else if (currentQuestionIndex.value === 2) {
    logician.value += 10;
  } else if (currentQuestionIndex.value === 3) {
    creative.value += 10;
    logician.value += 5;
  } else if (currentQuestionIndex.value === 4) {
    feeler.value += 10;
    creative.value += 5;
  } else if (currentQuestionIndex.value === 5) {
    creative.value += 10;
    logician.value += 5;
    feeler.value += 5;
  } else if (currentQuestionIndex.value === 6) {
    creative.value += 10;
  } else if (currentQuestionIndex.value === 7) {
    creative.value += 10;
  } else if (currentQuestionIndex.value === 8) {
    creative.value += 10;
    logician.value += 10;
  } else if (currentQuestionIndex.value === 9) {
    logician.value += 10;
  }
  currentQuestionIndex.value++;
  updateProgressBar();
};

const incorrect = () => {
  if (currentQuestionIndex.value === 0) {
    feeler.value += 10;
  } else if (currentQuestionIndex.value === 1) {
    feeler.value += 10;
  } else if (currentQuestionIndex.value === 2) {
    feeler.value += 10;
  } else if (currentQuestionIndex.value === 3) {
    feeler.value += 10;
  } else if (currentQuestionIndex.value === 4) {
    logician.value += 10;
  } else if (currentQuestionIndex.value === 7) {
    logician.value += 5;
    feeler.value += 5;
  } else if (currentQuestionIndex.value === 8) {
    logician.value += 5;
    feeler.value += 10;
  } else if (currentQuestionIndex.value === 9) {
    feeler.value += 5;
  }
  currentQuestionIndex.value++;
  updateProgressBar();
};

const notSure = () => {
  logician.value += 10;
  feeler.value += 10;
  creative.value += 10;
  currentQuestionIndex.value++;
  updateProgressBar();
};

const updateProgressBar = () => {
  const progress = ((currentQuestionIndex.value + 1) / items.value.length) * 100;
  document.querySelector('.progress').style.width = progress + '%';
};

const modalForTheSame = ref(false);

const ifTheSame = computed(() => {
  return logician.value === feeler.value && feeler.value === creative.value;
})

watchEffect(() => {
  if (ifTheSame.value && questionFinished.value) {
    modalForTheSame.value = true;
    setTimeout(() => {
      location.reload();
    }, 1500);
  }
});

const emitQuestion = (question) => {
  // Handle emitted question here
  console.log('Emitted question:', question);
}

</script>

<template>
  <main>
    <ModalForName :isFormEmpty="isFormEmpty" />
    <ModalForTheSame :modalForTheSame="modalForTheSame" />
    <ModalForLanguage :modalForLanguage="modalForLanguage" :indonesian="indonesian" :english="english" />
    <div class="container">
      <HomeImage :showInfo="showInfo" />
      <Info :showInfo="showInfo" @start="start" />
      <Greeting :usernameState="usernameState" :username="username" />
      <div class="form" v-if="usernameState">
        <form>
          <input type="text" placeholder="Enter your name" v-model="username">
        </form>
        <button @click="submitName()">Submit</button>
      </div>
      <h3 v-if="!showInfo && !usernameState && !questionFinished">Take your time {{ username }} no need to rush 👏
        <ProgressBar :questionFinished="questionFinished" />
        <pre>
        <p>Logician : {{ logician }}</p>
        <p>Feeler : {{ feeler }}</p>
        <p>Creative: {{ creative }}</p>
      </pre>
      </h3>
      <QuestionsAndAnswer :showInfo="showInfo" :questionFinished="questionFinished" :usernameState="usernameState"
        :language="language" :currentQuestion="currentQuestion" :indonesian="indonesian" :english="english"
        @chooseIndonesian="chooseIndonesian" @chooseEnglish="chooseEnglish" @correct="correct" @incorrect="incorrect"
        @notSure="notSure" @emitQuestion="emitQuestion" />
      <QuestionFinished :questionFinished="questionFinished" :logician="logician" :feeler="feeler" :creative="creative"
        :username="username" />
    </div>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 600px;
  opacity: 1px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 15px;
  padding: 15px;
  color: white;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(50px);
  border: 2px solid rgba(255, 255, 255, 0.18);
}

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

h3 {
  animation-name: pop-animation;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.form {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 100px;
  padding: 10px;
  border-radius: 15px;
  border: 2px solid white;
  animation-name: pop-animation;
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
}

.form input {
  font-family: "Poppins", sans-serif;
  padding: 7px;
  border-radius: 15px;
  border: none;
  width: 100%;
  opacity: 0.5;
}

.form button {
  font-family: "Poppins", sans-serif;
  width: 100%;
  height: 30px;
  border-radius: 15px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  background-color: #101825;
  color: white;
  transition: ease-in-out 0.3s;
}

.form button:hover {
  background-color: white;
  color: black;
}

@keyframes pop-animation {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
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

@media screen and (max-width: 768px) {
  .container {
    align-items: flex-start;
    height: auto;
  }

  img {
    width: 100%;
  }

  .form {
    margin-top: 100px;
  }

  .questions {
    width: 100%;
    margin-top: 100px;
  }

  .question-finished {
    flex-wrap: wrap;
  }

  .question-finished img {
    width: 70vw;
  }

  .archetype {
    flex-wrap: wrap;
  }
}
</style>
