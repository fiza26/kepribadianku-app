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

const scoreChanges = {
  correct: [
    { logician: 10 },                 // Question 0
    { logician: 10 },                 // Question 1
    { logician: 10 },                 // Question 2
    { creative: 10, logician: 10 },   // Question 3
    { feeler: 10, creative: 10 },     // Question 4
    { creative: 10, logician: 10, feeler: 5 }, // Question 5
    { creative: 10, logician: 5, feeler: 5 },               // Question 6
    { creative: 10, feeler: 10 },                            // Question 7
    { creative: 10, logician: 10 }, // Question 8
    { logician: 10, creative: 10 },                          // Question 9
    { logician: 10, feeler: 5, creative: 5 },                // Question 10
    { feeler: 10 },                 // Question 11
    { creative: 10 },               // Question 12
    { feeler: 10 },                 // Question 13
    { creative: 10, logician: 10 }                // Question 14
  ],
  incorrect: [
    { feeler: 10, creative: 10 },                            // Question 0
    { feeler: 10, creative: 10 },                            // Question 1
    { feeler: 10, creative: 10 },                            // Question 2
    { feeler: 10 },                 // Question 3
    { logician: 10 },               // Question 4
    { feeler: 10},                  // Question 5 
    { logician: 10, feeler: 5 },                             // Question 6
    { logician: 5, feeler: 5 },       // Question 7
    { logician: 5, feeler: 10 },      // Question 8
    { feeler: 10 },                   // Question 9
    { creative: 10 },                 // Question 10
    { logician: 10, creative: 10 },                            // Question 11
    { feeler: 10 },                                            // Question 12
    { logician: 10, creative: 5 },                             // Question 13
    { feeler: 10}                                              // Question 14
  ]
};

const applyScoreChanges = (change) => {
  logician.value += change.logician || 0;
  feeler.value += change.feeler || 0;
  creative.value += change.creative || 0;
};

const correct = () => {
  const change = scoreChanges.correct[currentQuestionIndex.value] || {};
  applyScoreChanges(change);
  currentQuestionIndex.value++;
  updateProgressBar();
};

const incorrect = () => {
  const change = scoreChanges.incorrect[currentQuestionIndex.value] || {};
  applyScoreChanges(change);
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

const resize = () => {
  const container = document.querySelector('.container');
  if (container) {
    container.style.height = 'auto';
  }
};

watchEffect(() => {
  if (questionFinished.value) {
    resize();
  }
});
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
        <!-- <pre>
        <p>Logician : {{ logician }}</p>
        <p>Feeler : {{ feeler }}</p>
        <p>Creative: {{ creative }}</p>
      </pre> -->
      </h3>
      <QuestionsAndAnswer :showInfo="showInfo" :questionFinished="questionFinished" :usernameState="usernameState"
        :language="language" :currentQuestion="currentQuestion" :indonesian="indonesian" :english="english"
        @chooseIndonesian="chooseIndonesian" @chooseEnglish="chooseEnglish" @correct="correct" @incorrect="incorrect"
        @notSure="notSure" @emitQuestion="emitQuestion" />
      <QuestionFinished :questionFinished="questionFinished" :logician="logician" :feeler="feeler" :creative="creative"
        :username="username" :indonesian="indonesian" :english="english" />
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
